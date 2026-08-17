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
const ids = new Set(estado.answered_question_ids || []);
const isCorrection = Boolean(argumentos.supersedes);
const count = Number(estado.closed_question_count || 0);
const limit = Math.max(Number(estado.max_closed_questions || 8), 8);
const stage = String(argumentos.stage || "general");
const stageLimits = {
  problem: 1,
  audience: 1,
  product: 1,
  saas: 2,
  market: 1,
  technology: 1,
  marketing: 1,
  brand: 0,
  general: limit,
};
const stageCounts = { ...(estado.stage_question_counts || {}) };
const stageCount = Number(stageCounts[stage] || 0);
const stageLimit = stageLimits[stage] ?? 1;
if (!isCorrection && count >= limit) {
  throw new Error(`Limite de ${limit} perguntas fechadas atingido. Gere ou revise o MVP.md.`);
}
if (!isCorrection && stageCount >= stageLimit) {
  throw new Error(`A etapa ${stage} já recebeu sua pergunta essencial. Siga para outra etapa.`);
}
const evento = {
  event_id: randomUUID(),
  timestamp: agora,
  question_id: argumentos["question-id"],
  stage,
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
ids.add(evento.question_id);
const nextCount = isCorrection ? count : count + 1;
if (!isCorrection) stageCounts[stage] = stageCount + 1;
const novoEstado = {
  ...estado,
  tenancy,
  interview_status: nextCount >= limit ? "ready" : "in_progress",
  interview_stage: nextCount >= limit ? "finalization" : estado.interview_stage,
  closed_question_count: nextCount,
  max_closed_questions: limit,
  stage_question_counts: stageCounts,
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
