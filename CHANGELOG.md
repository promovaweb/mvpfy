# Changelog

Este arquivo registra as mudanças publicadas do framework MVPFy. A versão
canônica fica em [`VERSION`](VERSION), e o workflow de release cria uma
publicação no GitHub quando essa versão avança na `main`.

## [0.7.4] - 2026-11-14

### Corrigido

- Revisada a redação do guia do usuário em `docs/user/`, com explicações mais precisas e correções de linguagem.
- Atualizados os formatos portáteis da documentação a partir das fontes revisadas.

## [0.7.3] - 2026-11-13

- Corrige a capa do ebook com a assinatura nova do MVPFy, sem sobreposição,
  e aplica as cores do kit de marca ao título, subtítulo, linha e rótulo.
- Gera e valida o manifesto do ebook em Node.js no lugar de Python.
- Regenera o PDF e o EPUB na edição 0.7.3.

## [0.7.2] - 2026-11-13

- Nova identidade visual “Degraus até o MVP”: três degraus turquesa sobem até
  uma bandeira âmbar, as etapas do plano até o primeiro produto no ar.
- Cria o kit de marca em `brand/`: ícone, assinaturas para fundo claro e
  escuro, favicons, paleta com acento âmbar, tokens, CSS, tema Tailwind,
  tipografia, fontes, relatório de contraste, manifesto e guia visual.
- O cabeçalho do `README.md` passa a usar a assinatura do MVPFy, com variante
  para o modo escuro.
- Regenera o ebook em PDF e EPUB na edição 0.7.2, com o novo ícone na capa.

## [0.7.1] - 2026-11-13

- A publicação no npm passa a ser feita só pela máquina local; o workflow de
  release não publica mais no npm.
- Documenta o novo fluxo de publicação no `CONTRIBUTING.md`, no `AGENTS.md` e
  em `docs/develop/release.md`.
- Regenera o ebook em PDF e EPUB na edição 0.7.1.

## [0.7.0] - 2026-11-13

- Troca a licença do projeto de MIT para a GNU AGPL 3.0 (SPDX
  `AGPL-3.0-only`) no `LICENSE`, no `package.json`, no `README.md` e no
  `CONTRIBUTING.md`. A partir desta versão, o projeto é distribuído sob a GNU
  AGPL 3.0; versões anteriores continuam sob a licença com que foram
  publicadas.
- Regenera o ebook em PDF e EPUB na edição 0.7.0.

## [0.6.2] - 2026-11-13

- Regenera o ebook em PDF e EPUB na edição vigente do guia do usuário, que a
  0.6.1 deixou sem atualizar.
- Publica a versão atual do pacote `@promovaweb/mvpfy` no npm.

## [0.6.1] - 2026-11-13

- Reorganiza o `README.md` para quem usa o MVPFy, com cabeçalho da
  Promovaweb, banner do Discord, links para a documentação, os planos e os
  repositórios usados.
- Cria o `CONTRIBUTING.md` para quem contribui, com ambiente, organização do
  código, comandos de validação, commits e fluxo de release.

## [0.6.0] - 2026-08-23

- Adiciona a seção `Analise de Requisitos` ao `MVP.md`.
- Mantém a descrição inicial, as respostas originais, as interpretações e os
  campos cobertos em uma rastreabilidade integral da entrevista.
- Organiza módulos, recursos, telas, ferramentas, pessoas, dados, fluxos e
  requisitos operacionais citados pela pessoa ou encontrados no projeto.
- Regenera a seção durante renderização e migração sem substituir conteúdo
  manual fora do bloco gerado.
- Inclui uma estrutura detalhada de requisitos para consolidar domínios,
  entidades, jornadas, interfaces, integrações, operações, pendências e próxima
  etapa com base somente nas entradas recebidas.

## [0.5.1] - 2026-08-21

- Atualiza as referências da CLI e mantém a documentação alinhada à versão
  publicada do framework.

## [0.5.0] - 2026-08-19

- Adiciona `mvpfy-context`, que analisa specs, manifestos e arquivos de
  programação existentes antes da entrevista.
- Executa a análise automaticamente durante a configuração e no início de
  cada conversa com `$mvpfy`.
- Mantém a instalação para Claude Code e Codex ao preparar `MVP.md` e o
  relatório de contexto no projeto consumidor.
- Salva `.mvpfy/existing-project.json` com fontes, stack sugerida, pontos já
  explicados e perguntas que continuam abertas.

## [0.4.9] - 2026-08-18

- Corrige `mvpfy install --project <caminho>` para preparar `MVP.md` no
  diretório informado também quando a CLI é executada por `npx`, com skills
  para Claude Code e Codex gerenciadas pelo comando `npx skills add`.

## [0.4.8] - 2026-08-18

- Faz `mvpfy install --project .` instalar as skills para Claude Code e Codex
  e preparar `MVP.md` e `.mvpfy/` no mesmo comando.
- Corrige a leitura de `--project` pelos subcomandos da CLI.

## [0.4.7] - 2026-08-17

- Restringe o comando `install` aos agentes Claude Code e Codex.
- Remove o uso de `--all`, que poderia instalar as skills em outros agentes.

## [0.4.6] - 2026-08-17

- Sincroniza os artefatos do ebook com a documentação atual do guia do usuário.

## [0.4.5] - 2026-08-16

- Limita a entrevista fechada a oito perguntas no total.
- Distribui as perguntas por etapa, com uma pergunta essencial por área e duas
  no máximo para SaaS.
- Registra o uso por etapa no estado e encerra o fluxo normal em `finalization`.
- Mantém detalhes de multitenancy como recomendações técnicas para evitar uma
  trilha longa durante o planejamento do MVP.

## [0.4.4] - 2026-08-17

- Aproxima a tela inicial do padrão Home do Specsfy, com quatro cards e um
  painel consolidado de leitura.
- Usa `Home` e `Ctrl+H` como entrada principal da TUI, mantendo `Ctrl+P` como
  atalho compatível.
- Reduz a densidade visual da tela inicial sem remover o detalhamento da aba
  `Áreas`.

## [0.4.3] - 2026-08-17

- Alinha a TUI do MVPFy ao design system terminal da Promovaweb, baseado no
  shell visual do Specsfy.
- Adiciona cabeçalho, campo de projeto, botão primário, abas destacadas, cards
  de resumo e rodapé com a mesma geometria do padrão compartilhado.
- Expõe tokens de cor e atalhos da TUI para testes e manutenção.

## [0.4.2] - 2026-08-17

- Documenta a instalação da CLI com prefixo global explícito para evitar que o
  comando `mvpfy` fique fora do `PATH`.
- Inclui a atualização do índice de comandos do Zsh após a instalação.

## [0.4.1] - 2026-08-16

- Faz `mvpfy` abrir a TUI automaticamente sem exigir o subcomando `tui`.
- Aceita `mvpfy --project <caminho>` na entrada padrão.
- Corrige o launcher npm para executar a CLI somente uma vez.
- Documenta o uso por `npx` e a configuração do diretório global do npm no
  `PATH`.

## [0.4.0] - 2026-08-16

- Adiciona a skill `mvpfy-progress` para mostrar o andamento sem iniciar outra
  pergunta.
- Adiciona a CLI `mvpfy`, publicada no pacote npm `@promovaweb/mvpfy`.
- Adiciona uma TUI com progresso por áreas do MVP, gerenciamento de skills e
  leitura colorida do `MVP.md`.
- Faz a CLI delegar instalação e atualização ao `skills add` e `skills update`.
- Mantém framework, CLI, ebook e changelog na mesma versão SemVer.
- Atualiza o workflow para publicar a release no GitHub e o pacote no npm.

## [0.3.0] - 2026-08-16

- Torna obrigatória a pergunta sobre o modelo multitenante logo após a ideia
  inicial do SaaS.
- Adiciona uma trilha para tenant, titularidade, membros, papéis, vínculo entre
  tenants, isolamento, banco e provisionamento.
- Inclui Laravel Teams como referência para equipes, membros, convites e papéis.
- Mantém a versão do ebook igual à versão do framework.

## [0.2.3] - 2026-08-16

- Alinha a versão do ebook com a versão do framework.
- Faz o build falhar quando `VERSION` e `ebooks/VERSION` divergem.

## [0.2.2] - 2026-08-16

- Reescreve o guia do usuário com prosa direta, exemplos situados e orientação
  compatível com as diretrizes editoriais do Hub.
- Revisa as páginas das especialistas para explicar responsabilidade, exemplo e
  limite de cada skill sem transformar o ebook em um catálogo mecânico.
- Ajusta a documentação técnica para manter a separação entre implementação e
  percurso do leitor.
- Registra nos contextos e nas skills o aprendizado sobre separar públicos,
  consultar projetos de referência e revisar a prosa antes da validação técnica.
- Gera o ebook do usuário na edição v0.5.0.

## [0.2.1] - 2026-08-17

- Corrige o ebook para publicar somente o Guia do usuário, seguindo a
  estrutura adotada por Specsfy e ClickUpfy.
- Separa o percurso técnico e a especificação do ebook do usuário.

## [0.2.0] - 2026-08-16

- Reorganiza a documentação em percursos de usuário e desenvolvimento.
- Adiciona exemplos passo a passo, catálogo detalhado das 12 skills e mapa de
  arquivos executáveis.
- Documenta a leitura somente de specs, backlogs e documentos existentes no
  projeto consumidor.
- Formaliza uma pergunta por turno com três opções, `Avançar` e conversa livre.
- Atualiza a edição anterior do ebook para PDF e EPUB v0.3.0.
- Adiciona `VERSION` como fonte canônica do SemVer do framework.
- Valida a sincronização entre `VERSION`, `package.json` e `CHANGELOG.md`.
- Publica tags e releases do GitHub automaticamente após push na `main`.
- Documenta o fluxo de versionamento, notas de release e recusas do workflow.
- Define `MVP.md` como único documento gerado e aceita `Company.md` apenas como
  origem legada preservada durante a migração.
- Adiciona a entrada inicial guiada, o recebimento de várias mensagens e a
  análise completa do conteúdo antes de escolher cada pergunta.
- Inclui exemplos desse fluxo na documentação e no ebook PDF/EPUB.

## [0.1.0] - 2026-08-16

- Cria a primeira versão do MVPFy.
- Adiciona a orquestradora e as especialistas de problema, público, produto,
  SaaS, marca, mercado, preço, tecnologia e marketing.
- Adiciona o template versionado e os scripts de persistência, renderização,
  validação e migração do `MVP.md`.
- Publica documentação de usuário, referência técnica e ebook em PDF e EPUB.
