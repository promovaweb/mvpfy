/** Testes de contrato da CLI, do runner de skills e das abas da TUI. */

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("a CLI e o ebook usam a versão do framework", async () => {
  const version = (await readFile(path.join(root, "VERSION"), "utf8")).trim();
  const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  const cliVersion = await readFile(path.join(root, "cli/src/version.ts"), "utf8");
  assert.equal(packageJson.version, version);
  assert.match(cliVersion, new RegExp(`VERSION = "${version}"`));
  assert.equal((await readFile(path.join(root, "ebooks/VERSION"), "utf8")).trim(), version);
});

test("o runner chama skills add e skills update", async () => {
  const source = await readFile(path.join(root, "cli/src/skills-runner.ts"), "utf8");
  assert.match(source, /\["add", SKILLS_REPOSITORY/);
  assert.match(source, /\["update", "--project", "--yes"\]/);
});

test("a TUI possui abas de áreas e do MVP renderizado", async () => {
  const source = await readFile(path.join(root, "cli/src/tui.ts"), "utf8");
  assert.match(source, /label: "Áreas"/);
  assert.match(source, /label: "MVP\.md"/);
  assert.match(source, /marked\.parse/);
});

test("a entrada padrão abre a TUI e aceita --project", async () => {
  const cli = await readFile(path.join(root, "cli/src/cli.ts"), "utf8");
  const launcher = await readFile(path.join(root, "cli/bin/mvpfy.cjs"), "utf8");
  assert.match(cli, /\.option\("--project <caminho>"/);
  assert.match(cli, /\.action\(async \(options: RootOptions\) => openTui\(options\.project\)\)/);
  assert.match(launcher, /dist\/cli\.js/);
  assert.doesNotMatch(launcher, /dist\/main\.js/);
});
