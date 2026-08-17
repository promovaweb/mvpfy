/** TUI do MVPFy com progresso por áreas e leitura colorida do MVP.md. */

import blessed from "neo-blessed";
import { marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { readFile } from "node:fs/promises";
import type { Widgets } from "blessed";
import { scanProgress, tenancyLabel, type ProgressArea, type ProgressSnapshot } from "./progress.js";
import { installArguments, runSkills, updateArguments } from "./skills-runner.js";
import { VERSION } from "./version.js";

marked.use(markedTerminal({ reflowText: true, width: 100, showSectionPrefix: false }));

const THEME = {
  background: "#000A0E", surface: "#001117", text: "#F2F8F9", muted: "#B2C6CE",
  border: "#5F7D8C", accent: "#5EEDE1", selected: "#6D28D9", warning: "#FCD34D",
} as const;

type Tab = "progress" | "areas" | "document" | "skills" | "about";

export const TUI_TABS: ReadonlyArray<{ id: Tab; label: string; key: string }> = [
  { id: "progress", label: "Progresso", key: "C-p" },
  { id: "areas", label: "Áreas", key: "C-a" },
  { id: "document", label: "MVP.md", key: "C-m" },
  { id: "skills", label: "Skills", key: "C-k" },
  { id: "about", label: "Sobre", key: "C-o" },
];

export async function openTui(project = process.cwd()): Promise<void> {
  const screen = blessed.screen({ smartCSR: true, fullUnicode: true, mouse: true, title: "MVPFy", dockBorders: true });
  const dashboard = new MvpfyTui(project);
  await dashboard.start(screen);
  await new Promise<void>((resolve) => screen.once("destroy", resolve));
}

export class MvpfyTui {
  readonly project: string;
  #screen?: Widgets.Screen;
  #body?: Widgets.BoxElement;
  #status?: Widgets.BoxElement;
  #snapshot?: ProgressSnapshot;
  #tab: Tab = "progress";
  #poller?: NodeJS.Timeout;

  constructor(project = process.cwd()) { this.project = project; }

  async start(screen: Widgets.Screen): Promise<void> {
    this.#screen = screen;
    this.mountShell(screen);
    this.bindKeys(screen);
    await this.refresh();
    screen.once("destroy", () => { if (this.#poller) clearInterval(this.#poller); });
    this.#poller = setInterval(() => void this.refresh(), 2_000);
  }

  private mountShell(screen: Widgets.Screen): void {
    blessed.box({ parent: screen, top: 0, left: 0, width: "100%", height: 3, content: `{bold}MVPFy{/bold}  ·  Plano do primeiro MVP SaaS  ·  v${VERSION}`, tags: true, padding: { left: 1 }, style: { fg: THEME.text, bg: THEME.surface } });
    let left = 1;
    for (const tab of TUI_TABS) {
      const button = blessed.button({ parent: screen, top: 3, left, width: tab.label.length + 6, height: 2, content: ` ${tab.label} `, mouse: true, keys: true, style: { fg: THEME.muted, bg: THEME.background, focus: { fg: THEME.background, bg: THEME.accent }, hover: { fg: THEME.background, bg: THEME.accent } } });
      button.on("press", () => this.showTab(tab.id));
      left += tab.label.length + 7;
    }
    blessed.line({ parent: screen, top: 5, left: 0, width: "100%", orientation: "horizontal", style: { fg: THEME.border } });
    this.#body = blessed.box({ parent: screen, top: 6, left: 1, right: 1, bottom: 3, style: { fg: THEME.text, bg: THEME.background } });
    this.#status = blessed.box({ parent: screen, bottom: 2, left: 0, width: "100%", height: 1, padding: { left: 1 }, style: { fg: THEME.muted, bg: THEME.surface } });
    blessed.box({ parent: screen, bottom: 1, left: 0, width: "100%", height: 1, content: " ^P Progresso  ^A Áreas  ^M MVP.md  ^K Skills  ^U Atualizar  I Instalar  R Atualizar skills  ^Q Sair", style: { fg: THEME.accent, bg: THEME.background } });
    blessed.box({ parent: screen, bottom: 0, left: 0, width: "100%", height: 1, content: " Setas: navegar  ·  Esc: voltar  ·  MVP.md: somente leitura", style: { fg: THEME.text, bg: THEME.surface, bold: true } });
  }

  private bindKeys(screen: Widgets.Screen): void {
    screen.key(["C-q"], () => screen.destroy());
    screen.key(["C-p"], () => this.showTab("progress"));
    screen.key(["C-a"], () => this.showTab("areas"));
    screen.key(["C-m"], () => this.showTab("document"));
    screen.key(["C-k"], () => this.showTab("skills"));
    screen.key(["C-o"], () => this.showTab("about"));
    screen.key(["C-u"], () => void this.refresh());
    screen.key(["i", "I"], () => void this.runSkillAction("install"));
    screen.key(["r", "R"], () => void this.runSkillAction("update"));
    screen.key(["escape"], () => this.showTab("progress"));
  }

  private async refresh(): Promise<void> {
    try {
      this.#snapshot = await scanProgress(this.project);
      this.showTab(this.#tab, false);
      this.setStatus("Dados atualizados.");
    } catch (error) { this.setStatus(`Erro: ${error instanceof Error ? error.message : String(error)}`); }
  }

  private showTab(tab: Tab, render = true): void {
    this.#tab = tab;
    if (!this.#body || !this.#screen) return;
    for (const child of [...this.#body.children]) child.destroy();
    if (tab === "progress") this.renderProgress(this.#body);
    else if (tab === "areas") this.renderAreas(this.#body);
    else if (tab === "document") void this.renderDocument(this.#body);
    else if (tab === "skills") this.renderSkills(this.#body);
    else this.renderAbout(this.#body);
    if (render) this.#screen.render();
  }

  private renderProgress(body: Widgets.BoxElement): void {
    const snapshot = this.#snapshot;
    if (!snapshot) return;
    blessed.box({ parent: body, top: 0, left: 0, width: "100%", height: 8, border: "line", align: "center", valign: "middle", content: `{bold}MVP ${snapshot.overall}%{/bold}\n${bar(snapshot.overall, 42)}\n${snapshot.document ? "MVP.md encontrado" : "Prepare o projeto para começar"}`, tags: true, style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.accent } } });
    blessed.box({ parent: body, top: 9, left: 0, width: "49%", bottom: 0, border: "line", label: " Áreas do MVP ", padding: { left: 1, right: 1 }, content: snapshot.areas.map(areaLine).join("\n"), style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.border } } });
    blessed.box({ parent: body, top: 9, left: "51%", right: 0, bottom: 0, border: "line", label: " Próximo ponto ", padding: { left: 1, right: 1 }, content: `${snapshot.next_gap?.label ?? "Nenhuma pendência identificada."}\n\nModelo SaaS: ${tenancyLabel(snapshot.tenancy)}\nRespostas salvas: ${snapshot.interview.answers}`, style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.warning } } });
  }

  private renderAreas(body: Widgets.BoxElement): void {
    const snapshot = this.#snapshot;
    if (!snapshot) return;
    const list = blessed.list({ parent: body, top: 0, left: 0, width: "38%", bottom: 0, border: "line", label: " Áreas ", keys: true, vi: true, mouse: true, items: snapshot.areas.map((area) => `${symbol(area.status)} ${area.label}  ${area.percent}%`), style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.border }, selected: { fg: THEME.text, bg: THEME.selected } } });
    const detail = blessed.box({ parent: body, top: 0, left: "40%", right: 0, bottom: 0, border: "line", label: " Detalhe ", padding: { left: 1, right: 1 }, style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.border } } });
    const update = (): void => { const selected = (list as Widgets.ListElement & { selected?: number }).selected ?? 0; const area = snapshot.areas[selected]; detail.setContent(area ? `${area.label}\n\n${bar(area.percent, 30)}\n\n${area.sections.map((section) => `${section.complete ? "✓" : "○"} ${section.id}`).join("\n")}` : "Selecione uma área."); this.#screen?.render(); };
    list.on("select item", update); list.on("keypress", update); update();
  }

  private async renderDocument(body: Widgets.BoxElement): Promise<void> {
    try {
      const content = await readFile(`${this.project}/MVP.md`, "utf8");
      blessed.box({ parent: body, top: 0, left: 0, right: 0, bottom: 0, border: "line", label: " MVP.md renderizado ", scrollable: true, alwaysScroll: true, keys: true, vi: true, mouse: true, tags: false, content: String(marked.parse(content, { async: false })), style: { fg: THEME.text, bg: THEME.background, border: { fg: THEME.accent } }, scrollbar: { style: { bg: THEME.accent } } });
      this.#screen?.render();
    } catch { blessed.box({ parent: body, content: "MVP.md ainda não existe. Use mvpfy install ou prepare o projeto com a skill mvpfy.", padding: { left: 2, top: 1 }, style: { fg: THEME.warning, bg: THEME.surface } }); }
  }

  private renderSkills(body: Widgets.BoxElement): void {
    blessed.box({ parent: body, top: 0, left: 0, right: 0, height: 8, border: "line", label: " Gerenciamento ", padding: { left: 1, right: 1 }, content: "I  instalar ou reconciliar as skills do MVPFy\nR  atualizar skills instaladas\n\nAs duas ações executam o CLI oficial `skills` por baixo dos panos.", style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.border } } });
    blessed.box({ parent: body, top: 10, left: 0, right: 0, bottom: 0, border: "line", label: " Skills do MVPFy ", padding: { left: 1, right: 1 }, content: "mvpfy\nmvpfy-progress\nmvpfy-problem\nmvpfy-audience\nmvpfy-product\nmvpfy-saas\nmvpfy-market\nmvpfy-pricing\nmvpfy-technology\nmvpfy-marketing\nmvpfy-brand\nmvpfy-document\nmvpfy-migrate", style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.border } } });
  }

  private renderAbout(body: Widgets.BoxElement): void {
    blessed.box({ parent: body, top: 1, left: 2, right: 2, height: 10, border: "line", align: "center", valign: "middle", content: `{bold}MVPFy v${VERSION}{/bold}\n\nFramework de skills para definir o primeiro MVP SaaS.\nA TUI lê o estado e o MVP.md sem alterar o Specsfy.`, tags: true, style: { fg: THEME.text, bg: THEME.surface, border: { fg: THEME.accent } } });
  }

  private async runSkillAction(action: "install" | "update"): Promise<void> {
    this.setStatus(`${action === "install" ? "Instalando" : "Atualizando"} skills…`);
    try { const output = await runSkills(action === "install" ? installArguments() : updateArguments(), this.project); this.setStatus(output || "Operação concluída."); }
    catch (error) { this.setStatus(`Erro: ${error instanceof Error ? error.message : String(error)}`); }
  }

  private setStatus(message: string): void { this.#status?.setContent(message); this.#screen?.render(); }
}

function areaLine(area: ProgressArea): string { return `${symbol(area.status)} ${area.label.padEnd(18, " ")} ${String(area.percent).padStart(3, " ")}%`; }
function symbol(status: ProgressArea["status"]): string { return status === "complete" ? "✓" : status === "in_progress" ? "◐" : "○"; }
function bar(percent: number, width: number): string { const filled = Math.round((percent * width) / 100); return `[${"█".repeat(filled)}${"░".repeat(Math.max(0, width - filled))}]`; }
