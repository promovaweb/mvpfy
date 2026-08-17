# Instalação em um projeto consumidor

O MVPFy é instalado no projeto que vai receber o planejamento. O repositório
`mvpfy` guarda as skills e os scripts; o estado da entrevista fica no projeto
consumidor.

## Instalar as skills

No projeto consumidor, execute:

```bash
npx skills add promovaweb/mvpfy
```

Depois, inicie a estrutura local:

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

O comando prepara `.mvpfy/` e cria `MVP.md` a partir do template. Ele não
altera código da aplicação, não cria `spec.md` e não escreve no repositório
Specsfy.

## Arquivos criados

```text
projeto/
├── MVP.md
└── .mvpfy/
    ├── config.yaml
    ├── state.json
    ├── answers.jsonl
    └── research.json
```

`MVP.md` é o arquivo que você compartilha com as equipes. `.mvpfy/` guarda
o estado operacional para retomar a entrevista, registrar respostas e manter
pesquisas. Consulte [Estado e persistência](../develop/estado-e-persistencia.md)
para os campos e as regras de gravação.

## Conferir a instalação

No repositório do MVPFy, a suíte pode ser executada com:

```bash
npm test
```

Em um projeto consumidor, carregue `$mvpfy` e peça para começar. A primeira
resposta deve ser salva antes da pergunta seguinte. Se a estrutura não for
criada, confira [Solução de problemas](solucao-de-problemas.md).

## Atualização

Atualize as skills pelo mesmo mecanismo usado na instalação. Ao encontrar um
`MVP.md` de uma versão anterior, a orquestradora compara o template e usa
`mvpfy-migrate` antes de fazer novas perguntas. A atualização preserva as
respostas existentes.
