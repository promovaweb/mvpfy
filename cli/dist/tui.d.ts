/** TUI do MVPFy alinhada ao design system terminal da Promovaweb. */
import type { Widgets } from "blessed";
/** Paleta compartilhada pelas TUIs Promovaweb em terminal escuro. */
export declare const TUI_THEME: {
    readonly background: "#000A0E";
    readonly surface: "#001117";
    readonly surfaceRaised: "#03212A";
    readonly text: "#F2F8F9";
    readonly textMuted: "#B2C6CE";
    readonly border: "#5F7D8C";
    readonly accent: "#C4B5FD";
    readonly activeBackground: "#5EEDE1";
    readonly activeText: "#001117";
    readonly selectedBackground: "#6D28D9";
    readonly selectedText: "#F2F8F9";
    readonly primaryBackground: "#15626A";
    readonly primaryText: "#F2F8F9";
    readonly focusBackground: "#5EEDE1";
    readonly focusText: "#001117";
    readonly warning: "#FCD34D";
};
export declare const TUI_BINDINGS: {
    readonly "C-q": "Sair";
    readonly escape: "Voltar";
    readonly "C-u": "Atualizar";
    readonly "C-p": "Progresso";
    readonly "C-a": "Áreas";
    readonly "C-m": "MVP.md";
    readonly "C-k": "Skills";
    readonly "C-o": "Sobre";
    readonly i: "Instalar";
    readonly r: "Atualizar skills";
};
export type Tab = "progress" | "areas" | "document" | "skills" | "about";
export declare const TUI_TABS: ReadonlyArray<{
    id: Tab;
    label: string;
    key: string;
}>;
export declare function openTui(project?: string): Promise<void>;
export declare class MvpfyTui {
    #private;
    project: string;
    constructor(project?: string);
    start(screen: Widgets.Screen): Promise<void>;
    private mountShell;
    private bindKeys;
    private refresh;
    private showTab;
    private goBack;
    private renderProgress;
    private renderAreas;
    private renderDocument;
    private renderSkills;
    private renderAbout;
    private runSkillAction;
    private setStatus;
}
//# sourceMappingURL=tui.d.ts.map