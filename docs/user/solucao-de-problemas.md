# Solução de problemas

## A instalação não cria o estado

Confirme que o comando foi executado na raiz do projeto consumidor:

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

Depois confira se existem `Company.md` e `.mvpfy/state.json`. O comando deve
ser executado dentro do consumidor, não na raiz do repositório `mvpfy` para
alterar o próprio pacote.

## A pergunta seguinte repetiu uma resposta

Confira se a resposta anterior foi salva no `answers.jsonl` e se os campos
extraídos foram atualizados no `state.json`. Uma resposta com texto livre pode
precisar de interpretação; ela não deve ser descartada só porque não contém um
número.

## O documento está como `preliminary`

Abra a seção “Hipóteses e pendências”. Esse estado significa que falta pelo
menos um item necessário para descrever o primeiro SaaS. Peça “continuar” ou
“o que falta?” para voltar à pendência prioritária.

## Uma escolha anterior mudou

Diga claramente a alteração, por exemplo: “o público agora são clínicas, não
agências”. O MVPFy preserva a resposta anterior como histórico, registra a nova
resposta e revisa as áreas afetadas.

## O ebook está desatualizado

No repositório `mvpfy`, execute:

```bash
npm run ebook
npm run ebook:verify
```

Se uma página estiver ausente, confira o caminho correspondente em
`docs/reading-order.txt`.
