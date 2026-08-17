# Template e `MVP.md`

O template canônico está em
[`skills/mvpfy-document/assets/MVP.template.md`](../../skills/mvpfy-document/assets/MVP.template.md).
Ele é a fonte estrutural do documento entregue pelo MVPFy.

## IDs estáveis

Cada seção começa com um comentário no formato:

```markdown
<!-- mvpfy:section:problem-definition -->
## Problema que o MVP resolve
```

O renderer procura o ID, não o título. Assim, uma mudança de redação não
duplica a seção nem apaga o texto preenchido.

## Frontmatter

O frontmatter contém `document_type`, `schema_version`, `project_id`,
`document_status`, `interview_status`, datas e idioma. O `schema_version` é
usado pelo migrador.

## Regras de conteúdo

O documento precisa distinguir confirmado, recomendado, hipótese e pendência.
Tabelas servem para comparação, listas servem para escopo e parágrafos
explicam relações de causa, escolha e consequência.

## Renderização e validação

```bash
node skills/mvpfy-document/scripts/render-company.mjs --project .
node skills/mvpfy-document/scripts/render-company.mjs --project . --check
node skills/mvpfy-document/scripts/validate-company.mjs --project .
```

O primeiro comando cria ou atualiza. `--check` verifica se a renderização
precisaria mudar. O validator exige problema, público, proposta, jornada,
conta, onboarding, cobrança, escopo, preço, tecnologia, aquisição, métricas e
pendências.

## Migração

```bash
node skills/mvpfy-migrate/scripts/migrate-company.mjs --project .
```

O migrador adiciona seções ausentes, preserva o texto e atualiza a versão
somente depois de uma gravação válida. Ele nunca toca em `spec.md`, `specs/`,
backlogs ou no repositório Specsfy.
