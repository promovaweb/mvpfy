/** Executa o CLI oficial `skills` para instalar e atualizar skills. */
export declare const SKILLS_REPOSITORY = "promovaweb/mvpfy";
export declare function runSkills(args: string[], project?: string): Promise<string>;
export declare function installArguments(): string[];
export declare function updateArguments(): string[];
export declare function resolveSkillsCommand(): Promise<string[] | undefined>;
//# sourceMappingURL=skills-runner.d.ts.map