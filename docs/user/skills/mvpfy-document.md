# Skill `mvpfy-document`

Esta skill renderiza e valida o arquivo final. Ela não decide o conteúdo dos
domínios; recebe fatos, escolhas, recomendações, hipóteses e pendências da
orquestradora e os organiza conforme o template.

## Arquivos usados

- `assets/MVP.template.md`;
- `scripts/render-company.mjs`;
- `scripts/validate-company.mjs`;
- `references/document-rules.md`.

## Operação

```bash
node skills/mvpfy-document/scripts/render-company.mjs --project .
node skills/mvpfy-document/scripts/validate-company.mjs --project .
```

O renderer localiza IDs estáveis, mantém conteúdo existente e usa “Pendente”
quando ainda não houver informação. O validator verifica se as áreas mínimas
do primeiro SaaS estão presentes.

## Não faz

Não cria `spec.md`, não edita backlog e não apaga uma resposta para substituir
por texto genérico.
