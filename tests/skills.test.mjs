import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(raiz, "skills");
const nomes = (await readdir(skillsDir)).filter((nome) => nome.startsWith("mvpfy-") || nome === "mvpfy").sort();

test("o catálogo possui as quatorze skills previstas", () => {
  assert.equal(nomes.length, 14);
  assert.ok(nomes.includes("mvpfy"));
  assert.ok(nomes.includes("mvpfy-document"));
  assert.ok(nomes.includes("mvpfy-migrate"));
  assert.ok(nomes.includes("mvpfy-progress"));
  assert.ok(nomes.includes("mvpfy-setup"));
});

test("cada skill possui frontmatter e metadados de interface", async () => {
  for (const nome of nomes) {
    const skill = await readFile(path.join(skillsDir, nome, "SKILL.md"), "utf8");
    const descricao = skill.match(/^description: (.+)$/m)?.[1] || "";
    assert.ok(descricao.length >= 90 && descricao.length <= 160, nome);
    const interfaceYaml = await readFile(path.join(skillsDir, nome, "agents", "openai.yaml"), "utf8");
    assert.match(interfaceYaml, /display_name:/, nome);
    assert.match(interfaceYaml, /short_description:/, nome);
    assert.match(interfaceYaml, new RegExp(`default_prompt:.*\\$${nome}`), nome);
  }
});

test("a orquestradora exige uma pergunta por turno e leitura somente de fontes", async () => {
  const skill = await readFile(path.join(skillsDir, "mvpfy", "SKILL.md"), "utf8");
  assert.match(skill, /somente uma pergunta principal por turno/);
  assert.match(skill, /somente para\s+leitura/);
  assert.match(skill, /Nunca crie, edite, renomeie, remova ou migre/);
  assert.match(skill, /três opções prontas/);
  assert.match(skill, /Conversar mais sobre este tema/);
  assert.match(skill, /initial_idea/);
  assert.match(skill, /candidate_items/);
  assert.match(skill, /Não comece a entrevista fechada/);
  assert.match(skill, /Analise toda a mensagem recebida antes de formular qualquer pergunta/);
  assert.match(skill, /Se a pessoa enviar a ideia completa em uma única mensagem/);
  assert.match(skill, /saas\.tenancy-model/);
  assert.match(skill, /unidade do tenant/);
  assert.match(skill, /--tenancy-data/);
  assert.match(skill, /no máximo oito perguntas/);
  assert.match(skill, /uma pergunta essencial/);
  assert.match(skill, /estado como finalização/);
});

test("a trilha SaaS trata multitenancy e Teams do Laravel", async () => {
  const saas = await readFile(path.join(skillsDir, "mvpfy-saas", "SKILL.md"), "utf8");
  const multitenancy = await readFile(path.join(skillsDir, "mvpfy-saas", "references", "multitenancy.md"), "utf8");
  const technology = await readFile(path.join(skillsDir, "mvpfy-technology", "SKILL.md"), "utf8");
  assert.match(saas, /primeira pergunta fechada/);
  assert.match(saas, /Teams/);
  assert.match(multitenancy, /pergunta adicional/);
  assert.match(multitenancy, /Não faça perguntas separadas/);
  assert.match(multitenancy, /banco ou provisionamento/);
  assert.match(technology, /Teams/);
});
