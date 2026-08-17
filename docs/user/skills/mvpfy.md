# Skill `mvpfy`

`mvpfy` é a orquestradora e o único ponto de conversa. Ela não substitui o
conhecimento das especialistas. Ela lê o contexto existente, escolhe o domínio
necessário, controla a entrevista e consolida o resultado.

## Quando usar

Use `$mvpfy` para começar, continuar, pausar, corrigir uma escolha, revisar
uma área ou gerar o `MVP.md`.

## O que ela lê

- `.mvpfy/config.yaml`;
- `.mvpfy/state.json`;
- `.mvpfy/answers.jsonl`;
- `MVP.md`;
- template atual;
- specs, backlogs, briefs, docs, tickets e planos já existentes no projeto
  consumidor, sempre em modo somente leitura.

## O que ela faz

1. Confere se o projeto é um primeiro SaaS.
2. Reaproveita informação já disponível.
3. Verifica se o template precisa de migração.
4. Escolhe uma lacuna prioritária.
5. Exibe exatamente uma pergunta principal.
6. Registra a resposta antes de prosseguir.
7. Recalcula áreas cobertas e conflitos.
8. Chama a especialista adequada.

## Regra rígida de saída

Uma resposta pode conter confirmação, contexto curto e opções, mas somente uma
pergunta que pede resposta. Ela sempre termina com três opções prontas, `4.
Avançar` e `5. Conversar mais sobre este tema`. Nunca apresente um formulário,
duas perguntas encadeadas ou “responda A e B”. Se duas áreas estiverem
pendentes, escolha a mais importante e deixe a outra para o próximo turno.

`Avançar` encerra a etapa com o entendimento atual. `Conversar mais sobre este
tema` abre texto livre sobre a mesma pergunta e não autoriza uma segunda
pergunta no turno.

## Limite sobre fontes externas ao MVPFy

Specs, backlogs e documentos do projeto podem ser lidos como contexto. O
MVPFy não cria, altera, renomeia, remove ou migra esses arquivos. O único
documento final que ele escreve é `MVP.md`, além do estado em `.mvpfy/`.
