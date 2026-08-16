# Solução de problemas

## A entrevista voltou ao começo

Confira se `.mvpfy/state.json`, `.mvpfy/answers.jsonl` e `Company.md` estão no
mesmo projeto. O agente reconstrói o estado a partir do `Company.md` quando os
arquivos auxiliares não estão disponíveis.

## A pergunta não avançou

O MVPFy só avança depois da gravação. Verifique a mensagem do script
`record-answer.mjs` e tente responder novamente sem apagar os arquivos do
projeto.

## O template mudou

Use `$mvpfy-migrate`. A skill adiciona blocos ausentes, mantém o conteúdo
preenchido e apresenta apenas a próxima pergunta nova relevante.
