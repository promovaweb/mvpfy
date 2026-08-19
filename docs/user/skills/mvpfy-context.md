# O contexto existente: `mvpfy-context`

`mvpfy-context` procura material que já existe no projeto antes de a conversa
começar. Assim, um projeto vazio segue pelo relato livre da ideia, enquanto uma
aplicação com specs e código oferece um ponto de partida concreto.

## Quando ela entra

A análise acontece em dois momentos:

- durante `mvpfy install` ou `setup-project.mjs`;
- no início de cada conversa iniciada ou retomada com `$mvpfy`.

Para executar a leitura manualmente, use:

```bash
node skills/mvpfy-context/scripts/analyze-existing-project.mjs --project .
```

O arquivo `.mvpfy/existing-project.json` recebe o relatório atual. O
`state.json` guarda apenas o resumo necessário para a orquestradora localizar o
relatório sem aumentar o histórico da conversa.

## O que ela procura

O scanner percorre documentos com nomes e pastas usados com frequência em
projetos, como `spec.md`, `specs/`, `backlog/`, `briefs/`, `plans/`, `docs/`,
`product/` e `decisions/`. Também lê manifestos como `package.json`,
`composer.json`, `pyproject.toml`, `go.mod` e `Cargo.toml`.

Os arquivos de programação entram no relatório com caminho, linguagem e número
de linhas. Dependências e scripts dos manifestos ajudam a reconhecer a stack.
Pastas geradas, dependências instaladas, caches, cobertura, builds e o
repositório Git ficam fora da leitura.

## Como a conversa aproveita o resultado

Imagine um projeto que já tem `specs/checkout.md`, `composer.json` com Laravel e
uma pasta `app/`. A análise pode sugerir que existe uma base Laravel e apontar a
spec do checkout. A orquestradora usa esse material para evitar uma pergunta
repetida sobre a stack e começa a conversa perguntando pelo problema, pelo
público ou pelo recorte que ainda não aparece nos arquivos.

O relatório separa sugestão técnica de escolha confirmada. Uma rota chamada
`/customers` mostra que existe uma implementação relacionada a clientes, mas
não confirma quem paga, qual dor levou ao projeto nem quais recursos entram na
versão 1.0. Esses pontos continuam na conversa e aparecem como pendências até
que a pessoa os confirme.

## Proteção do projeto analisado

O MVPFy não altera as specs, o código, os arquivos do Specsfy nem os documentos
encontrados. A única escrita acontece em `.mvpfy/`, para guardar o relatório e
seu resumo. O conteúdo do relatório fica local ao projeto e não é enviado para
um serviço externo pelo script.
