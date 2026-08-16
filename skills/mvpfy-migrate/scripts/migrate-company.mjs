#!/usr/bin/env node

/** Migra Company.md para a estrutura atual sem remover blocos preenchidos. */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mesclar } from "../../mvpfy-document/scripts/render-company.mjs";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const raizSkill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = await readFile(path.join(raizSkill, "..", "mvpfy-document", "assets", "Company.template.md"), "utf8");
const companyPath = path.join(projeto, "Company.md");
const atual = await readFile(companyPath, "utf8");
await writeFile(companyPath, mesclar(template, atual), "utf8");
console.log("Company.md migrado; conteúdo existente preservado.");

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}
