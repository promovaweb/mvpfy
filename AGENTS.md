# Instruções do MVPFy

Responda, documente e comente código em Português do Brasil. O MVPFy atende
uma empresa em formação cujo primeiro produto é um software oferecido como
serviço. Toda análise deve permanecer limitada à versão 1.0.

Skills vivem diretamente em `skills/mvpfy-*`. O projeto consumidor recebe o
processo em `.mvpfy/` e o resultado em `Company.md`. Não salve dados de clientes
dentro deste repositório.

Ao alterar skills, preserve o contrato de uma pergunta por turno, registro
antes da próxima pergunta, retomada e migração sem perda. Rode `npm test` e o
validador de cada skill. Ao alterar `docs/`, incremente `ebooks/VERSION`, rode
`npm run ebook` e confira `npm run ebook:verify`.
