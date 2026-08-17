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

## Gate editorial e de publicação

Antes de gerar um ebook, confirme que `docs/user/reading-order.txt` contém
somente páginas destinadas à pessoa usuária. A referência técnica e a
especificação continuam disponíveis online, mas não entram no guia do usuário.
Compare a estrutura com um projeto de referência do Hub e mantenha a identidade
visual sem copiar sua prosa.

Leia o conjunto de páginas como uma publicação inteira. Reescreva trechos que
pareçam catálogo, lista de recursos ou anotação de agente. Cada seção pública
precisa explicar a situação, a ação, o efeito e o limite da orientação. Listas e
tabelas devem organizar informação paralela, nunca substituir a explicação.

Depois da leitura editorial, gere PDF e EPUB, leia o resultado e rode os
validadores do submódulo e do Hub. Um build correto comprova o arquivo gerado,
mas não comprova a qualidade do texto.

Use o mesmo SemVer do framework no PDF, no EPUB e no manifesto. `VERSION` é a
fonte canônica e `ebooks/VERSION` é apenas um espelho conferido pelo build. Se
os valores divergirem, corrija a versão antes de gerar ou publicar os formatos.

Leia [document-rules.md](references/document-rules.md) para a ordem canônica.
