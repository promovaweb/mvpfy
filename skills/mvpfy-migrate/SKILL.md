---
name: mvpfy-migrate
description: Compara o template atual com um MVP.md existente, acrescenta seções novas e preserva todo conteúdo já preenchido.
---

# Migrar o MVP.md

Leia a versão do schema no frontmatter e os IDs de seção existentes. Execute
`scripts/migrate-company.mjs --project <diretório>` para inserir seções ausentes
na posição do template, sem apagar respostas ou duplicar blocos.

Quando uma seção antiga for dividida, preserve o texto na seção original ou em
“Histórico e escolhas anteriores” se não houver base para distribuir o conteúdo.
Marque campos novos como pendentes, atualize a versão somente após a gravação
válida e devolva ao orquestrador a primeira pergunta nova relevante.

Leia [migration-policy.md](references/migration-policy.md) antes de alterar um
documento existente.
