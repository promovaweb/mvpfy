#!/usr/bin/env node

/** Extrai uma seção do CHANGELOG para as notas da release do GitHub. */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argumentos = lerArgumentos(process.argv.slice(2));
const versao = argumentos.version || (await readFile(path.join(raiz, "VERSION"), "utf8")).trim();
const changelog = await readFile(path.join(raiz, "CHANGELOG.md"), "utf8");
const inicio = changelog.search(new RegExp(`^## \\[${escaparRegExp(versao)}\\](?: - \\d{4}-\\d{2}-\\d{2})?\\s*$`, "m"));

if (inicio < 0) {
  falhar(`CHANGELOG.md não possui uma seção para [${versao}]`);
}

const corpo = changelog.slice(inicio).replace(/^## .*\n?/, "");
const fim = corpo.search(/^## /m);
const notas = (fim >= 0 ? corpo.slice(0, fim) : corpo).trim();
if (!notas) {
  falhar(`A seção [${versao}] do CHANGELOG.md está vazia`);
}

if (argumentos.output) {
  await writeFile(path.resolve(process.cwd(), argumentos.output), `${notas}\n`, "utf8");
  console.log(`Notas da release gravadas em ${argumentos.output}`);
} else {
  console.log(notas);
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

function escaparRegExp(valor) {
  return valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function falhar(mensagem) {
  console.error(`Erro de release: ${mensagem}`);
  process.exit(1);
}
