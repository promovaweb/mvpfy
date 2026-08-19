# Scripts e comandos

Os scripts determinísticos ficam dentro da skill que possui o comportamento.
Execute-os na raiz do projeto consumidor, salvo indicação diferente.

## Preparar o projeto

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

Cria `.mvpfy/` e `MVP.md` se ainda não existirem. O script é idempotente:
arquivos existentes não são substituídos. Ao terminar, chama
`mvpfy-context` e atualiza `.mvpfy/existing-project.json`.

## Analisar um projeto existente

```bash
node skills/mvpfy-context/scripts/analyze-existing-project.mjs --project .
```

O comando lê specs, briefs, backlogs, planos, documentos de produto, decisões,
manifestos e arquivos de programação. A saída JSON mostra fontes, linguagens,
stack reconhecida, sugestões de campos e lacunas. Os diretórios gerados, como
`node_modules`, `vendor`, `dist`, `build`, `coverage` e `.git`, ficam fora da
leitura.

O script grava somente `.mvpfy/existing-project.json` e o resumo
`existing_project_context` em `.mvpfy/state.json`. Ele não altera o projeto
analisado, o Specsfy ou o `MVP.md`.

## Registrar a ideia inicial

```bash
node skills/mvpfy/scripts/record-initial-idea.mjs \
  --project . \
  --idea "Quero um SaaS para acompanhar leads de pequenas agências." \
  --candidate-items "CRM, aplicativo, agente de IA"
```

Registra a descrição livre antes da primeira pergunta fechada. Os módulos,
recursos e integrações citados são guardados como candidatos para investigação,
não como requisitos aprovados.

Se a pessoa enviou mais de uma mensagem, execute o comando novamente para
acrescentar cada parte. Quando ela escolher a opção 4, conclua a entrada:

```bash
node skills/mvpfy/scripts/record-initial-idea.mjs --project . --continue
```

Esse comando só libera as perguntas depois que `initial_idea` estiver salvo.

A primeira pergunta fechada confirma `saas.tenancy-model`. Para persistir a
escolha e seus campos relacionados, use `--tenancy-data` com um objeto JSON:

```bash
node skills/mvpfy/scripts/record-answer.mjs \
  --project . \
  --stage saas \
  --question-id saas.tenancy-model \
  --raw-answer "Sim, várias empresas na mesma aplicação" \
  --normalized-answer "Multitenant compartilhado" \
  --extracted-fields "saas.tenancy-model,saas.isolation" \
  --tenancy-data '{"model":"multitenant_shared","status":"confirmed"}'
```

## Registrar resposta

```bash
node skills/mvpfy/scripts/record-answer.mjs \
  --project . \
  --stage problem \
  --question-id problem.context \
  --question-text "Onde o problema aparece?" \
  --raw-answer "Em clínicas pequenas" \
  --normalized-answer "Clínicas pequenas" \
  --extracted-fields problem.context,audience.segment
```

O comando acrescenta um evento em `answers.jsonl`, atualiza campos do estado e
não deve ser chamado depois de uma pergunta que ainda não foi salva.
`--stage` aceita `problem`, `audience`, `product`, `saas`, `market`,
`technology` ou `marketing`. O estado recusa mais de uma pergunta nessas etapas,
exceto SaaS, que aceita duas, e recusa qualquer resposta fechada depois do
oitavo registro.

## Renderizar e validar

```bash
node skills/mvpfy-document/scripts/render-company.mjs --project .
node skills/mvpfy-document/scripts/validate-company.mjs --project .
```

## Migrar

```bash
node skills/mvpfy-migrate/scripts/migrate-company.mjs --project .
```

## Testar o pacote

Na raiz de `mvpfy`:

```bash
npm test
npm run ebook
npm run ebook:verify
npm run cli:check
```

Para consultar o progresso sem abrir a TUI, use o script somente de leitura:

```bash
node skills/mvpfy/scripts/progress.mjs --project .
```

Os comandos do pacote não editam `specsfy/`. Validações do Hub executadas na
raiz são separadas das validações do submódulo.
