# Changelog

Este arquivo registra as mudanças publicadas do framework MVPFy. A versão
canônica fica em [`VERSION`](VERSION), e o workflow de release cria uma
publicação no GitHub quando essa versão avança na `main`.

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
