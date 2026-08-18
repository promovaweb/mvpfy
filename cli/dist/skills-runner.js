/** Executa `npx skills`, o caminho oficial para instalar e atualizar skills. */
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { delimiter, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);
export const SKILLS_REPOSITORY = "promovaweb/mvpfy";
export async function runSkills(args, project = process.cwd()) {
    const command = await resolveSkillsCommand();
    if (!command)
        throw new Error("O CLI skills não foi encontrado. Instale Node.js e disponibilize npx no PATH.");
    const [executable, ...prefix] = command;
    const result = await execFileAsync(executable, [...prefix, ...args], { cwd: resolve(project), encoding: "utf8" });
    return `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
}
/**
 * Cria o documento e o estado que a entrevista usa depois que as skills são
 * instaladas. O script acompanha o pacote publicado e mantém esse preparo
 * idempotente para não substituir respostas nem um MVP já existente.
 */
export async function setupProject(project = process.cwd()) {
    const packageRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
    const script = join(packageRoot, "skills", "mvpfy", "scripts", "setup-project.mjs");
    try {
        await access(script, constants.R_OK);
    }
    catch {
        throw new Error("O script de preparo não está disponível no pacote MVPFy.");
    }
    const result = await execFileAsync(process.execPath, [script, "--project", resolve(project)], { encoding: "utf8" });
    return `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
}
export function installArguments() {
    return [
        "add",
        SKILLS_REPOSITORY,
        "--skill",
        "*",
        "--agent",
        "claude-code",
        "codex",
        "--copy",
        "--yes",
    ];
}
export function updateArguments() {
    return ["update", "--project", "--yes"];
}
export async function resolveSkillsCommand() {
    const path = process.env.PATH ?? "";
    const npmExec = await findExecutable("npx", path);
    if (npmExec)
        return [npmExec, "--yes", "skills"];
    return undefined;
}
async function findExecutable(name, path) {
    for (const directory of path.split(delimiter)) {
        if (!directory)
            continue;
        const candidate = join(directory, name);
        try {
            await access(candidate, constants.X_OK);
            return candidate;
        }
        catch {
            continue;
        }
    }
    return undefined;
}
//# sourceMappingURL=skills-runner.js.map