# Instruções do MVPFy

Responda, documente e comente código em Português do Brasil. O MVPFy atende
uma empresa em formação cujo primeiro produto é um software oferecido como
serviço. Toda análise deve permanecer limitada à versão 1.0.

Skills vivem diretamente em `skills/mvpfy-*`. O projeto consumidor recebe o
processo em `.mvpfy/` e o resultado em `MVP.md`. Não salve dados de clientes
dentro deste repositório.

Ao alterar skills, preserve o contrato de uma pergunta por turno, registro
antes da próxima pergunta, retomada e migração sem perda. Rode `npm test` e o
validador de cada skill. Ao alterar `docs/`, incremente `ebooks/VERSION`, rode
`npm run ebook` e confira `npm run ebook:verify`.

O SemVer do framework fica em `VERSION` e deve coincidir com
`package.json.version` e com a seção mais recente de `CHANGELOG.md`. Uma
melhoria publicada na `main` precisa avançar essa versão. O workflow em
`.github/workflows/release.yml` cria a tag `vX.Y.Z` e a release correspondente
no GitHub, sem publicar no npm. O pacote vai ao npm só pela máquina local,
com `npm pack` no commit da tag e `npm publish <tgz> --access public`. Não
reutilize uma tag já publicada.

## Status das tarefas no ClickUp

Após cada commit bem-sucedido, marque como `pronto` a tarefa ou subtarefa vinculada à entrega. Após o push bem-sucedido desse commit, marque-a como `publicado`. Registre repositório, SHA e destino do push na tarefa e confirme o status pelo ClickUpfy.

| Status | Quando usar |
| --- | --- |
| `nao iniciado` | Demanda registrada que ainda não foi priorizada. |
| `triagem` | Esclareça o pedido, confira duplicidades e identifique o responsável. |
| `proxima etapa` | Trabalho priorizado que já tem próxima ação e condição de aceite. |
| `em andamento` | Há alguém executando a tarefa, com plano e cronômetro. |
| `refazer` | A revisão pediu ajustes. Registre o que corrigir e retome em `em andamento` ao começar. |
| `revisar` | A entrega está disponível e validada para revisão. Registre como conferi-la. |
| `pronto` | O commit da entrega foi criado. Registre o repositório e o SHA. |
| `publicado` | O push do commit foi confirmado. Registre remoto, branch e versão ou release quando aplicável. |
| `concluido` | Encerramento por orientação do usuário após conferir a entrega em produção ou o aceite da entrega interna. |
