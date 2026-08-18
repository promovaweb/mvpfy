/** Testes de contrato da CLI, do runner de skills e das abas da TUI. */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { tmpdir } from "node:os";

const root = path.resolve(import.meta.dirname, "../..");
const execFileAsync = promisify(execFile);

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
  assert.match(source, /"add",\s+SKILLS_REPOSITORY/);
  assert.match(source, /"--skill",\s+"\*",\s+"--agent",\s+"claude-code",\s+"codex"/);
  assert.doesNotMatch(source, /"--all"/);
  assert.match(source, /\["update", "--project", "--yes"\]/);
});

test("a TUI possui abas de áreas e do MVP renderizado", async () => {
  const source = await readFile(path.join(root, "cli/src/tui.ts"), "utf8");
  assert.match(source, /label: "Áreas"/);
  assert.match(source, /label: "Home"/);
  assert.match(source, /key: "C-h"/);
  assert.match(source, /Seções completas:/);
  assert.doesNotMatch(source, /label: " Áreas do MVP "/);
  assert.match(source, /label: "MVP\.md"/);
  assert.match(source, /marked\.parse/);
  assert.match(source, /MVPFy — Dashboard de MVP e skills/);
  assert.match(source, /right: 21/);
  assert.match(source, /content: "Atualizar  \^U"/);
  assert.match(source, /bottom: 4/);
  assert.match(source, /activeBackground: "#5EEDE1"/);
  assert.match(source, /selectedBackground: "#6D28D9"/);
});

test("a entrada padrão abre a TUI e aceita --project", async () => {
  const cli = await readFile(path.join(root, "cli/src/cli.ts"), "utf8");
  const launcher = await readFile(path.join(root, "cli/bin/mvpfy.cjs"), "utf8");
  assert.match(cli, /\.option\("--project <caminho>"/);
  assert.match(cli, /\.action\(async \(options: RootOptions\) => openTui\(options\.project\)\)/);
  assert.match(launcher, /dist\/cli\.js/);
  assert.doesNotMatch(launcher, /dist\/main\.js/);
});

test("os subcomandos usam o diretório informado após o nome do comando", async () => {
  const project = await mkdtemp(path.join(tmpdir(), "mvpfy-cli-project-"));
  try {
    await writeFile(path.join(project, "MVP.md"), "# MVP de teste\n", "utf8");
    await execFileAsync("npx", ["tsc", "-p", "cli/tsconfig.json"], { cwd: root });
    const { stdout } = await execFileAsync(
      process.execPath,
      ["cli/dist/main.js", "progress", "--project", project, "--json"],
      { cwd: root },
    );
    const progress = JSON.parse(stdout);
    assert.equal(progress.project, project);
    assert.equal(progress.document, true);
  } finally {
    await rm(project, { recursive: true, force: true });
  }
});
