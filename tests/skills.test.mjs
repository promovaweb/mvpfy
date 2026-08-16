import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(raiz, "skills");
const nomes = (await readdir(skillsDir)).filter((nome) => nome.startsWith("mvpfy-") || nome === "mvpfy").sort();

test("o catálogo possui as doze skills previstas", () => {
  assert.equal(nomes.length, 12);
  assert.ok(nomes.includes("mvpfy"));
  assert.ok(nomes.includes("mvpfy-document"));
  assert.ok(nomes.includes("mvpfy-migrate"));
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
