#!/usr/bin/env node

/** Inicia o executável compilado da CLI do MVPFy. */

import("../dist/cli.js")
  .then(({ runCli }) => runCli())
  .then((code) => {
    process.exitCode = Number(code ?? 0);
  })
  .catch((error) => {
    console.error(`erro: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
