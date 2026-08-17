/** Leitura de progresso do projeto consumidor do MVPFy. */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export interface ProgressArea {
  id: string;
  label: string;
  status: "pending" | "in_progress" | "complete";
  percent: number;
  complete: number;
  total: number;
  sections: Array<{ id: string; complete: boolean }>;
}

export interface ProgressSnapshot {
  project: string;
  document: boolean;
  overall: number;
  status: "pending" | "in_progress" | "complete";
  areas: ProgressArea[];
  pending_sections: string[];
  tenancy: Record<string, unknown>;
  interview: {
    status: string;
    stage: string;
    answers: number;
    last_question_id: string | null;
  };
  next_gap: { id: string; label: string } | null;
}

export const PROGRESS_AREAS = [
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
] as const;

export async function scanProgress(project = process.cwd()): Promise<ProgressSnapshot> {
  const root = resolve(project);
  const statePath = `${root}/.mvpfy/state.json`;
  const documentPath = `${root}/MVP.md`;
  const state = existsSync(statePath) ? (JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>) : {};
  const document = existsSync(documentPath) ? await readFile(documentPath, "utf8") : "";
  const sections = parseSections(document);
  const areas = PROGRESS_AREAS.map((area) => {
    const items = area.sections.filter((id) => sections.has(id)).map((id) => ({ id, complete: isComplete(sections.get(id)) }));
    const complete = items.filter((item) => item.complete).length;
    const percent = items.length ? Math.round((complete * 100) / items.length) : 0;
    return { id: area.id, label: area.label, status: areaStatus(percent, items.length), percent, complete, total: items.length, sections: items };
  });
  const activeAreas = areas.filter((area) => area.total > 0);
  const overall = activeAreas.length ? Math.round(activeAreas.reduce((sum, area) => sum + area.percent, 0) / activeAreas.length) : 0;
  const tenancy = asRecord(state.tenancy);
  const pending = [...sections.entries()].filter(([, text]) => !isComplete(text)).map(([id]) => id);
  return {
    project: root,
    document: Boolean(document),
    overall,
    status: areaStatus(overall, sections.size),
    areas,
    pending_sections: pending,
    tenancy,
    interview: {
      status: stringValue(state.interview_status, "not_started"),
      stage: stringValue(state.interview_stage, "initial_idea"),
      answers: Array.isArray(state.answered_question_ids) ? state.answered_question_ids.length : 0,
      last_question_id: typeof state.last_question_id === "string" ? state.last_question_id : null,
    },
    next_gap: nextGap(state, pending, tenancy),
  };
}

export function formatProgress(snapshot: ProgressSnapshot): string {
  const lines = [
    `Progresso do MVP: ${snapshot.overall}%`,
    `Documento: ${snapshot.document ? "MVP.md encontrado" : "MVP.md ainda não preparado"}`,
    `Entrevista: ${snapshot.interview.answers} resposta(s) salva(s)`,
    `Modelo SaaS: ${tenancyLabel(snapshot.tenancy)}`,
    "",
    ...snapshot.areas.map((area) => `${symbol(area.status)} ${area.label}: ${area.percent}% (${area.complete}/${area.total})`),
  ];
  if (snapshot.next_gap) lines.push("", `Próximo ponto: ${snapshot.next_gap.label}`);
  return lines.join("\n");
}

export function tenancyLabel(tenancy: Record<string, unknown>): string {
  const model = typeof tenancy.model === "string" ? tenancy.model : "";
  if (model === "multitenant_shared") return "multitenante compartilhado";
  if (model === "single_tenant") return "instalação separada";
  if (model === "undecided") return "comparação em aberto";
  return "pendente";
}

function parseSections(text: string): Map<string, string> {
  const marker = /<!-- mvpfy:section:([a-z0-9-]+) -->/g;
  const matches = [...text.matchAll(marker)];
  return new Map(matches.map((match, index) => [match[1]!, text.slice(match.index!, matches[index + 1]?.index || text.length).trim()]));
}

function isComplete(text = ""): boolean {
  return Boolean(text) && !/\b(Pendente|A definir|Ainda não|Ainda nao)\b/iu.test(text);
}

function areaStatus(percent: number, total: number): ProgressArea["status"] {
  if (!total || percent === 0) return "pending";
  if (percent === 100) return "complete";
  return "in_progress";
}

function nextGap(state: Record<string, unknown>, pending: string[], tenancy: Record<string, unknown>): ProgressSnapshot["next_gap"] {
  if (!tenancy.status || tenancy.status === "pending") return { id: "saas.tenancy-model", label: "Definir o modelo de atendimento SaaS" };
  const first = pending[0];
  if (first) return { id: first, label: `Preencher a seção ${first}` };
  const gaps = Array.isArray(state.gaps) ? state.gaps : [];
  return gaps.length && typeof gaps[0] === "string" ? { id: "state.gap", label: gaps[0] } : null;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : { status: "pending" };
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function symbol(status: ProgressArea["status"]): string {
  return status === "complete" ? "✓" : status === "in_progress" ? "◐" : "○";
}
