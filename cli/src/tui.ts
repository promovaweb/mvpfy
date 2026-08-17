/** TUI do MVPFy alinhada ao design system terminal da Promovaweb. */

import blessed from "neo-blessed";
import { marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { readFile } from "node:fs/promises";
import type { Widgets } from "blessed";
import {
  scanProgress,
  tenancyLabel,
  type ProgressArea,
  type ProgressSnapshot,
} from "./progress.js";
import { installArguments, runSkills, updateArguments } from "./skills-runner.js";
import { VERSION } from "./version.js";

marked.use(
  markedTerminal({
    reflowText: true,
    width: Math.max(40, Math.min(process.stdout.columns ?? 80, 120)),
    showSectionPrefix: false,
  }),
);

/** Paleta compartilhada pelas TUIs Promovaweb em terminal escuro. */
export const TUI_THEME = {
  background: "#000A0E",
  surface: "#001117",
  surfaceRaised: "#03212A",
  text: "#F2F8F9",
  textMuted: "#B2C6CE",
  border: "#5F7D8C",
  accent: "#C4B5FD",
  activeBackground: "#5EEDE1",
  activeText: "#001117",
  selectedBackground: "#6D28D9",
  selectedText: "#F2F8F9",
  primaryBackground: "#15626A",
  primaryText: "#F2F8F9",
  focusBackground: "#5EEDE1",
  focusText: "#001117",
  warning: "#FCD34D",
} as const;

export const TUI_BINDINGS = {
  "C-q": "Sair",
  escape: "Voltar",
  "C-u": "Atualizar",
  "C-p": "Progresso",
  "C-a": "Áreas",
  "C-m": "MVP.md",
  "C-k": "Skills",
  "C-o": "Sobre",
  i: "Instalar",
  r: "Atualizar skills",
} as const;

export type Tab = "progress" | "areas" | "document" | "skills" | "about";

export const TUI_TABS: ReadonlyArray<{
  id: Tab;
  label: string;
  key: string;
}> = [
  { id: "progress", label: "Progresso", key: "C-p" },
  { id: "areas", label: "Áreas", key: "C-a" },
  { id: "document", label: "MVP.md", key: "C-m" },
  { id: "skills", label: "Skills", key: "C-k" },
  { id: "about", label: "Sobre", key: "C-o" },
];

export async function openTui(project = process.cwd()): Promise<void> {
  const screen = blessed.screen({
    smartCSR: true,
    fullUnicode: true,
    mouse: true,
    title: "MVPFy",
    dockBorders: true,
  });
  const dashboard = new MvpfyTui(project);
  await dashboard.start(screen);
  await new Promise<void>((resolve) => screen.once("destroy", resolve));
}

export class MvpfyTui {
  project: string;
  #screen?: Widgets.Screen;
  #body?: Widgets.BoxElement;
  #status?: Widgets.BoxElement;
  #projectInput?: Widgets.TextboxElement;
  #snapshot?: ProgressSnapshot;
  #tab: Tab = "progress";
  #tabButtons = new Map<Tab, Widgets.ButtonElement>();
  #poller: NodeJS.Timeout | undefined;
  #lastBackAt = 0;

  constructor(project = process.cwd()) {
    this.project = project;
  }

  async start(screen: Widgets.Screen): Promise<void> {
    this.#screen = screen;
    this.mountShell(screen);
    this.bindKeys(screen);
    screen.once("destroy", () => {
      if (this.#poller) clearInterval(this.#poller);
      this.#poller = undefined;
    });
    this.setStatus("Carregando projeto…");
    await this.refresh();
    this.#poller = setInterval(() => void this.refresh(), 2_000);
  }

  private mountShell(screen: Widgets.Screen): void {
    blessed.box({
      parent: screen,
      top: 0,
      left: 0,
      width: "100%",
      height: 1,
      align: "center",
      content: "MVPFy — Dashboard de MVP e skills",
      style: {
        fg: TUI_THEME.text,
        bg: TUI_THEME.selectedBackground,
        bold: true,
      },
    });

    this.#projectInput = blessed.textbox({
      parent: screen,
      top: 1,
      left: 1,
      right: 21,
      height: 3,
      border: "line",
      value: this.project,
      inputOnFocus: false,
      keys: true,
      mouse: true,
      style: {
        fg: TUI_THEME.text,
        bg: TUI_THEME.surface,
        border: { fg: TUI_THEME.border },
        focus: { border: { fg: TUI_THEME.focusBackground } },
      },
    });
    this.#projectInput.on("submit", (value) => {
      this.project = String(value || this.project);
      this.#projectInput?.setValue(this.project);
      void this.refresh();
    });
    this.#projectInput.key(["enter"], () => this.#projectInput?.readInput());
    this.#projectInput.on("click", () => this.#projectInput?.readInput());

    const refresh = blessed.button({
      parent: screen,
      top: 1,
      right: 1,
      width: 19,
      height: 3,
      border: "line",
      content: "Atualizar  ^U",
      align: "center",
      valign: "middle",
      mouse: true,
      keys: true,
      style: buttonStyle(true),
    });
    refresh.on("press", () => void this.refresh());

    this.#tabButtons.clear();
    let left = 1;
    for (const tab of TUI_TABS) {
      const width = tab.label.length + 2;
      const button = blessed.button({
        parent: screen,
        top: 4,
        left,
        width,
        height: 1,
        content: tab.label,
        align: "center",
        mouse: true,
        keys: true,
        style: {
          fg: TUI_THEME.textMuted,
          bg: TUI_THEME.background,
          focus: {
            fg: TUI_THEME.focusText,
            bg: TUI_THEME.focusBackground,
            bold: true,
          },
          hover: { fg: TUI_THEME.focusText, bg: TUI_THEME.focusBackground },
        },
      });
      button.on("press", () => this.showTab(tab.id));
      this.#tabButtons.set(tab.id, button);
      left += width;
    }

    blessed.line({
      parent: screen,
      top: 5,
      left: 0,
      width: "100%",
      orientation: "horizontal",
      style: { fg: TUI_THEME.border },
    });
    this.#body = blessed.box({
      parent: screen,
      top: 6,
      left: 1,
      right: 1,
      bottom: 4,
      style: { fg: TUI_THEME.text, bg: TUI_THEME.background },
    });
    this.#status = blessed.box({
      parent: screen,
      bottom: 2,
      left: 0,
      width: "100%",
      height: 1,
      padding: { left: 1 },
      style: { fg: TUI_THEME.textMuted, bg: TUI_THEME.surface },
    });
    blessed.box({
      parent: screen,
      bottom: 1,
      left: 0,
      width: "100%",
      height: 1,
      content:
        " ^ = Ctrl  ·  Tab/Shift+Tab: foco  ·  Setas: navegar  ·  " +
        "Espaço: abrir/alternar  ·  Esc: voltar  ·  Mouse: disponível",
      style: { fg: TUI_THEME.accent, bg: TUI_THEME.background },
    });
    blessed.box({
      parent: screen,
      bottom: 0,
      left: 0,
      width: "100%",
      height: 1,
      content: " ^Q Sair    Esc Voltar    MVP.md: somente leitura",
      style: { fg: TUI_THEME.text, bg: TUI_THEME.surface, bold: true },
    });
  }

  private bindKeys(screen: Widgets.Screen): void {
    screen.key(["C-q"], () => screen.destroy());
    screen.key(["escape"], () => this.goBack());
    screen.key(["C-u"], () => void this.refresh());
    screen.key(["C-p"], () => this.showTab("progress"));
    screen.key(["C-a"], () => this.showTab("areas"));
    screen.key(["C-m"], () => this.showTab("document"));
    screen.key(["C-k"], () => this.showTab("skills"));
    screen.key(["C-o"], () => this.showTab("about"));
    screen.key(["i", "I"], () => void this.runSkillAction("install"));
    screen.key(["r", "R"], () => void this.runSkillAction("update"));
    screen.on("keypress", (_character, key) => {
      if (key.name !== "tab") return;
      if (!screen.focused || !screen.keyable.includes(screen.focused)) {
        this.#projectInput?.focus();
      } else if (key.shift) {
        screen.focusPrevious();
      } else {
        screen.focusNext();
      }
      screen.render();
    });
  }

  private async refresh(): Promise<void> {
    try {
      this.#snapshot = await scanProgress(this.project);
      this.showTab(this.#tab, false);
      const snapshot = this.#snapshot;
      this.setStatus(
        `${snapshot.project}  ·  ${snapshot.overall}% do MVP  ·  atualização automática ativa`,
      );
    } catch (error) {
      this.setStatus(`Erro: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private showTab(tab: Tab, render = true): void {
    this.#tab = tab;
    if (!this.#body || !this.#screen) return;
    for (const [id, button] of this.#tabButtons) {
      button.style.bg = id === tab ? TUI_THEME.activeBackground : TUI_THEME.background;
      button.style.fg = id === tab ? TUI_THEME.activeText : TUI_THEME.textMuted;
      button.style.bold = id === tab;
    }
    for (const child of [...this.#body.children]) child.destroy();
    if (tab === "progress") this.renderProgress(this.#body);
    else if (tab === "areas") this.renderAreas(this.#body);
    else if (tab === "document") void this.renderDocument(this.#body);
    else if (tab === "skills") this.renderSkills(this.#body);
    else this.renderAbout(this.#body);
    if (render) this.#screen.render();
  }

  private goBack(): void {
    const now = Date.now();
    if (now - this.#lastBackAt < 50) return;
    this.#lastBackAt = now;
    if (this.#tab !== "progress") this.showTab("progress");
  }

  private renderProgress(body: Widgets.BoxElement): void {
    const snapshot = this.#snapshot;
    if (!snapshot) return;
    const completeAreas = snapshot.areas.filter((area) => area.status === "complete").length;
    const cards: Array<[string, string, string, string]> = [
      ["Plano", `${snapshot.overall}%`, "#021C26", TUI_THEME.activeBackground],
      ["Áreas completas", `${completeAreas}/${snapshot.areas.length}`, "#2E1065", TUI_THEME.accent],
      ["Respostas salvas", String(snapshot.interview.answers), "#03212A", "#37E1D0"],
      ["", `${snapshot.overall}%\n${bar(snapshot.overall, 16)}`, "#001117", TUI_THEME.warning],
    ];
    cards.forEach(([label, value, background, border], index) => {
      blessed.box({
        parent: body,
        top: 0,
        left: `${index * 25}%`,
        width: "25%",
        height: 7,
        border: "line",
        align: "center",
        valign: "middle",
        content: `{bold}${value}{/bold}${label ? `\n${label}` : ""}`,
        tags: true,
        style: { fg: TUI_THEME.text, bg: background, border: { fg: border } },
      });
    });
    blessed.box({
      parent: body,
      top: 9,
      left: 0,
      width: "49%",
      bottom: 0,
      border: "line",
      label: " Áreas do MVP ",
      padding: { left: 1, right: 1 },
      content: snapshot.areas.map(areaLine).join("\n"),
      style: { fg: TUI_THEME.text, bg: TUI_THEME.surface, border: { fg: TUI_THEME.border } },
    });
    blessed.box({
      parent: body,
      top: 9,
      left: "51%",
      right: 0,
      bottom: 0,
      border: "line",
      label: " Próximo ponto ",
      padding: { left: 1, right: 1 },
      content:
        `${snapshot.next_gap?.label ?? "Nenhuma pendência identificada."}\n\n` +
        `Modelo SaaS: ${tenancyLabel(snapshot.tenancy)}\n` +
        `Documento: ${snapshot.document ? "MVP.md encontrado" : "MVP.md pendente"}`,
      style: { fg: TUI_THEME.text, bg: TUI_THEME.surface, border: { fg: TUI_THEME.warning } },
    });
  }

  private renderAreas(body: Widgets.BoxElement): void {
    const snapshot = this.#snapshot;
    if (!snapshot) return;
    const list = blessed.list({
      parent: body,
      top: 0,
      left: 0,
      width: "34%",
      bottom: 0,
      border: "line",
      label: ` Áreas · ${snapshot.areas.length} `,
      keys: true,
      vi: true,
      mouse: true,
      items: snapshot.areas.map((area) => `${symbol(area.status)} ${area.label}  ${area.percent}%`),
      style: {
        ...panelStyle(),
        selected: { fg: TUI_THEME.selectedText, bg: TUI_THEME.selectedBackground, bold: true },
        item: { fg: TUI_THEME.text, bg: TUI_THEME.background },
      },
    });
    const detail = blessed.box({
      parent: body,
      top: 0,
      left: "35%",
      right: 0,
      bottom: 0,
      border: "line",
      label: " Detalhe ",
      padding: { left: 1, right: 1 },
      style: panelStyle(),
    });
    const update = (): void => {
      const selected = (list as Widgets.ListElement & { selected?: number }).selected ?? 0;
      const area = snapshot.areas[selected];
      detail.setContent(
        area
          ? `${area.label}\n\n${bar(area.percent, 30)}\n\n${area.sections
              .map((section) => `${section.complete ? "✓" : "○"} ${section.id}`)
              .join("\n")}`
          : "Selecione uma área.",
      );
      this.#screen?.render();
    };
    list.on("select item", update);
    list.on("keypress", update);
    list.focus();
    update();
  }

  private async renderDocument(body: Widgets.BoxElement): Promise<void> {
    try {
      const content = await readFile(`${this.project}/MVP.md`, "utf8");
      blessed.box({
        parent: body,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "line",
        label: " MVP.md renderizado ",
        scrollable: true,
        alwaysScroll: true,
        keys: true,
        vi: true,
        mouse: true,
        tags: false,
        content: String(marked.parse(content, { async: false })),
        style: { fg: TUI_THEME.text, bg: TUI_THEME.background, border: { fg: TUI_THEME.accent } },
        scrollbar: { style: { bg: TUI_THEME.accent } },
      });
      this.#screen?.render();
    } catch {
      blessed.box({
        parent: body,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "line",
        label: " MVP.md renderizado ",
        content: "MVP.md ainda não existe. Use mvpfy install ou prepare o projeto com a skill mvpfy.",
        padding: { left: 2, top: 1 },
        style: { fg: TUI_THEME.warning, bg: TUI_THEME.surface, border: { fg: TUI_THEME.border } },
      });
      this.#screen?.render();
    }
  }

  private renderSkills(body: Widgets.BoxElement): void {
    blessed.box({
      parent: body,
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      border: "line",
      label: " Gerenciamento ",
      padding: { left: 1, right: 1 },
      content:
        "I  instalar ou reconciliar as skills do MVPFy\n" +
        "R  atualizar skills instaladas\n\n" +
        "As duas ações executam o CLI oficial `skills` por baixo dos panos.",
      style: panelStyle(),
    });
    blessed.box({
      parent: body,
      top: 10,
      left: 0,
      right: 0,
      bottom: 0,
      border: "line",
      label: " Skills do MVPFy ",
      padding: { left: 1, right: 1 },
      content:
        "mvpfy\nmvpfy-progress\nmvpfy-problem\nmvpfy-audience\n" +
        "mvpfy-product\nmvpfy-saas\nmvpfy-market\nmvpfy-pricing\n" +
        "mvpfy-technology\nmvpfy-marketing\nmvpfy-brand\n" +
        "mvpfy-document\nmvpfy-migrate",
      style: panelStyle(),
    });
  }

  private renderAbout(body: Widgets.BoxElement): void {
    blessed.box({
      parent: body,
      top: 1,
      left: 2,
      right: 2,
      height: 10,
      border: "line",
      align: "center",
      valign: "middle",
      content:
        `{bold}MVPFy v${VERSION}{/bold}\n\n` +
        "Framework de skills para definir o primeiro MVP SaaS.\n" +
        "A TUI segue o design system terminal da Promovaweb.\n" +
        "A leitura do Specsfy é somente referência; nenhum arquivo dele é alterado.",
      tags: true,
      style: { fg: TUI_THEME.text, bg: TUI_THEME.surface, border: { fg: TUI_THEME.accent } },
    });
  }

  private async runSkillAction(action: "install" | "update"): Promise<void> {
    this.setStatus(`${action === "install" ? "Instalando" : "Atualizando"} skills…`);
    try {
      const output = await runSkills(
        action === "install" ? installArguments() : updateArguments(),
        this.project,
      );
      this.setStatus(output || "Operação concluída.");
    } catch (error) {
      this.setStatus(`Erro: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private setStatus(message: string): void {
    this.#status?.setContent(message);
    this.#screen?.render();
  }
}

function buttonStyle(primary: boolean): Record<string, unknown> {
  return {
    fg: primary ? TUI_THEME.primaryText : TUI_THEME.text,
    bg: primary ? TUI_THEME.primaryBackground : TUI_THEME.surface,
    border: { fg: primary ? TUI_THEME.focusBackground : TUI_THEME.border },
    focus: { fg: TUI_THEME.focusText, bg: TUI_THEME.focusBackground, bold: true },
    hover: { fg: TUI_THEME.focusText, bg: TUI_THEME.focusBackground, bold: true },
  };
}

function panelStyle(): Record<string, unknown> {
  return { fg: TUI_THEME.text, bg: TUI_THEME.surface, border: { fg: TUI_THEME.border } };
}

function areaLine(area: ProgressArea): string {
  return `${symbol(area.status)} ${area.label.padEnd(18, " ")} ${String(area.percent).padStart(3, " ")}%`;
}

function symbol(status: ProgressArea["status"]): string {
  return status === "complete" ? "✓" : status === "in_progress" ? "◐" : "○";
}

function bar(percent: number, width: number): string {
  const filled = Math.round((percent * width) / 100);
  return `[${"█".repeat(filled)}${"░".repeat(Math.max(0, width - filled))}]`;
}
