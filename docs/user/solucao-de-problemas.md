# Quando algo não funcionar

## O estado não aparece depois da instalação

Confirme que o comando foi executado na raiz do projeto que receberá o plano:

```bash
npx --yes @promovaweb/mvpfy install --project .
```

Depois, confira se existem `MVP.md` e `.mvpfy/state.json`. O comando deve rodar
no projeto consumidor. Executá-lo na raiz do repositório `mvpfy` tenta preparar
o próprio pacote, não o projeto da entrevista.

## A pergunta repetiu algo que você já informou

Confira se a mensagem anterior foi salva no `answers.jsonl` e se as áreas
extraídas chegaram ao `state.json`. Uma resposta livre pode precisar de uma
leitura adicional. A ausência de um número não torna a mensagem inválida.

## O documento continua como `preliminary`

Abra a seção “Hipóteses e pendências”. Esse estado informa que ainda falta um
item necessário para descrever o primeiro SaaS. Peça “continuar” ou “o que
falta?” para voltar ao próximo ponto relevante.

## Você mudou uma escolha anterior

Diga a alteração com clareza, por exemplo: “o público agora são clínicas, não
agências”. O MVPFy conserva a mensagem anterior no histórico, registra a nova
e revisa as áreas afetadas.

## O ebook não mostra a versão atual

No repositório `mvpfy`, execute:

```bash
npm run ebook
npm run ebook:verify
```

Se uma página não aparecer, confira o caminho correspondente em
`docs/user/reading-order.txt`. Essa lista deve conter apenas o guia do usuário.
