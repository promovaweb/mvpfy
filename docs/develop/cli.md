# CLI e TUI

O pacote npm `@promovaweb/mvpfy` publica o executável `mvpfy`. O framework e a
CLI compartilham a versão de `VERSION`; `cli/src/version.ts` é uma cópia usada
durante o build e precisa permanecer igual.

## Estrutura

| Arquivo | Responsabilidade |
| --- | --- |
| `cli/src/cli.ts` | Comandos Commander e saída textual ou JSON. |
| `cli/src/progress.ts` | Leitura somente de `state.json` e `MVP.md`. |
| `cli/src/tui.ts` | Dashboard terminal com abas e renderização colorida. |
| `cli/src/skills-runner.ts` | Execução do CLI oficial `skills`. |
| `cli/src/version.ts` | Versão pública usada pela interface. |
| `cli/bin/mvpfy.cjs` | Launcher incluído no pacote npm. |

## Comandos

```bash
mvpfy progress --project .
mvpfy progress --project . --json
mvpfy --project .
mvpfy install --project .
mvpfy update --project .
mvpfy skills install --project .
mvpfy skills update --project .
```

`install` e `skills install` executam `npx skills add promovaweb/mvpfy --skill '*'
--agent claude-code codex --copy --yes`. A instalação materializa as skills
somente para Claude Code e Codex. `update` e `skills update` executam `npx
skills update --project --yes`. O MVPFy não materializa skills diretamente.
`npx skills` é o único gerenciador usado pela CLI.

## Abas da TUI

- **Home**: percentual geral, áreas, modelo SaaS e próximo ponto.
- **Áreas**: detalhe das seções de cada área do MVP.
- **MVP.md**: documento completo renderizado com cores, somente para leitura.
- **Skills**: ações de instalação e atualização.
- **Sobre**: versão e finalidade do framework.

Sem subcomando, a CLI abre a TUI. O parâmetro global `--project` seleciona o
projeto consumidor antes da abertura. O launcher importa `cli.js`, que contém
somente a API de comandos; isso evita executar a CLI duas vezes.

O polling atualiza o painel a cada dois segundos. As mudanças são observadas
sem escrever no projeto consumidor.

## Build e testes

```bash
npm run cli:typecheck
npm run cli:test
npm run cli:build
npm run cli:check
```

O `npm pack --dry-run` dentro de `cli:check` confirma que o launcher, o build,
o changelog, o ebook não fazem parte do pacote por acidente e o `VERSION`
estão no pacote publicado. A release usa o pacote raiz, portanto o changelog
unificado do MVPFy fica incluído no npm.
