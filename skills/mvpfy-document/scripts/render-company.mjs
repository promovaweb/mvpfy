#!/usr/bin/env node

/** Cria ou atualiza MVP.md preservando blocos identificados pelo template. */

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raizSkill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(raizSkill, "assets", "MVP.template.md");
export const NOME_DOCUMENTO = "MVP.md";
export const NOME_DOCUMENTO_LEGADO = "Company.md";

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argumentos = lerArgumentos(process.argv.slice(2));
  const projeto = path.resolve(argumentos.project || process.cwd());
  const mvpPath = path.join(projeto, NOME_DOCUMENTO);
  const legadoPath = path.join(projeto, NOME_DOCUMENTO_LEGADO);
  const documentoPath = existsSync(mvpPath) ? mvpPath : legadoPath;

  if (argumentos.check) {
    if (!existsSync(documentoPath)) throw new Error("MVP.md não existe no projeto.");
    const atual = await readFile(documentoPath, "utf8");
    validarEstrutura(atual);
    console.log(`${path.basename(documentoPath)} está alinhado aos IDs do template.`);
  } else {
    const template = await readFile(templatePath, "utf8");
    const atual = existsSync(mvpPath)
      ? await readFile(mvpPath, "utf8")
      : existsSync(legadoPath)
        ? await readFile(legadoPath, "utf8")
        : template;
    const renderizado = normalizarCabecalho(mesclar(template, atual));
    await writeFile(mvpPath, atualizarData(renderizado), "utf8");
    console.log(`MVP.md atualizado em ${mvpPath}`);
  }
}

export function mesclar(template, atual) {
  const blocosTemplate = extrairBlocos(template);
  const blocosExistentes = extrairBlocos(atual);
  const blocosAtuais = new Map(blocosExistentes.map((bloco) => [bloco.id, bloco.texto]));
  const preambulo = atual.includes("<!-- mvpfy:section:")
    ? atual.slice(0, atual.indexOf("<!-- mvpfy:section:"))
    : template.slice(0, template.indexOf("<!-- mvpfy:section:"));
  const conteudoAnterior = blocosExistentes.length === 0 && atual.trim() !== template.trim()
    ? `\n\n## Conteúdo anterior preservado\n\n${atual.trim()}`
    : "";
  return `${preambulo}${blocosTemplate
    .map((bloco) => blocosAtuais.get(bloco.id) || bloco.texto)
    .join("\n\n")}${conteudoAnterior}`.trimEnd() + "\n";
}

export function extrairBlocos(texto) {
  const marcador = /<!-- mvpfy:section:([a-z0-9-]+) -->/g;
  const encontrados = [...texto.matchAll(marcador)];
  return encontrados.map((encontrado, indice) => ({
    id: encontrado[1],
    texto: texto.slice(encontrado.index, encontrados[indice + 1]?.index || texto.length).trim(),
  }));
}

export function validarEstrutura(texto) {
  const blocos = extrairBlocos(texto);
  const ids = blocos.map((bloco) => bloco.id);
  if (new Set(ids).size !== ids.length) throw new Error("MVP.md possui IDs duplicados.");
  if (ids.length !== 35) throw new Error(`MVP.md possui ${ids.length} seções; o template exige 35.`);
}

export function normalizarCabecalho(texto) {
  return texto.replace(/^# Company\.md$/m, "# MVP.md");
}

function atualizarData(texto) {
  return texto.replace(/^updated_at:.*$/m, `updated_at: ${new Date().toISOString()}`);
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
