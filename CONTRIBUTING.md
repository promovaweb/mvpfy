# Contribuindo com o MVPFy

Este guia atende quem altera o framework: skills, scripts, CLI, template,
documentação, ebook e testes. Para instalar e usar o produto em um projeto
consumidor, leia o [README](README.md) e o
[guia do usuário](docs/user/README.md).

A base técnica é o [Node.js](https://github.com/nodejs/node) 22 ou superior,
com a CLI em TypeScript e as skills em Markdown. As skills chegam ao projeto
consumidor pelo [Skills CLI](https://github.com/vercel-labs/skills).

## Antes de começar

- Converse no [Discord](https://promovaweb.com/discord) antes de uma mudança
  grande, para alinhar o escopo com quem mantém o projeto.
- Abra uma [issue](https://github.com/promovaweb/mvpfy/issues) por mudança,
  descrevendo o comportamento atual, o esperado e o passo para reproduzir.
- Leia o `AGENTS.md` do repositório. Ele define os contratos que a alteração
  precisa preservar.

## Ambiente

Requisitos: Node.js 22 ou superior, `git` e `npm`.

```bash
git clone https://github.com/promovaweb/mvpfy.git
cd mvpfy
npm install
npm run cli:build
```

Confira a CLI a partir do código-fonte:

```bash
node cli/dist/main.js --help
node cli/dist/main.js progress --project /caminho/do/projeto
```

Para testar uma mudança sem tocar em um projeto real, crie um diretório
temporário e use a opção `--project`:

```bash
mkdir -p /tmp/mvpfy-teste
node cli/dist/main.js doctor --project /tmp/mvpfy-teste
```

O MVPFy grava apenas dentro do projeto consumidor. Os scripts de teste usam
diretórios temporários e não precisam de serviço externo nem de credencial.

## Organização do código

| Caminho | Conteúdo |
| --- | --- |
| `cli/src/` | comandos Commander, leitura de progresso, TUI e execução do Skills CLI |
| `cli/bin/` | launcher do pacote npm |
| `cli/dist/` | build usado pelo launcher, gerado por `npm run cli:build` |
| `skills/mvpfy/` | orquestradora, política da entrevista, contratos e scripts de estado |
| `skills/mvpfy-*/` | especialistas por área, com `SKILL.md`, `agents/openai.yaml` e referências |
| `skills/mvpfy-document/assets/` | template do `MVP.md` |
| `docs/user/` | percurso de quem usa o produto |
| `docs/develop/` | arquitetura, contratos, scripts, CLI, testes e release |
| `docs/specification.md` | especificação funcional |
| `tests/` | testes de catálogo, scripts e release |
| `cli/tests/` | testes da CLI |
| `scripts/` | validação de release e extração das notas |
| `ebooks/` | PDF, EPUB e manifesto gerados |
| `brand/` | ícone usado na documentação e no ebook |

O detalhe de cada pasta está em [Arquitetura](docs/develop/arquitetura.md) e em
[Estrutura de arquivos](docs/develop/arquivos.md).

## Fluxo de trabalho

1. Descreva o comportamento observável que muda, na issue.
2. Localize a skill, o script ou o módulo da CLI responsável pela mudança.
3. Altere o código com um teste focal em `tests/` ou `cli/tests/`.
4. Atualize a documentação de usuário e a documentação técnica quando a
   interface pública mudar.
5. Recompile a CLI com `npm run cli:build`.
6. Regere o ebook quando `docs/user/` mudar e incremente `ebooks/VERSION`.
7. Rode os validadores da seção seguinte antes de abrir o pull request.

Ao alterar uma skill, confira o frontmatter, a descrição, os links para as
referências e o `agents/openai.yaml`. A regra de uma pergunta por turno precisa
aparecer na skill, na política, no contrato e no teste correspondente.

## Regras do código

- Escreva código, comentários, documentação e mensagens de interface em
  Português do Brasil.
- Preserve os termos técnicos em inglês usados pelo ecossistema.
- Mantenha o contrato da entrevista: uma pergunta principal por turno, três
  respostas prontas, `4. Avançar` e `5. Conversar mais sobre este tema`.
- Grave a resposta em `.mvpfy/` antes de apresentar a pergunta seguinte.
- Preserve a retomada e a migração sem perda de conteúdo.
- Trate specs, briefs e código do projeto consumidor como leitura somente. O
  MVPFy não cria, altera ou migra arquivos do
  [Specsfy](https://github.com/promovaweb/specsfy).
- Não grave dados de clientes neste repositório.
- Não edite `cli/dist/` à mão. Rode `npm run cli:build`.
- Não edite os arquivos de `ebooks/` à mão. Rode `npm run ebook`.

## Validar

Rode o conjunto completo antes de enviar a mudança:

```bash
npm test
npm run cli:check
npm run ebook:verify
git diff --check
```

| Comando | O que confere |
| --- | --- |
| `npm test` | catálogo das 15 skills, frontmatter, metadados de interface, IDs do template e scripts de setup, registro, renderização e migração |
| `npm run cli:typecheck` | tipos da CLI |
| `npm run cli:test` | testes da CLI |
| `npm run cli:build` | compila a CLI para `cli/dist/` |
| `npm run cli:check` | typecheck, testes da CLI, build e `npm pack --dry-run` |
| `npm run ebook:verify` | confere a edição do ebook sem gerar arquivos novos |
| `npm run ebook` | regenera o PDF, o EPUB e o manifesto |
| `npm run release:check` | versão, `package.json`, `cli/src/version.ts`, `ebooks/VERSION` e `CHANGELOG.md` |
| `npm run setup:example` | prepara um projeto consumidor de exemplo com `MVP.md` e `.mvpfy/` |

Quando `docs/` mudar, rode `npm run ebook` antes de `npm run ebook:verify`. A
verificação falha se a edição publicada divergir das páginas.

## Documentação

- Guia do usuário em `docs/user/`, lido por quem usa o MVPFy.
- Guia técnico em `docs/develop/`, com arquitetura, contratos, estado,
  template, scripts, CLI, testes e release.
- Especificação funcional em `docs/specification.md`.
- Manual publicado em <https://promovaweb.com/docs/mvpfy/>.

Depois de uma mudança de interface, atualize as páginas afetadas e regere o
ebook. A ordem das páginas do guia do usuário está em
`docs/user/reading-order.txt`.

## Commits e pull requests

Use uma mensagem curta no imperativo, com prefixo do escopo:

```text
feat: adiciona a análise de requisitos ao MVP.md
fix: corrige a leitura de --project no install
docs: reorganiza o guia do usuário
test: cobre a migração repetida
```

Um pull request precisa trazer:

- a descrição do comportamento alterado;
- o link para a issue correspondente;
- os comandos de validação executados e o resultado;
- a indicação das páginas de documentação e do ebook atualizados, quando
  houver;
- uma mudança por assunto, para facilitar a revisão.

## Releases

A versão canônica fica em `VERSION`. O campo `version` do `package.json`, a
constante de `cli/src/version.ts` e `ebooks/VERSION` repetem o mesmo valor. O
`CHANGELOG.md` recebe a seção `## [X.Y.Z] - AAAA-MM-DD` com a explicação da
mudança.

O workflow [`.github/workflows/release.yml`](.github/workflows/release.yml)
roda em cada push na `main`. Ele executa os testes, confere a versão, recusa
uma tag já existente, cria a tag `vX.Y.Z` e publica a GitHub Release com as
notas do changelog.

O workflow não publica no npm. Depois da release, o pacote
`@promovaweb/mvpfy` é gerado com `npm pack` no commit da tag e publicado da
máquina local com `npm publish <tgz> --access public`, na conta
`contatopromovaweb`. Confira com `npm view @promovaweb/mvpfy version license`.

O passo a passo completo, com a escolha entre patch, minor e major e as
recusas esperadas, está em
[Versionamento e releases](docs/develop/release.md).

## Licença

O MVPFy é distribuído sob a [GNU AGPL 3.0](LICENSE). Ao enviar uma
contribuição, você concorda em publicá-la sob a mesma licença do projeto
(SPDX `AGPL-3.0-only`).
