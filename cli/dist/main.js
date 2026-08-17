/** Entrada do executável do MVPFy. */
import { runCli } from "./cli.js";
export { runCli } from "./cli.js";
void runCli().then((code) => {
    process.exitCode = code;
});
//# sourceMappingURL=main.js.map