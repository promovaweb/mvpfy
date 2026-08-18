/** Executa `npx skills`, o caminho oficial para instalar e atualizar skills. */
export declare const SKILLS_REPOSITORY = "promovaweb/mvpfy";
export declare function runSkills(args: string[], project?: string): Promise<string>;
/**
 * Cria o documento e o estado que a entrevista usa depois que as skills são
 * instaladas. O script acompanha o pacote publicado e mantém esse preparo
 * idempotente para não substituir respostas nem um MVP já existente.
 */
export declare function setupProject(project?: string): Promise<string>;
export declare function installArguments(): string[];
export declare function updateArguments(): string[];
export declare function resolveSkillsCommand(): Promise<string[] | undefined>;
//# sourceMappingURL=skills-runner.d.ts.map