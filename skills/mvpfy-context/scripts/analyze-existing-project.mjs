#!/usr/bin/env node

/**
 * Analisa um projeto consumidor sem alterar seu código, suas specs ou seus
 * documentos. O relatório serve como contexto inicial para o MVPFy.
 */

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const MAX_FILES = 1200;
const MAX_TEXT_BYTES = 1_000_000;
const IGNORE_DIRECTORIES = new Set([
  ".git", ".mvpfy", ".next", ".nuxt", ".turbo", ".cache", ".parcel-cache",
  ".astro", "coverage", "dist", "build", "out", "target", "vendor",
  "node_modules", "storage", "tmp", "temp", "public/build",
]);
const SPEC_DIRECTORY_NAMES = new Set([
  "spec", "specs", "requirements", "backlog", "brief", "briefs", "plans",
  "plan", "decisions", "docs", "documentation", "product", "roadmap",
]);
const SPEC_FILE_NAMES = new Set([
  "spec.md", "specification.md", "requirements.md", "backlog.md", "brief.md",
  "product.md", "roadmap.md", "plan.md", "readme.md", "agents.md",
]);
const CODE_EXTENSIONS = new Map([
  [".js", "JavaScript"], [".jsx", "JavaScript/JSX"], [".mjs", "JavaScript"],
  [".cjs", "JavaScript"], [".ts", "TypeScript"], [".tsx", "TypeScript/TSX"],
  [".vue", "Vue"], [".svelte", "Svelte"], [".astro", "Astro"],
  [".php", "PHP"], [".py", "Python"], [".rb", "Ruby"], [".go", "Go"],
  [".rs", "Rust"], [".java", "Java"], [".kt", "Kotlin"], [".cs", "C#"],
]);
const MANIFEST_NAMES = new Set([
  "package.json", "composer.json", "pyproject.toml", "requirements.txt",
  "go.mod", "Cargo.toml", "Gemfile", "mix.exs", "pom.xml", "build.gradle",
]);
const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const relatorioPath = path.join(projeto, ".mvpfy", "existing-project.json");
const estadoPath = path.join(projeto, ".mvpfy", "state.json");

export async function analisarProjeto(root = projeto) {
  const projetoRaiz = path.resolve(root);
  const arquivos = await listarArquivos(projetoRaiz, projetoRaiz);
  const specs = [];
  const code = [];
  const manifests = [];
  const extensoes = new Map();

  for (const arquivo of arquivos) {
    const relativo = toPosix(path.relative(projetoRaiz, arquivo));
    const nome = path.basename(arquivo).toLowerCase();
    const extensao = path.extname(nome);
    const tipoSpec = classificarSpec(relativo, nome);
    if (tipoSpec) {
      const texto = await lerTexto(arquivo);
      specs.push({
        path: relativo,
        type: tipoSpec,
        title: extrairTitulo(texto) || path.basename(arquivo, path.extname(arquivo)),
        excerpt: resumir(texto),
      });
    }
    if (CODE_EXTENSIONS.has(extensao)) {
      const linhas = await contarLinhas(arquivo);
      const linguagem = CODE_EXTENSIONS.get(extensao);
      extensoes.set(linguagem, (extensoes.get(linguagem) || 0) + 1);
      code.push({ path: relativo, language: linguagem, lines: linhas });
    }
    if (MANIFEST_NAMES.has(path.basename(arquivo))) {
      manifests.push(await lerManifesto(arquivo, relativo));
    }
  }

  const stack = reconhecerStack(manifests, [...extensoes.keys()]);
  const suggestedAnswers = criarSugestoes({ projetoRaiz, specs, code, manifests, stack });
  const gaps = criarLacunas({ specs, code, manifests, stack });
  const report = {
    schema_version: "1.0.0",
    analyzed_at: new Date().toISOString(),
    project: toPosix(path.relative(process.cwd(), projetoRaiz)) || ".",
    status: specs.length || code.length || manifests.length ? "found" : "empty",
    sources: {
      specs: specs.sort((a, b) => a.path.localeCompare(b.path)),
      code: code.sort((a, b) => a.path.localeCompare(b.path)),
    },
    manifests: manifests.sort((a, b) => a.path.localeCompare(b.path)),
    stack,
    suggested_answers: suggestedAnswers,
    gaps,
    summary: {
      spec_files: specs.length,
      code_files: code.length,
      code_lines: code.reduce((total, arquivo) => total + arquivo.lines, 0),
      manifests: manifests.length,
      languages: Object.fromEntries([...extensoes.entries()].sort()),
      source_paths: [...new Set([...specs, ...code, ...manifests].map((item) => item.path))].length,
    },
  };
  return report;
}

export async function salvarRelatorio(report, root = projeto) {
  const projetoRaiz = path.resolve(root);
  const diretorio = path.join(projetoRaiz, ".mvpfy");
  const destino = path.join(diretorio, "existing-project.json");
  await mkdir(diretorio, { recursive: true });
  const temporario = `${destino}.${process.pid}.tmp`;
  await writeFile(temporario, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await rename(temporario, destino);
  await atualizarEstado(report, projetoRaiz);
  return destino;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = await analisarProjeto(projeto);
  const destino = await salvarRelatorio(report, projeto);
  console.log(JSON.stringify({ ...report.summary, status: report.status, report: path.relative(projeto, destino) }, null, 2));
}

async function listarArquivos(diretorio, projetoRaiz, acumulado = []) {
  if (acumulado.length >= MAX_FILES) return acumulado;
  let entradas;
  try {
    entradas = await readdir(diretorio, { withFileTypes: true });
  } catch {
    return acumulado;
  }
  for (const entrada of entradas.sort((a, b) => a.name.localeCompare(b.name))) {
    if (acumulado.length >= MAX_FILES) break;
    const relativo = toPosix(path.relative(projetoRaiz, path.join(diretorio, entrada.name)));
    if (entrada.isDirectory() && deveIgnorarDiretorio(entrada.name, relativo)) continue;
    const absoluto = path.join(diretorio, entrada.name);
    if (entrada.isDirectory()) await listarArquivos(absoluto, projetoRaiz, acumulado);
    else if (entrada.isFile()) acumulado.push(absoluto);
  }
  return acumulado;
}

function deveIgnorarDiretorio(nome, relativo) {
  return IGNORE_DIRECTORIES.has(nome) || IGNORE_DIRECTORIES.has(relativo);
}

function classificarSpec(relativo, nome) {
  const partes = relativo.split("/").map((parte) => parte.toLowerCase());
  if (SPEC_FILE_NAMES.has(nome)) return nome === "readme.md" ? "readme" : "named_document";
  if (partes.some((parte) => SPEC_DIRECTORY_NAMES.has(parte)) && /\.(md|mdx|ya?ml|json|txt)$/i.test(nome)) return "project_document";
  return null;
}

async function lerTexto(arquivo) {
  try {
    const info = await stat(arquivo);
    if (info.size > MAX_TEXT_BYTES) return "";
    return await readFile(arquivo, "utf8");
  } catch {
    return "";
  }
}

async function contarLinhas(arquivo) {
  const texto = await lerTexto(arquivo);
  return texto ? texto.split(/\r?\n/).length - (texto.endsWith("\n") ? 1 : 0) : 0;
}

async function lerManifesto(arquivo, relativo) {
  const texto = await lerTexto(arquivo);
  const nome = path.basename(arquivo);
  const registro = { path: relativo, name: nome, dependencies: [], scripts: [] };
  if (nome === "package.json" || nome === "composer.json") {
    try {
      const json = JSON.parse(texto);
      const dependencias = {
        ...(json.dependencies || {}),
        ...(json.devDependencies || {}),
        ...(json.require || {}),
        ...(json["require-dev"] || {}),
      };
      registro.dependencies = Object.keys(dependencias).sort();
      registro.scripts = Object.keys(json.scripts || {}).sort();
      registro.name = json.name || nome;
    } catch {
      registro.parse_error = true;
    }
  } else {
    registro.excerpt = resumir(texto);
  }
  return registro;
}

function reconhecerStack(manifests, linguagens) {
  const sinais = new Map();
  const adicionar = (nome, origem, motivo) => sinais.set(nome, { name: nome, sources: [origem], reason: motivo });
  for (const manifest of manifests) {
    for (const dependencia of manifest.dependencies) {
      const nome = dependencia.toLowerCase();
      if (nome.includes("laravel/framework")) adicionar("Laravel", manifest.path, "dependência declarada");
      else if (nome === "react" || nome.startsWith("react-")) adicionar("React", manifest.path, "dependência declarada");
      else if (nome === "next" || nome.startsWith("@next/")) adicionar("Next.js", manifest.path, "dependência declarada");
      else if (nome === "astro") adicionar("Astro", manifest.path, "dependência declarada");
      else if (nome === "vue" || nome.startsWith("@vue/")) adicionar("Vue", manifest.path, "dependência declarada");
      else if (nome === "express") adicionar("Express", manifest.path, "dependência declarada");
      else if (nome === "typescript") adicionar("TypeScript", manifest.path, "dependência declarada");
      else if (nome.includes("django")) adicionar("Django", manifest.path, "dependência declarada");
      else if (nome.includes("fastapi")) adicionar("FastAPI", manifest.path, "dependência declarada");
    }
  }
  for (const linguagem of linguagens) {
    if (linguagem === "PHP") adicionar("PHP", "extensões dos arquivos", "arquivos encontrados");
    if (linguagem === "Python") adicionar("Python", "extensões dos arquivos", "arquivos encontrados");
    if (linguagem === "Go") adicionar("Go", "extensões dos arquivos", "arquivos encontrados");
    if (linguagem === "Rust") adicionar("Rust", "extensões dos arquivos", "arquivos encontrados");
  }
  return [...sinais.values()].map((item) => ({ ...item, sources: [...new Set(item.sources)] })).sort((a, b) => a.name.localeCompare(b.name));
}

function criarSugestoes({ specs, code, manifests, stack }) {
  const sugestoes = [];
  if (stack.length) sugestoes.push({
    field: "technology.stack",
    value: stack.map((item) => item.name).join(", "),
    status: "suggested",
    confidence: "high",
    sources: stack.flatMap((item) => item.sources),
    reason: "A stack aparece em manifestos ou nas extensões dos arquivos encontrados.",
  });
  if (manifests.length || code.length) sugestoes.push({
    field: "product.existing-codebase",
    value: "Existe uma base de software para ser reaproveitada na definição do MVP.",
    status: "suggested",
    confidence: "high",
    sources: [...new Set([...manifests, ...code].map((item) => item.path))].slice(0, 20),
    reason: "Foram encontrados manifestos ou arquivos de programação fora das pastas ignoradas.",
  });
  if (specs.length) sugestoes.push({
    field: "product.existing-specs",
    value: `${specs.length} documento(s) pode(m) orientar o recorte inicial do MVP.`,
    status: "suggested",
    confidence: "medium",
    sources: specs.map((item) => item.path),
    reason: "A documentação encontrada pode responder partes da entrevista e precisa ser lida pela orquestradora.",
  });
  return sugestoes;
}

function criarLacunas({ specs, code, manifests, stack }) {
  const lacunas = [];
  if (!specs.length) lacunas.push({ field: "product.problem", reason: "Nenhuma spec ou documento de produto foi encontrado." });
  if (!code.length) lacunas.push({ field: "technology.stack", reason: "Nenhum arquivo de programação foi encontrado." });
  if (code.length || manifests.length) {
    lacunas.push({ field: "product.scope", reason: "O código mostra o que existe, mas não define sozinho o recorte da versão 1.0." });
    lacunas.push({ field: "problem.audience", reason: "O código não confirma por si só o problema, o público ou o pagador." });
  }
  if (!stack.length && (code.length || manifests.length)) lacunas.push({ field: "technology.stack", reason: "Há código, mas a tecnologia não foi reconhecida nos manifestos lidos." });
  return lacunas;
}

function extrairTitulo(texto) {
  return texto.match(/^#\s+(.+)$/m)?.[1]?.trim() || null;
}

function resumir(texto) {
  return texto
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^\s*#.*$/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
}

async function atualizarEstado(report, projetoRaiz) {
  if (!existsSync(estadoPathFor(projetoRaiz))) return;
  const estadoPathLocal = estadoPathFor(projetoRaiz);
  let estado;
  try {
    estado = JSON.parse(await readFile(estadoPathLocal, "utf8"));
  } catch {
    return;
  }
  estado.existing_project_context = {
    status: report.status,
    analyzed_at: report.analyzed_at,
    report_path: ".mvpfy/existing-project.json",
    spec_files: report.summary.spec_files,
    code_files: report.summary.code_files,
    manifests: report.summary.manifests,
    suggested_answer_fields: report.suggested_answers.map((item) => item.field),
  };
  estado.research_status = { ...(estado.research_status || {}), existing_project: report.status };
  estado.updated_at = report.analyzed_at;
  const temporario = `${estadoPathLocal}.${process.pid}.tmp`;
  await writeFile(temporario, `${JSON.stringify(estado, null, 2)}\n`, "utf8");
  await rename(temporario, estadoPathLocal);
}

function estadoPathFor(root) {
  return path.join(root, ".mvpfy", "state.json");
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}
