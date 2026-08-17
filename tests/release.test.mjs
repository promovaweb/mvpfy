import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const executar = promisify(execFile);
const raiz = path.resolve(import.meta.dirname, "..");

test("VERSION, package.json e CHANGELOG.md usam a mesma versão", async () => {
  const versao = (await readFile(path.join(raiz, "VERSION"), "utf8")).trim();
  const versaoEbook = (await readFile(path.join(raiz, "ebooks", "VERSION"), "utf8")).trim();
  const pacote = JSON.parse(await readFile(path.join(raiz, "package.json"), "utf8"));
  const changelog = await readFile(path.join(raiz, "CHANGELOG.md"), "utf8");
  assert.match(versao, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/);
  assert.equal(pacote.version, versao);
  assert.equal(versaoEbook, versao);
  assert.match(changelog, new RegExp(`^## \\[${versao}\\]`, "m"));
  await executar("node", ["scripts/validate-release.mjs"], { cwd: raiz });
});

test("o extrator produz notas somente da versão atual", async () => {
  const pasta = await mkdtemp(path.join(os.tmpdir(), "mvpfy-release-"));
  const saida = path.join(pasta, "notes.md");
  try {
    await executar("node", ["scripts/extract-release-notes.mjs", "--output", saida], { cwd: raiz });
    const notas = await readFile(saida, "utf8");
    assert.match(notas, /oito perguntas/);
    assert.match(notas, /por etapa/);
  } finally {
    await rm(pasta, { recursive: true, force: true });
  }
});
