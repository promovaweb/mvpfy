/** Interface de comandos do MVPFy. */
import { Command, CommanderError, Option } from "commander";
import { scanProgress, formatProgress } from "./progress.js";
import { installArguments, runSkills, updateArguments } from "./skills-runner.js";
import { VERSION } from "./version.js";
import { openTui } from "./tui.js";
export function buildProgram() {
    const program = new Command()
        .name("mvpfy")
        .description("Planeja o primeiro MVP SaaS e acompanha o progresso no terminal.")
        .version(VERSION, "--version")
        .showHelpAfterError()
        .option("--project <caminho>", "raiz do projeto consumidor", process.cwd())
        .action(async (options) => openTui(options.project));
    program.command("progress").description("exibe o progresso das áreas do MVP")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const snapshot = await scanProgress(projectFromParent(command, options.project));
        console.log(options.json ? JSON.stringify(snapshot, null, 2) : formatProgress(snapshot));
    });
    program.command("tui").description("abre a interface terminal do MVPFy")
        .addOption(projectOption()).action(async (options, command) => openTui(projectFromParent(command, options.project)));
    program.command("install").alias("setup").description("instala as skills do MVPFy no projeto")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const output = await runSkills(installArguments(), projectFromParent(command, options.project));
        printAction("install", output, Boolean(options.json));
    });
    program.command("update").description("atualiza as skills do MVPFy no projeto")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const output = await runSkills(updateArguments(), projectFromParent(command, options.project));
        printAction("update", output, Boolean(options.json));
    });
    const skills = program.command("skills").description("gerencia as skills por meio do CLI oficial");
    skills.command("add").description("executa skills add promovaweb/mvpfy")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const output = await runSkills(installArguments(), projectFromParent(command, options.project));
        printAction("add", output, Boolean(options.json));
    });
    skills.command("update").description("executa skills update --project")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const output = await runSkills(updateArguments(), projectFromParent(command, options.project));
        printAction("update", output, Boolean(options.json));
    });
    skills.command("list").description("lista as skills instaladas")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const output = await runSkills(["list", ...(options.json ? ["--json"] : [])], projectFromParent(command, options.project));
        console.log(output);
    });
    program.command("doctor").description("verifica o projeto e o CLI skills")
        .addOption(projectOption()).option("--json", "emite JSON").action(async (options, command) => {
        const snapshot = await scanProgress(projectFromParent(command, options.project));
        const result = { project: snapshot.project, document: snapshot.document, skills_cli: true };
        console.log(options.json ? JSON.stringify(result, null, 2) : `Projeto\t${result.project}\nMVP.md\t${result.document ? "OK" : "pendente"}\nskills CLI\tOK`);
    });
    return program;
}
export async function runCli(argv = process.argv) {
    const program = buildProgram();
    program.exitOverride();
    try {
        await program.parseAsync(argv);
        return Number(process.exitCode ?? 0);
    }
    catch (error) {
        if (error instanceof CommanderError)
            return error.code === "commander.helpDisplayed" || error.code === "commander.version" ? 0 : error.exitCode;
        console.error(`erro: ${error instanceof Error ? error.message : String(error)}`);
        return 1;
    }
}
function projectOption() {
    return new Option("--project <caminho>", "raiz do projeto consumidor").default(process.cwd());
}
/**
 * Resolve a raiz escolhida na opção global sem deixar o valor-padrão de um
 * subcomando sobrepor a opção informada depois do nome desse subcomando.
 */
function projectFromParent(command, fallback) {
    let ancestor = command.parent;
    while (ancestor) {
        const project = ancestor.opts().project;
        if (typeof project === "string")
            return project;
        ancestor = ancestor.parent;
    }
    return fallback;
}
function printAction(action, output, json) {
    if (json)
        console.log(JSON.stringify({ action, output }));
    else
        console.log(output || `${action} concluído.`);
}
//# sourceMappingURL=cli.js.map