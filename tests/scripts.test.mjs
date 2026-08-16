import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const executar = promisify(execFile);
const raiz = path.resolve(import.meta.dirname, "..");

test("setup, registro e migração preservam o Company.md", async () => {
  const projeto = await mkdtemp(path.join(os.tmpdir(), "mvpfy-"));
  try {
    await executar("node", ["skills/mvpfy/scripts/setup-project.mjs", "--project", projeto], { cwd: raiz });
    await executar("node", ["skills/mvpfy/scripts/record-answer.mjs", "--project", projeto, "--question-id", "problem.context", "--question-text", "Onde?", "--raw-answer", "Em clínicas", "--normalized-answer", "Clínicas", "--extracted-fields", "problem.context,audience.segment"], { cwd: raiz });
    const antes = await readFile(path.join(projeto, "Company.md"), "utf8");
    assert.match(antes, /project_id:/);
    await executar("node", ["skills/mvpfy-migrate/scripts/migrate-company.mjs", "--project", projeto], { cwd: raiz });
    const depois = await readFile(path.join(projeto, "Company.md"), "utf8");
    assert.equal(depois.includes("project_id:"), true);
    assert.equal((depois.match(/mvpfy:section:/g) || []).length, 35);
  } finally {
    await rm(projeto, { recursive: true, force: true });
  }
});
