import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { analisarProjeto } from "../skills/mvpfy-context/scripts/analyze-existing-project.mjs";

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

test("limita a entrevista por etapa e encerra após oito respostas", async () => {
  const projeto = await mkdtemp(path.join(os.tmpdir(), "mvpfy-limite-"));
  const responder = async (stage, questionId) => executar("node", [
    "skills/mvpfy/scripts/record-answer.mjs",
    "--project", projeto,
    "--stage", stage,
    "--question-id", questionId,
    "--question-text", `Pergunta de ${stage}`,
    "--raw-answer", "Resposta suficiente",
    "--normalized-answer", "Resposta suficiente",
  ], { cwd: raiz });

  try {
    await executar("node", ["skills/mvpfy/scripts/setup-project.mjs", "--project", projeto], { cwd: raiz });
    await executar("node", ["skills/mvpfy/scripts/record-initial-idea.mjs", "--project", projeto, "--idea", "SaaS de teste"], { cwd: raiz });
    await executar("node", ["skills/mvpfy/scripts/record-initial-idea.mjs", "--project", projeto, "--continue"], { cwd: raiz });
    await responder("problem", "problem.context");
    await assert.rejects(responder("problem", "problem.impact"), /A etapa problem já recebeu sua pergunta essencial/);

    await responder("audience", "audience.primary");
    await responder("product", "product.journey");
    await responder("saas", "saas.tenancy-model");
    await responder("saas", "saas.tenant-unit");
    await responder("market", "market.value");
    await responder("technology", "technology.stack");
    await responder("marketing", "marketing.channel");

    const estado = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "state.json"), "utf8"));
    assert.equal(estado.closed_question_count, 8);
    assert.equal(estado.stage_question_counts.saas, 2);
    assert.equal(estado.interview_stage, "finalization");
    assert.equal(estado.interview_status, "ready");
    await assert.rejects(responder("marketing", "marketing.second-channel"), /Limite de 8 perguntas fechadas/);
  } finally {
    await rm(projeto, { recursive: true, force: true });
  }
});

test("setup analisa specs, manifestos e código sem ler dependências geradas", async () => {
  const projeto = await mkdtemp(path.join(os.tmpdir(), "mvpfy-contexto-"));
  try {
    await mkdir(path.join(projeto, "specs"), { recursive: true });
    await mkdir(path.join(projeto, "src"), { recursive: true });
    await mkdir(path.join(projeto, "node_modules", "fake"), { recursive: true });
    await writeFile(path.join(projeto, "specs", "checkout.md"), "# Checkout\n\nA pessoa compra o plano pelo site.\n", "utf8");
    await writeFile(path.join(projeto, "package.json"), JSON.stringify({ name: "produto-existente", dependencies: { react: "^19.0.0", typescript: "^5.0.0" }, scripts: { build: "vite build" } }), "utf8");
    await writeFile(path.join(projeto, "src", "app.ts"), "export const app = true;\n", "utf8");
    await writeFile(path.join(projeto, "node_modules", "fake", "ignored.js"), "throw new Error('não ler');\n", "utf8");

    await executar("node", ["skills/mvpfy/scripts/setup-project.mjs", "--project", projeto], { cwd: raiz });
    const relatorio = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "existing-project.json"), "utf8"));
    const estado = JSON.parse(await readFile(path.join(projeto, ".mvpfy", "state.json"), "utf8"));
    assert.equal(relatorio.status, "found");
    assert.equal(relatorio.summary.spec_files, 1);
    assert.equal(relatorio.summary.code_files, 1);
    assert.equal(relatorio.manifests.length, 1);
    assert.ok(relatorio.stack.some((item) => item.name === "React"));
    assert.ok(relatorio.suggested_answers.some((item) => item.field === "technology.stack"));
    assert.equal(relatorio.sources.code.some((item) => item.path.includes("node_modules")), false);
    assert.equal(estado.existing_project_context.report_path, ".mvpfy/existing-project.json");
    assert.deepEqual(estado.existing_project_context.suggested_answer_fields, ["technology.stack", "product.existing-codebase", "product.existing-specs"]);
  } finally {
    await rm(projeto, { recursive: true, force: true });
  }
});
