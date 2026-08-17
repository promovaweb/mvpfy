#!/usr/bin/env node

/** Persiste uma resposta antes de permitir que a entrevista avance. */

import { appendFile, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const estadoDir = path.join(projeto, ".mvpfy");
const estadoPath = path.join(estadoDir, "state.json");
const answersPath = path.join(estadoDir, "answers.jsonl");
const agora = new Date().toISOString();

if (!argumentos["question-id"] || !argumentos["raw-answer"]) {
  throw new Error("Informe --question-id e --raw-answer.");
}

const estado = JSON.parse(await readFile(estadoPath, "utf8"));
const evento = {
  event_id: randomUUID(),
  timestamp: agora,
  question_id: argumentos["question-id"],
  question_text: argumentos["question-text"] || "",
  raw_answer: argumentos["raw-answer"],
  normalized_answer: argumentos["normalized-answer"] || argumentos["raw-answer"],
  extracted_fields: String(argumentos["extracted-fields"] || "")
    .split(",")
    .map((campo) => campo.trim())
    .filter(Boolean),
  supersedes: argumentos.supersedes || null,
};

let tenancy = estado.tenancy || {
  status: "pending",
  model: null,
  tenant_unit: null,
  owner_role: null,
  membership_model: null,
  cross_tenant_membership: null,
  isolation_strategy: null,
  database_strategy: null,
  provisioning: null,
};
if (argumentos["tenancy-data"]) {
  let dados;
  try {
    dados = JSON.parse(argumentos["tenancy-data"]);
  } catch {
    throw new Error("O valor de --tenancy-data precisa ser JSON válido.");
  }
  tenancy = { ...tenancy, ...dados, status: dados.status || "confirmed" };
}

await appendFile(answersPath, `${JSON.stringify(evento)}\n`, "utf8");
const ids = new Set(estado.answered_question_ids || []);
ids.add(evento.question_id);
const novoEstado = {
  ...estado,
  tenancy,
  interview_status: "in_progress",
  last_question_id: evento.question_id,
  answered_question_ids: [...ids],
  updated_at: agora,
};
const temporario = `${estadoPath}.${process.pid}.tmp`;
await writeFile(temporario, `${JSON.stringify(novoEstado, null, 2)}\n`, "utf8");
await rename(temporario, estadoPath);
console.log(`Resposta ${evento.event_id} salva antes da próxima pergunta.`);

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}
