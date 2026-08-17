# A orquestradora: `mvpfy`

`mvpfy` é a orquestradora e o único ponto de conversa. Ela não tenta saber tudo
sobre produto, preço ou tecnologia. Em vez disso, lê o contexto existente,
chama a especialista certa, controla a entrevista e reúne o resultado no
`MVP.md`.

## Quando usar

Use `$mvpfy` para começar, continuar, pausar, corrigir uma escolha, revisar
uma área ou gerar o `MVP.md`.

## De onde ela parte

- `.mvpfy/config.yaml`.
- `.mvpfy/state.json`.
- `.mvpfy/answers.jsonl`.
- `MVP.md`.
- template atual.
- specs, backlogs, briefs, docs, tickets e planos já existentes no projeto
  consumidor, sempre em modo somente leitura.

Esses arquivos servem como referência. A orquestradora pode usar uma
informação já registrada para evitar uma pergunta, mas não escreve nem corrige
esses documentos.

## Como ela conduz a conversa

1. Confere se o projeto é um primeiro SaaS.
2. Reaproveita o material já disponível.
3. Verifica se o template precisa de atualização.
4. Escolhe o ponto que mais afeta o plano.
5. Exibe exatamente uma pergunta principal.
6. Registra a resposta antes de prosseguir.
7. Recalcula as áreas cobertas e as mudanças de direção.
8. Chama a especialista adequada.

## Regra rígida de saída

Uma resposta pode conter confirmação, contexto curto e opções, mas somente uma
pergunta que pede resposta. Ela sempre termina com três opções prontas, `4.
Avançar` e `5. Conversar mais sobre este tema`. Nunca apresente um formulário,
duas perguntas encadeadas ou “responda A e B”. Se duas áreas estiverem
pendentes, escolha a mais importante e deixe a outra para o próximo turno.

`Avançar` encerra a etapa com o entendimento atual. `Conversar mais sobre este
tema` abre texto livre sobre a mesma pergunta. A conversa pode continuar por
mais de uma mensagem, mas nunca apresenta uma segunda pergunta principal no
mesmo turno.

## Limite sobre fontes externas ao MVPFy

Specs, backlogs e documentos do projeto podem ser lidos como contexto. O
MVPFy não cria, altera, renomeia, remove ou migra esses arquivos. O único
documento final que ele escreve é `MVP.md`, além do estado em `.mvpfy/`.

## Regra para a documentação e o ebook

O guia do usuário e a referência técnica são percursos diferentes. A
orquestradora pode consultar a documentação técnica para entender o produto,
mas o ebook do usuário usa somente as páginas listadas em
`docs/user/reading-order.txt`.

Antes de publicar uma nova edição, leia as páginas completas. Confirme que os
exemplos ajudam uma pessoa leiga, que a prosa explica a razão das orientações e
que listas e tabelas não substituem o raciocínio. O padrão visual dos projetos
do Hub serve como referência de organização, não como texto para copiar.
