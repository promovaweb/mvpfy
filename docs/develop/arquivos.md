# Estrutura de arquivos do MVPFy

Esta estrutura mostra onde cada responsabilidade vive. Os caminhos são relativos à
raiz do submódulo `mvpfy`.

## Raiz

| Arquivo | Finalidade |
| --- | --- |
| `README.md` | Visão rápida, instalação, skills e validação. |
| `AGENTS.md` | Instruções de contribuição e fontes do submódulo. |
| `LICENSE` | Licença do pacote. |
| `package.json` | Nome, versão e comandos npm. |
| `docs/` | Percursos de usuário, desenvolvimento e especificação. |
| `skills/` | Skills distribuídas ao projeto consumidor. |
| `tests/` | Testes de catálogo, scripts e documento. |
| `ebooks/` | PDF, EPUB e manifesto gerados. |
| `.ebook/` | Configuração do pipeline do ebook. |
| `brand/` | Ícone e recursos visuais locais do ebook. |
| `cli/` | Código TypeScript, build e launcher da CLI/TUI. |

## Skills

Cada diretório abaixo contém `SKILL.md`, `agents/openai.yaml` e os recursos que
seu domínio exige:

| Diretório | Arquivos relevantes |
| --- | --- |
| `skills/mvpfy/` | `SKILL.md`, `references/interview-policy.md`, `references/contracts.md`, `references/state-schema.md`, `scripts/setup-project.mjs`, `scripts/record-initial-idea.mjs` e `scripts/record-answer.mjs`. |
| `skills/mvpfy-context/` | `SKILL.md`, `agents/openai.yaml` e `scripts/analyze-existing-project.mjs`. |
| `skills/mvpfy-problem/` | `SKILL.md`, `references/problem-map.md`. |
| `skills/mvpfy-audience/` | `SKILL.md`, `references/audience-map.md`. |
| `skills/mvpfy-product/` | `SKILL.md`, `references/product-scope.md`. |
| `skills/mvpfy-saas/` | `SKILL.md`, `references/saas-lifecycle.md`. |
| `skills/mvpfy-brand/` | `SKILL.md`, `references/brand-direction.md`. |
| `skills/mvpfy-market/` | `SKILL.md`, `references/market-research.md`. |
| `skills/mvpfy-pricing/` | `SKILL.md`, `references/pricing-model.md`. |
| `skills/mvpfy-technology/` | `SKILL.md`, `references/technology-baseline.md`. |
| `skills/mvpfy-marketing/` | `SKILL.md`, `references/go-to-market.md`. |
| `skills/mvpfy-document/` | `SKILL.md`, `assets/MVP.template.md`, renderer e validator. |
| `skills/mvpfy-migrate/` | `SKILL.md`, política e script de migração. |
| `skills/mvpfy-progress/` | `SKILL.md` e contrato de leitura do progresso. |

### Arquivos comuns de cada skill

| Arquivo | Função |
| --- | --- |
| `SKILL.md` | Gatilho, instruções essenciais, limites e referências carregáveis. |
| `agents/openai.yaml` | Nome exibido, descrição curta e prompt padrão da interface. |
| `references/*.md` | Regras detalhadas do domínio, contrato ou política de operação. |
| `scripts/*.mjs` | Transformações determinísticas, sem dependência de uma conversa. |
| `assets/MVP.template.md` | Estrutura canônica copiada e atualizada no projeto consumidor. |

### Referências por domínio

| Skill | Referência |
| --- | --- |
| `mvpfy` | `interview-policy.md`, `contracts.md`, `state-schema.md`. |
| `mvpfy-context` | `analyze-existing-project.mjs`. |
| `mvpfy-problem` | `problem-map.md`. |
| `mvpfy-audience` | `audience-map.md`. |
| `mvpfy-product` | `product-scope.md`. |
| `mvpfy-saas` | `saas-lifecycle.md`. |
| `mvpfy-brand` | `brand-direction.md`. |
| `mvpfy-market` | `market-research.md`. |
| `mvpfy-pricing` | `pricing-model.md`. |
| `mvpfy-technology` | `technology-baseline.md`. |
| `mvpfy-marketing` | `go-to-market.md`. |
| `mvpfy-document` | `document-rules.md`. |
| `mvpfy-migrate` | `migration-policy.md`. |
| `mvpfy-progress` | `progress-contract.md`. |

### Scripts executáveis

| Script | Entrada | Saída |
| --- | --- | --- |
| `setup-project.mjs` | Diretório consumidor. | `MVP.md` e `.mvpfy/`. |
| `analyze-existing-project.mjs` | Projeto consumidor. | `.mvpfy/existing-project.json` e resumo no `state.json`. |
| `record-initial-idea.mjs` | Projeto preparado e descrição livre da ideia. | Evento de entrada, ideia inicial e itens candidatos persistidos. |
| `record-answer.mjs` | Projeto, pergunta, resposta e campos extraídos. | Evento em `answers.jsonl` e estado atualizado. |
| `render-company.mjs` | Projeto com estado e template. | `MVP.md` atualizado ou relatório `--check`. |
| `validate-company.mjs` | `MVP.md` e frontmatter. | Resultado estrutural e estado de prontidão. |
| `migrate-company.mjs` | `MVP.md` e template vigente. | Documento migrado sem duplicação. |
| `progress.mjs` | Projeto consumidor com `state.json` e `MVP.md`. | JSON somente de leitura com progresso por áreas. |

### CLI

| Caminho | Função |
| --- | --- |
| `cli/src/cli.ts` | Comandos públicos. |
| `cli/src/progress.ts` | Projeção de progresso usada pela CLI e TUI. |
| `cli/src/tui.ts` | Abas, atalhos, polling e leitura colorida do `MVP.md`. |
| `cli/src/skills-runner.ts` | Delegação para `skills add` e `skills update`. |
| `cli/bin/mvpfy.cjs` | Entrada do executável publicado no npm. |

## Documentação

| Caminho | Público |
| --- | --- |
| `docs/user/` | Pessoa que usa o MVPFy para planejar o SaaS. |
| `docs/user/skills/` | Uma página para cada skill disponível. |
| `docs/develop/` | Pessoas que alteram o pacote. |
| `docs/develop/context/` | Contexto transversal carregável por agentes. |
| `docs/specification.md` | Especificação funcional do MVPFy. |
| `docs/user/reading-order.txt` | Ordem exclusiva do Guia do usuário usado pelo ebook. |

## Pipeline do ebook

| Arquivo | Finalidade |
| --- | --- |
| `.ebook/build-ebook.sh` | Gera PDF, EPUB, aliases e manifesto. |
| `.ebook/pdf.css` | Estilo visual do PDF. |
| `.ebook/epub.css` | Estilo visual do EPUB. |
| `.ebook/template.html` | Template HTML usado pelo PDF. |
| `.ebook/metadata.yaml` | Metadados editoriais, idioma e descrição. |
| `.ebook/cover.svg` | Arte vetorial da capa. |
| `.ebook/fonts/` | Inter, Manrope e licenças das fontes. |
| `brand/logo/icon.svg` e `icon.png` | Ícone usado na capa e na documentação. |
| `ebooks/VERSION` | Espelho da versão do framework, conferido antes do build. |
| `ebooks/build.json` | Hashes das fontes e dos artefatos gerados. |
| `ebooks/ebook-mvpfy.pdf` e `.epub` | Aliases estáveis da edição vigente. |
| `ebooks/MVPFy-Guia-do-Usuario-v*.pdf` e `.epub` | Arquivos versionados de cada edição do usuário. |

O diretório `.ebook/build/` é temporário e está no `.gitignore`. Os arquivos
versionados e os aliases em `ebooks/` são entregas publicadas.

## Governança e testes

| Arquivo | Finalidade |
| --- | --- |
| `AGENTS.md` | Regras locais, idioma, fontes e validações. |
| `package.json` | Scripts de teste, CLI, ebook, pacote e release. |
| `tests/skills.test.mjs` | Catálogo, metadados e contrato de pergunta única. |
| `tests/scripts.test.mjs` | Setup, contexto existente, persistência, migração e validação do documento. |
| `tests/release.test.mjs` | Sincronização de SemVer e extração das notas. |
| `scripts/validate-release.mjs` | Valida `VERSION`, `package.json`, changelog e avanço entre commits. |
| `scripts/extract-release-notes.mjs` | Extrai a seção da versão para a release do GitHub. |
| `.github/workflows/release.yml` | Valida, cria a tag e publica a release após push na `main`. |
| `CHANGELOG.md` | Histórico das versões do pacote e da documentação. |
| `VERSION` | Fonte canônica do SemVer do framework. |
| `LICENSE` | Licença do projeto. |

## Arquivos que o consumidor recebe

Ao executar `setup-project.mjs`, o consumidor recebe `MVP.md`, `.mvpfy/` e o
relatório `.mvpfy/existing-project.json`.
Ele não recebe `spec.md`, não altera `specsfy/` e não transforma arquivos
existentes em artefatos do MVPFy.
