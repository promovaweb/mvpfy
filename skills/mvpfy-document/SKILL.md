---
name: mvpfy-document
description: Gera, atualiza e valida o MVP.md do MVPFy com seções estáveis, estado claro e preservação do conteúdo existente.
---

# Consolidar o MVP.md

Use `assets/MVP.template.md` como fonte estrutural. O documento final deve
ser um único arquivo Markdown, compreensível sem o histórico da conversa, com
metadados, resumo do MVP, problema, público, personas, escopo, SaaS, mercado,
preço, custos, tecnologia, marketing, métricas, plano de execução e pendências.

Execute `scripts/render-company.mjs --project <diretório>` para criar ou
atualizar o arquivo. O script localiza seções pelos IDs HTML
`mvpfy:section:<id>`, preserva conteúdo existente e usa “Pendente” quando
faltarem dados.

Execute o mesmo script com `--check` antes de uma gravação. Valide depois com
`scripts/validate-company.mjs --project <diretório>`. O estado só pode ser
`ready` quando os campos mínimos do MVP SaaS estiverem preenchidos; caso
contrário, use `preliminary` e liste as lacunas.

Leia [document-rules.md](references/document-rules.md) para a ordem canônica.
