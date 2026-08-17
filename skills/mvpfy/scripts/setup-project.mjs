#!/usr/bin/env node

/** Prepara o estado local de um projeto que usará o MVPFy. */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { mesclar, normalizarCabecalho } from "../../mvpfy-document/scripts/render-company.mjs";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const raizSkill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = path.join(raizSkill, "..", "mvpfy-document", "assets", "MVP.template.md");
const estadoDir = path.join(projeto, ".mvpfy");
const estadoPath = path.join(estadoDir, "state.json");
const mvpPath = path.join(projeto, "MVP.md");
const legadoPath = path.join(projeto, "Company.md");
const agora = new Date().toISOString();

await mkdir(estadoDir, { recursive: true });

if (!existsSync(estadoPath)) {
  await writeFile(
    estadoPath,
    `${JSON.stringify(
      {
        schema_version: "1.0.0",
        project_id: randomUUID(),
        project_slug: path.basename(projeto),
        language: "pt-BR",
        interview_status: "not_started",
        interview_stage: "initial_idea",
        initial_idea: null,
        initial_idea_parts: [],
        candidate_items: [],
        active_domain: "problem",
        last_question_id: null,
        answered_question_ids: [],
        facts: [],
        choices: [],
        assumptions: [],
        recommendations: [],
        gaps: [],
        conflicts: [],
        section_status: {},
        research_status: {},
        document_version: 1,
        created_at: agora,
        updated_at: agora,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

if (!existsSync(path.join(estadoDir, "config.yaml"))) {
  await writeFile(
    path.join(estadoDir, "config.yaml"),
    `project_id: ${path.basename(projeto)}\nlanguage: pt-BR\nproduct_type: SaaS\nmvp_file: MVP.md\ntemplate_schema: 1.0.0\n`,
    "utf8",
  );
}

for (const arquivo of ["answers.jsonl", "research.json", "template-version"]) {
  const destino = path.join(estadoDir, arquivo);
  if (existsSync(destino)) continue;
  await writeFile(destino, arquivo === "research.json" ? "{}\n" : arquivo === "template-version" ? "1.0.0\n" : "", "utf8");
}

if (!existsSync(mvpPath)) {
  const conteudo = await readFile(template, "utf8");
  const estado = JSON.parse(await readFile(estadoPath, "utf8"));
  const legado = existsSync(legadoPath) ? await readFile(legadoPath, "utf8") : conteudo;
  await writeFile(
    mvpPath,
    normalizarCabecalho(mesclar(conteudo, legado))
      .replace("project_id: Pendente", `project_id: ${estado.project_id}`)
      .replace("project_name: Pendente", `project_name: ${path.basename(projeto)}`)
      .replace("created_at: Pendente", `created_at: ${agora}`)
      .replace("updated_at: Pendente", `updated_at: ${agora}`),
    "utf8",
  );
}

console.log(`Projeto MVPFy preparado em ${projeto}`);

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}
