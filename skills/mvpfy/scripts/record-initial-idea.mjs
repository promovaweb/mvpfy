#!/usr/bin/env node

/** Registra a ideia inicial do SaaS antes da primeira pergunta fechada. */

import { appendFile, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const estadoPath = path.join(projeto, ".mvpfy", "state.json");
const answersPath = path.join(projeto, ".mvpfy", "answers.jsonl");
const agora = new Date().toISOString();

if (!argumentos.idea && !argumentos.continue) throw new Error("Informe --idea com a ideia inicial do SaaS e do MVP.");

const estado = JSON.parse(await readFile(estadoPath, "utf8"));
if (argumentos.continue) {
  if (!estado.initial_idea) throw new Error("Registre a ideia inicial antes de continuar.");
  await salvarEstado({ ...estado, interview_stage: "questions", interview_status: "in_progress", updated_at: agora });
  console.log("Entrada inicial concluída; entrevista liberada para as perguntas.");
} else {
const partesAnteriores = Array.isArray(estado.initial_idea_parts) ? estado.initial_idea_parts : [];
const partes = [...partesAnteriores, argumentos.idea];
const candidatosAnteriores = Array.isArray(estado.candidate_items) ? estado.candidate_items : [];
const itensNovos = String(argumentos["candidate-items"] || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean)
  .map((name) => ({ name, status: "candidate", source: "initial_idea" }));
const itens = [...candidatosAnteriores, ...itensNovos].filter((item, indice, lista) =>
  lista.findIndex((candidato) => candidato.name.toLowerCase() === item.name.toLowerCase()) === indice
);
const evento = {
  event_id: randomUUID(),
  timestamp: agora,
  event_type: "initial_idea",
  question_id: "intake.initial-idea",
  question_text: "Conte, em um único texto, qual SaaS você imagina, para quem ele serve, qual problema resolve e quais módulos, recursos ou integrações você já pensou.",
  raw_answer: argumentos.idea,
  normalized_answer: argumentos.idea,
  extracted_fields: ["initial_idea", "candidate_items"],
  supersedes: null,
};

await appendFile(answersPath, `${JSON.stringify(evento)}\n`, "utf8");
const ids = new Set(estado.answered_question_ids || []);
ids.add(evento.question_id);
const novoEstado = {
  ...estado,
  interview_status: "in_progress",
  interview_stage: estado.interview_stage === "questions" ? "questions" : "initial_idea",
  initial_idea: partes.join("\n\n"),
  initial_idea_parts: partes,
  initial_idea_event_id: evento.event_id,
  candidate_items: itens,
  last_question_id: evento.question_id,
  answered_question_ids: [...ids],
  updated_at: agora,
};
await salvarEstado(novoEstado);
console.log(`Ideia inicial ${evento.event_id} salva antes da próxima pergunta.`);
}

async function salvarEstado(novoEstado) {
  const temporario = `${estadoPath}.${process.pid}.tmp`;
  await writeFile(temporario, `${JSON.stringify(novoEstado, null, 2)}\n`, "utf8");
  await rename(temporario, estadoPath);
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
