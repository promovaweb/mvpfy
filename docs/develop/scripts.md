# Scripts e comandos

Os scripts determinísticos ficam dentro da skill que possui o comportamento.
Execute-os na raiz do projeto consumidor, salvo indicação diferente.

## Preparar o projeto

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

Cria `.mvpfy/` e `Company.md` se ainda não existirem. O script é idempotente:
arquivos existentes não são substituídos.

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
