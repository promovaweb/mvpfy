# Arquitetura

Cada skill vive em `skills/mvpfy-*` e pode ser instalada separadamente. O
projeto consumidor guarda o processo em `.mvpfy/`, com estado mutável, eventos
append-only, pesquisas e versão do template. O resultado é `Company.md`.

`mvpfy` lê o pedido, escolhe a especialista e garante a ordem da conversa.
`mvpfy-document` controla a estrutura. `mvpfy-migrate` evolui o template. As
outras skills retornam campos, recomendações, lacunas e uma pergunta opcional.
