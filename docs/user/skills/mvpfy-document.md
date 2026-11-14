# O documento final: `mvpfy-document`

Esta skill monta e confere o arquivo final, sem criar o conteúdo dos domínios.
Ela recebe da orquestradora os fatos e as escolhas, as recomendações, as
hipóteses e as pendências. Depois encaixa cada item no template do `MVP.md`.

## Arquivos que ela usa

- `assets/MVP.template.md`.
- `scripts/render-company.mjs`.
- `scripts/validate-company.mjs`.
- `references/document-rules.md`.

## Como ela é executada

```bash
node skills/mvpfy-document/scripts/render-company.mjs --project .
node skills/mvpfy-document/scripts/validate-company.mjs --project .
```

O renderer localiza os identificadores estáveis, mantém o conteúdo existente e
usa “Pendente” quando ainda não há informação. O validator confere se as áreas
necessárias para um primeiro SaaS aparecem no arquivo.

Durante a renderização, a skill também monta `Analise de Requisitos`. Ela lê a
ideia inicial e cada resposta original, com a interpretação gravada, os campos
cobertos e o relatório do projeto existente. O resultado lista os elementos
citados por tipo e mantém uma tabela de rastreabilidade para que uma descrição
ampla do sistema não seja reduzida às oito perguntas fechadas.

Quando o `MVP.md` alimentar um ebook, a ordem deve incluir somente o guia do
usuário. A especificação e a referência de desenvolvimento ficam fora do PDF e
do EPUB. Depois do build, leia o resultado completo para conferir voz, exemplos,
ritmo e separação de públicos. Os validadores confirmam estrutura e integridade
do arquivo, mas não substituem a leitura editorial.

O PDF, o EPUB e o manifesto usam a mesma versão do framework. `VERSION` é a
fonte canônica e `ebooks/VERSION` funciona apenas como espelho de conferência.

## Onde termina este trabalho

Esta skill não cria `spec.md`, não edita backlog e não apaga uma resposta para
colocar um texto genérico no lugar.
