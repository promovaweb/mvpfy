#!/usr/bin/env node

/** Cria ou atualiza Company.md preservando blocos identificados pelo template. */

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const argumentos = lerArgumentos(process.argv.slice(2));
const projeto = path.resolve(argumentos.project || process.cwd());
const raizSkill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(raizSkill, "assets", "Company.template.md");
const companyPath = path.join(projeto, "Company.md");

if (argumentos.check) {
  const atual = await readFile(companyPath, "utf8");
  validarEstrutura(atual);
  console.log("Company.md está alinhado aos IDs do template.");
} else {
  const template = await readFile(templatePath, "utf8");
  const atual = existsSync(companyPath) ? await readFile(companyPath, "utf8") : template;
  const renderizado = mesclar(template, atual);
  await writeFile(companyPath, atualizarData(renderizado), "utf8");
  console.log(`Company.md atualizado em ${companyPath}`);
}

export function mesclar(template, atual) {
  const blocosTemplate = extrairBlocos(template);
  const blocosAtuais = new Map(extrairBlocos(atual).map((bloco) => [bloco.id, bloco.texto]));
  const preambulo = atual.includes("<!-- mvpfy:section:")
    ? atual.slice(0, atual.indexOf("<!-- mvpfy:section:"))
    : template.slice(0, template.indexOf("<!-- mvpfy:section:"));
  return `${preambulo}${blocosTemplate
    .map((bloco) => blocosAtuais.get(bloco.id) || bloco.texto)
    .join("\n\n")}`.trimEnd() + "\n";
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
  if (new Set(ids).size !== ids.length) throw new Error("Company.md possui IDs duplicados.");
  if (ids.length !== 35) throw new Error(`Company.md possui ${ids.length} seções; o template exige 35.`);
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
