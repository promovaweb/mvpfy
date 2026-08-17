#!/usr/bin/env node

/** Calcula uma projeção somente de leitura do andamento do MVPFy. */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const AREAS = [
  { id: "problem", label: "Problema", sections: ["problem", "evidence"] },
  { id: "audience", label: "Público", sections: ["audience", "personas"] },
  {
    id: "product",
    label: "Produto",
    sections: ["value-and-positioning", "main-journey", "scope", "modules", "permissions"],
  },
  {
    id: "saas",
    label: "SaaS",
    sections: ["account-model", "onboarding", "subscription", "support-retention", "manual-processes"],
  },
  { id: "market", label: "Mercado e preço", sections: ["competition", "commercial", "economics"] },
  { id: "technology", label: "Tecnologia", sections: ["technology", "infrastructure", "ai"] },
  { id: "marketing", label: "Marketing", sections: ["website", "marketing", "sales"] },
  {
    id: "validation",
    label: "Validação",
    sections: ["metrics", "risks", "execution", "decisions", "hypotheses", "sources"],
  },
];

export async function readProgress(project = process.cwd()) {
  const root = path.resolve(project);
  const statePath = path.join(root, ".mvpfy", "state.json");
  const documentPath = path.join(root, "MVP.md");
  const state = existsSync(statePath) ? JSON.parse(await readFile(statePath, "utf8")) : null;
  const document = existsSync(documentPath) ? await readFile(documentPath, "utf8") : "";
  const sections = parseSections(document);
  const areas = AREAS.map((area) => {
    const items = area.sections.filter((id) => sections.has(id)).map((id) => ({
      id,
      complete: isComplete(sections.get(id)),
    }));
    const percent = items.length ? Math.round((items.filter((item) => item.complete).length * 100) / items.length) : 0;
    return {
      id: area.id,
      label: area.label,
      status: statusFor(percent, items.length),
      percent,
      complete: items.filter((item) => item.complete).length,
      total: items.length,
      sections: items,
    };
  });
  const activeAreas = areas.filter((area) => area.total > 0);
  const overall = activeAreas.length ? Math.round(activeAreas.reduce((sum, area) => sum + area.percent, 0) / activeAreas.length) : 0;
  const pending = [...sections.entries()].filter(([, text]) => !isComplete(text)).map(([id]) => id);
  const tenancy = state?.tenancy ?? { status: "pending", model: null };
  return {
    project: root,
    document: existsSync(documentPath),
    overall,
    status: statusFor(overall, sections.size),
    areas,
    pending_sections: pending,
    tenancy,
    interview: {
      status: state?.interview_status ?? "not_started",
      stage: state?.interview_stage ?? "initial_idea",
      answers: Array.isArray(state?.answered_question_ids) ? state.answered_question_ids.length : 0,
      last_question_id: state?.last_question_id ?? null,
    },
    next_gap: nextGap(state, pending, tenancy),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const project = argument(process.argv.slice(2), "project") || process.cwd();
  console.log(JSON.stringify(await readProgress(project), null, 2));
}

function parseSections(text) {
  const marker = /<!-- mvpfy:section:([a-z0-9-]+) -->/g;
  const matches = [...text.matchAll(marker)];
  return new Map(matches.map((match, index) => [match[1], text.slice(match.index, matches[index + 1]?.index || text.length).trim()]));
}

function isComplete(text = "") {
  return Boolean(text) && !/\b(Pendente|A definir|Ainda não|Ainda nao)\b/iu.test(text);
}

function statusFor(percent, total) {
  if (!total || percent === 0) return "pending";
  if (percent === 100) return "complete";
  return "in_progress";
}

function nextGap(state, pending, tenancy) {
  if (tenancy.status === "pending") return { id: "saas.tenancy-model", label: "Definir o modelo de atendimento SaaS" };
  const first = pending[0];
  if (first) return { id: first, label: `Preencher a seção ${first}` };
  if (state?.gaps?.length) return { id: "state.gap", label: String(state.gaps[0]) };
  return null;
}

function argument(values, name) {
  const index = values.indexOf(`--${name}`);
  return index >= 0 ? values[index + 1] : undefined;
}
