# Scripts e comandos

Os scripts determinísticos ficam dentro da skill que possui o comportamento.
Execute-os na raiz do projeto consumidor, salvo indicação diferente.

## Preparar o projeto

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

Cria `.mvpfy/` e `MVP.md` se ainda não existirem. O script é idempotente:
arquivos existentes não são substituídos.

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

## Registrar resposta

```bash
node skills/mvpfy/scripts/record-answer.mjs \
  --project . \
  --question-id problem.context \
  --question-text "Onde o problema aparece?" \
  --raw-answer "Em clínicas pequenas" \
  --normalized-answer "Clínicas pequenas" \
  --extracted-fields problem.context,audience.segment
```

O comando acrescenta um evento em `answers.jsonl`, atualiza campos do estado e
não deve ser chamado depois de uma pergunta que ainda não foi salva.

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
```

Os comandos do pacote não editam `specsfy/`. Validações do Hub executadas na
raiz são separadas das validações do submódulo.
