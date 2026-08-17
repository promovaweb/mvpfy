import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const executar = promisify(execFile);
const raiz = path.resolve(import.meta.dirname, "..");

test("setup, ideia inicial, registro e migração preservam o MVP.md", async () => {
  const projeto = await mkdtemp(path.join(os.tmpdir(), "mvpfy-"));
  try {
    await executar("node", ["skills/mvpfy/scripts/setup-project.mjs", "--project", projeto], { cwd: raiz });
    const estadoInicial = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "state.json"), "utf8"));
    assert.equal(estadoInicial.interview_stage, "initial_idea");
    assert.equal(estadoInicial.initial_idea, null);
    assert.equal(estadoInicial.tenancy.status, "pending");
    await executar("node", ["skills/mvpfy/scripts/record-initial-idea.mjs", "--project", projeto, "--idea", "SaaS para acompanhar leads", "--candidate-items", "CRM, aplicativo, agente de IA"], { cwd: raiz });
    await executar("node", ["skills/mvpfy/scripts/record-initial-idea.mjs", "--project", projeto, "--idea", "A agência paga e o cliente acompanha os próprios leads", "--candidate-items", "WhatsApp"], { cwd: raiz });
    const estadoComIdeia = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "state.json"), "utf8"));
    assert.equal(estadoComIdeia.interview_stage, "initial_idea");
    assert.equal(estadoComIdeia.initial_idea, "SaaS para acompanhar leads\n\nA agência paga e o cliente acompanha os próprios leads");
    assert.deepEqual(estadoComIdeia.candidate_items.map((item) => item.name), ["CRM", "aplicativo", "agente de IA", "WhatsApp"]);
    await executar("node", ["skills/mvpfy/scripts/record-initial-idea.mjs", "--project", projeto, "--continue"], { cwd: raiz });
    const estadoLiberado = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "state.json"), "utf8"));
    assert.equal(estadoLiberado.interview_stage, "questions");
    assert.deepEqual(estadoComIdeia.candidate_items.map((item) => item.name), ["CRM", "aplicativo", "agente de IA", "WhatsApp"]);
    await executar("node", ["skills/mvpfy/scripts/record-answer.mjs", "--project", projeto, "--question-id", "problem.context", "--question-text", "Onde?", "--raw-answer", "Em clínicas", "--normalized-answer", "Clínicas", "--extracted-fields", "problem.context,audience.segment"], { cwd: raiz });
    await executar("node", ["skills/mvpfy/scripts/record-answer.mjs", "--project", projeto, "--question-id", "saas.tenancy-model", "--question-text", "O sistema atenderá várias empresas?", "--raw-answer", "Sim, várias empresas na mesma aplicação", "--normalized-answer", "Multitenant compartilhado", "--extracted-fields", "saas.tenancy-model,saas.isolation", "--tenancy-data", '{"model":"multitenant_shared","status":"confirmed","tenant_unit":"company"}'], { cwd: raiz });
    const estadoComTenancy = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "state.json"), "utf8"));
    assert.equal(estadoComTenancy.tenancy.model, "multitenant_shared");
    assert.equal(estadoComTenancy.tenancy.tenant_unit, "company");
    const antes = await readFile(path.join(projeto, "MVP.md"), "utf8");
    assert.match(antes, /project_id:/);
    await executar("node", ["skills/mvpfy-migrate/scripts/migrate-company.mjs", "--project", projeto], { cwd: raiz });
    const depois = await readFile(path.join(projeto, "MVP.md"), "utf8");
    assert.equal(depois.includes("project_id:"), true);
    assert.equal((depois.match(/mvpfy:section:/g) || []).length, 35);
    await executar("node", ["skills/mvpfy-document/scripts/validate-company.mjs", "--project", projeto], { cwd: raiz });
  } finally {
    await rm(projeto, { recursive: true, force: true });
  }
});

test("setup transforma Company.md legado em MVP.md sem apagar a origem", async () => {
  const projeto = await mkdtemp(path.join(os.tmpdir(), "mvpfy-legado-"));
  try {
    await writeFile(path.join(projeto, "Company.md"), "# Company.md\n\nConteúdo legado.\n", "utf8");
    await executar("node", ["skills/mvpfy/scripts/setup-project.mjs", "--project", projeto], { cwd: raiz });
    const mvp = await readFile(path.join(projeto, "MVP.md"), "utf8");
    assert.match(mvp, /^# MVP\.md/m);
    assert.match(mvp, /Conteúdo legado/);
    assert.match(await readFile(path.join(projeto, "Company.md"), "utf8"), /Conteúdo legado/);
  } finally {
    await rm(projeto, { recursive: true, force: true });
  }
});
