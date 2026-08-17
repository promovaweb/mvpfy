/** TUI do MVPFy com progresso por áreas e leitura colorida do MVP.md. */
import type { Widgets } from "blessed";
type Tab = "progress" | "areas" | "document" | "skills" | "about";
export declare const TUI_TABS: ReadonlyArray<{
    id: Tab;
    label: string;
    key: string;
}>;
export declare function openTui(project?: string): Promise<void>;
export declare class MvpfyTui {
    #private;
    readonly project: string;
    constructor(project?: string);
    start(screen: Widgets.Screen): Promise<void>;
    private mountShell;
    private bindKeys;
    private refresh;
    private showTab;
    private renderProgress;
    private renderAreas;
    private renderDocument;
    private renderSkills;
    private renderAbout;
    private runSkillAction;
    private setStatus;
}
export {};
//# sourceMappingURL=tui.d.ts.map