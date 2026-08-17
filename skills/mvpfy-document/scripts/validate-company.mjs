#!/usr/bin/env node

/** Valida estrutura, frontmatter e campos mínimos do plano MVPFy. */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { extrairBlocos, validarEstrutura, NOME_DOCUMENTO, NOME_DOCUMENTO_LEGADO } from "./render-company.mjs";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const mvpPath = path.join(projeto, NOME_DOCUMENTO);
const legadoPath = path.join(projeto, NOME_DOCUMENTO_LEGADO);
const documentoPath = existsSync(mvpPath) ? mvpPath : legadoPath;
if (!existsSync(documentoPath)) throw new Error("MVP.md não existe no projeto.");
const mvp = await readFile(documentoPath, "utf8");
validarEstrutura(mvp);

const obrigatorias = [
  "problem", "audience", "value-and-positioning", "main-journey", "account-model",
  "onboarding", "scope", "subscription", "support-retention", "commercial",
  "economics", "technology", "marketing", "metrics",
];
const blocos = new Map(extrairBlocos(mvp).map((bloco) => [bloco.id, bloco.texto]));
const pendentes = obrigatorias.filter((id) => (blocos.get(id) || "").includes("Pendente"));
const status = pendentes.length === 0 ? "ready" : "preliminary";
console.log(JSON.stringify({ status, pendencias: pendentes }, null, 2));
if (argumentos.strict && pendentes.length > 0) process.exitCode = 1;

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}
