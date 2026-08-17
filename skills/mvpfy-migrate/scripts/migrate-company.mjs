#!/usr/bin/env node

/** Migra o documento legado ou MVP.md para a estrutura atual. */

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mesclar, normalizarCabecalho, NOME_DOCUMENTO, NOME_DOCUMENTO_LEGADO } from "../../mvpfy-document/scripts/render-company.mjs";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const raizSkill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = await readFile(path.join(raizSkill, "..", "mvpfy-document", "assets", "MVP.template.md"), "utf8");
const mvpPath = path.join(projeto, NOME_DOCUMENTO);
const legadoPath = path.join(projeto, NOME_DOCUMENTO_LEGADO);
const origemPath = existsSync(mvpPath) ? mvpPath : legadoPath;
if (!existsSync(origemPath)) throw new Error("MVP.md não existe no projeto.");
const atual = await readFile(origemPath, "utf8");
await writeFile(mvpPath, normalizarCabecalho(mesclar(template, atual)), "utf8");
console.log("MVP.md migrado; conteúdo existente preservado.");

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}
