/** Executa o CLI oficial `skills` para instalar e atualizar skills. */

import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { createRequire } from "node:module";
import { delimiter, join, resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
export const SKILLS_REPOSITORY = "promovaweb/mvpfy";

export async function runSkills(args: string[], project = process.cwd()): Promise<string> {
  const command = await resolveSkillsCommand();
  if (!command) throw new Error("O CLI skills não foi encontrado. Instale Node.js e disponibilize npx no PATH.");
  const [executable, ...prefix] = command;
  const result = await execFileAsync(executable!, [...prefix, ...args], { cwd: resolve(project), encoding: "utf8" });
  return `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
}

export function installArguments(): string[] {
  return ["add", SKILLS_REPOSITORY, "--all", "--copy", "--yes"];
}

export function updateArguments(): string[] {
  return ["update", "--project", "--yes"];
}

export async function resolveSkillsCommand(): Promise<string[] | undefined> {
  const path = process.env.PATH ?? "";
  const direct = await findExecutable("skills", path);
  if (direct) return [direct];
  const npmExec = await findExecutable("npx", path);
  if (npmExec) return [npmExec, "--yes", "skills"];
  try {
    const require = createRequire(import.meta.url);
    const packaged = require.resolve("skills/bin/cli.mjs");
    await access(packaged, constants.R_OK);
    return [process.execPath, packaged];
  } catch {
    return undefined;
  }
}

async function findExecutable(name: string, path: string): Promise<string | undefined> {
  for (const directory of path.split(delimiter)) {
    if (!directory) continue;
    const candidate = join(directory, name);
    try {
      await access(candidate, constants.X_OK);
      return candidate;
    } catch {
      continue;
    }
  }
  return undefined;
}
