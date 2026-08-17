/** Declarações mínimas para os módulos sem tipos próprios usados pela TUI. */

declare module "neo-blessed" {
  export * from "blessed";
  import blessed from "blessed";
  export default blessed;
}

declare module "marked-terminal" {
  export function markedTerminal(options?: Record<string, unknown>): import("marked").MarkedExtension;
}
