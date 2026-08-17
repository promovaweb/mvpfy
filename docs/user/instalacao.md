# Prepare o projeto que receberá o MVP

O MVPFy fica instalado no projeto que receberá o planejamento. O repositório
`mvpfy` fornece as skills e os scripts. O projeto consumidor guarda o `MVP.md`
e o estado da sua própria entrevista.

## Instale as skills

Na raiz do projeto consumidor, execute:

```bash
npx skills add promovaweb/mvpfy
```

Se quiser uma visão visual do andamento, instale também a CLI:

```bash
npm install --global @promovaweb/mvpfy
mvpfy tui --project .
```

O painel mostra as áreas do MVP, abre uma aba colorida para leitura do
`MVP.md` e oferece instalação e atualização usando `skills add` e `skills
update`.

Depois, prepare os arquivos locais:

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

Esse comando cria `.mvpfy/` e inicia `MVP.md` a partir do template atual. Ele
não altera o código da aplicação, não cria `spec.md` e não escreve no
repositório Specsfy.

## O que será criado

```text
projeto/
├── MVP.md
└── .mvpfy/
    ├── config.yaml
    ├── state.json
    ├── answers.jsonl
    └── research.json
```

O `MVP.md` é o arquivo que você compartilha com as equipes. O diretório
`.mvpfy/` guarda o estado necessário para retomar a entrevista, registrar as
respostas e conservar as pesquisas feitas para o projeto.

## Confira a instalação

Para testar o próprio repositório do MVPFy, use:

```bash
npm test
```

No projeto consumidor, carregue `$mvpfy` e peça para começar. A primeira
mensagem livre deve ser salva antes da primeira pergunta fechada. Se os
arquivos não aparecerem, consulte [Solução de problemas](solucao-de-problemas.md).

## Atualize sem perder o plano

Atualize as skills pelo mesmo comando usado na instalação. Ao encontrar um
`MVP.md` de uma versão anterior, a orquestradora compara o template atual e
chama `mvpfy-migrate` antes de perguntar algo novo. As respostas já registradas
continuam no arquivo e o próximo turno trata apenas da primeira lacuna relevante.

Pela CLI, use `mvpfy update --project .`. O comando delega a atualização ao
CLI oficial `skills` e mantém a mesma origem usada pela instalação.
