#!/usr/bin/env node

/** Valida a versão publicada e sua entrada correspondente no changelog. */

import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argumentos = lerArgumentos(process.argv.slice(2));
const versao = (await readFile(path.join(raiz, "VERSION"), "utf8")).trim();
const pacote = JSON.parse(await readFile(path.join(raiz, "package.json"), "utf8"));
const changelog = await readFile(path.join(raiz, "CHANGELOG.md"), "utf8");
const cliVersion = await readFile(path.join(raiz, "cli", "src", "version.ts"), "utf8");
const ebookVersion = (await readFile(path.join(raiz, "ebooks", "VERSION"), "utf8")).trim();
const cliBuildPath = path.join(raiz, "cli", "dist", "version.js");

const atual = analisarSemver(versao);
if (!atual) {
  falhar(`VERSION não contém um SemVer válido: ${versao}`);
}

if (pacote.version !== versao) {
  falhar(`package.json usa ${pacote.version}, mas VERSION usa ${versao}`);
}

if (!cliVersion.includes(`VERSION = "${versao}"`)) {
  falhar(`cli/src/version.ts não usa a versão ${versao}`);
}

if (await existe(cliBuildPath)) {
  const cliBuild = await readFile(cliBuildPath, "utf8");
  if (!cliBuild.includes(`VERSION = "${versao}"`)) {
    falhar(`cli/dist/version.js está desatualizado; execute npm run cli:build`);
  }
}

if (ebookVersion !== versao) {
  falhar(`ebooks/VERSION usa ${ebookVersion}, mas VERSION usa ${versao}`);
}

const titulo = new RegExp(`^## \\[${escaparRegExp(versao)}\\](?: - (\\d{4}-\\d{2}-\\d{2}))?\\s*$`, "m");
if (!titulo.test(changelog)) {
  falhar(`CHANGELOG.md não possui uma seção para [${versao}]`);
}

const anterior = argumentos.previous ? lerVersaoAnterior(argumentos.previous) : null;
if (anterior) {
  const anteriorSemver = analisarSemver(anterior);
  if (!anteriorSemver) {
    falhar(`A versão anterior não é SemVer válido: ${anterior}`);
  }
  if (compararSemver(atual, anteriorSemver) <= 0) {
    falhar(`VERSION precisa avançar de ${anterior} para ${versao}`);
  }
}

console.log(`OK: release MVPFy ${versao} validado${anterior ? ` após ${anterior}` : ""}.`);

function lerArgumentos(valores) {
  const resultado = {};
  for (let indice = 0; indice < valores.length; indice += 1) {
    if (!valores[indice].startsWith("--")) continue;
    resultado[valores[indice].slice(2)] = valores[indice + 1] || true;
    indice += 1;
  }
  return resultado;
}

function analisarSemver(valor) {
  const correspondencia = valor.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/);
  if (!correspondencia) return null;
  return {
    major: Number(correspondencia[1]),
    minor: Number(correspondencia[2]),
    patch: Number(correspondencia[3]),
    prerelease: correspondencia[4] || "",
  };
}

function compararSemver(esquerda, direita) {
  for (const campo of ["major", "minor", "patch"]) {
    if (esquerda[campo] !== direita[campo]) return esquerda[campo] - direita[campo];
  }
  if (!esquerda.prerelease && direita.prerelease) return 1;
  if (esquerda.prerelease && !direita.prerelease) return -1;
  return esquerda.prerelease.localeCompare(direita.prerelease);
}

function lerVersaoAnterior(commit) {
  if (/^0+$/.test(commit)) return null;
  const arquivo = lerArquivoNoCommit(commit, "VERSION");
  if (arquivo) return arquivo.trim();
  const pacote = lerArquivoNoCommit(commit, "package.json");
  return pacote ? JSON.parse(pacote).version : null;
}

function lerArquivoNoCommit(commit, arquivo) {
  try {
    return execFileSync("git", ["show", `${commit}:${arquivo}`], {
      cwd: raiz,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch (erro) {
    if (erro.status === 128) return null;
    throw erro;
  }
}

function escaparRegExp(valor) {
  return valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function falhar(mensagem) {
  console.error(`Erro de release: ${mensagem}`);
  process.exit(1);
}

async function existe(arquivo) {
  try {
    await readFile(arquivo);
    return true;
  } catch {
    return false;
  }
}
