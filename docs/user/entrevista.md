# A entrevista, uma pergunta por vez

Na entrevista, a ideia vira plano. Você escreve como falaria com um sócio ou
colega de projeto. A orquestradora escolhe o próximo ponto que falta para
montar o plano.

## Primeiro, conte a ideia inteira

Antes da primeira pergunta com opções, descreva livremente a ideia do SaaS e do
MVP. Conte o que o produto pode fazer, qual público ele atenderia e quais módulos,
recursos ou integrações já apareceram na sua cabeça. O MVPFy grava esse relato
e separa os itens citados para examiná-los depois.

Depois começa a entrevista fechada, com uma única pergunta e cinco opções por
turno. Um item citado não entra automaticamente na versão 1.0: a conversa
mostra se ele apoia a jornada principal, se deve esperar ou se fica fora do
escopo escolhido.

Você também pode enviar tudo em uma mensagem. Por exemplo:

```text
Quero um SaaS para pequenas agências acompanharem leads de seus clientes.
Hoje elas usam planilhas e WhatsApp. A agência paga, cada cliente vê apenas
seus próprios leads e o MVP precisa cadastrar o lead, atribuí-lo a alguém e
mostrar um resumo. Quero começar com Laravel em uma VPS e cobrar mensalidade.
```

Nesse caso, o MVPFy já pode registrar o problema, o público e o cliente
pagador, além das permissões, da jornada, da tecnologia e da cobrança. Ele não
pergunta de novo qual cliente fará o pagamento nem repete etapas que você descreveu. A
próxima pergunta trata apenas do ponto importante que ainda falta.

Para acrescentar informações, envie outra mensagem, que também fica gravada.
Quando terminar, escolha `4. Avançar`.

O encerramento da entrada inicial pode aparecer assim:

```text
MVPFy: Entendi a ideia e já registrei o problema, o público, a jornada e os
itens candidatos. Você quer acrescentar algo antes de começar?
1. Acrescentar outro módulo ou recurso.
2. Explicar melhor o público ou o problema.
3. Informar tecnologia, preço ou canal de venda.
4. Continuar para as perguntas.
5. Conversar mais sobre este tema.
```

As opções 1, 2, 3 e 5 permitem continuar enviando conteúdo. A opção 4 grava o
estado da entrada e libera a próxima pergunta fechada.

## A primeira pergunta fechada

Depois de gravar a ideia inicial, o MVPFy confirma o modelo de atendimento antes
de investigar problema, preço ou tecnologia:

```text
O sistema atenderá várias empresas ou equipes separadas dentro da mesma aplicação?
1. Sim. Vários clientes usarão a mesma aplicação, com dados separados.
2. Não. Cada cliente terá uma instalação ou ambiente próprio.
3. Ainda não sei. Quero comparar os dois modelos.
4. Avançar
5. Conversar mais sobre este tema
```

Na primeira opção, a conversa pode fazer uma única pergunta curta sobre a
unidade do tenant e o administrador. Os detalhes de membros e papéis, acesso
entre espaços, separação de dados, banco e criação de novos tenants viram
recomendações técnicas. Assim, o MVP não vira um cadastro interminável de
permissões.

Se ainda não souber, a opção 5 permite conversar sobre a diferença antes de
registrar a escolha. A pergunta continua sendo uma por vez.

## Quantas perguntas serão feitas

A entrevista fechada tem no máximo oito perguntas, uma essencial por etapa. As
etapas são problema, público e produto, SaaS, mercado, tecnologia e marketing,
e só a etapa SaaS pode receber uma segunda pergunta curta. Se a ideia
inicial já respondeu uma etapa, ela é pulada. O que permanecer será registrado
como recomendação ou hipótese no `MVP.md`.

Depois da oitava resposta, o MVPFy encerra a entrevista normal e monta o
documento. Você pode solicitar uma revisão específica depois, mas o fluxo inicial
não continua perguntando sem fim.

## O que acontece depois da sua resposta

1. Você responde com número, texto, combinação de opções ou “não sei”.
2. O MVPFy guarda sua mensagem original.
3. A resposta recebe uma leitura organizada, sem mudança de sentido.
4. O sistema registra escolhas, hipóteses e áreas já cobertas.
5. `state.json` e `MVP.md` são atualizados quando fizer sentido.
6. A orquestradora revê o que ainda falta.
7. Uma única pergunta seguinte aparece.

Se a gravação falhar, o fluxo não avança: a mesma pergunta volta para você
tentar novamente.

## O formato de cada turno

Cada pergunta aparece com cinco opções:

```text
Qual situação descreve melhor o problema?
1. A equipe perde o acompanhamento.
2. A equipe demora para responder.
3. A equipe não consegue mostrar o resultado.
4. Avançar
5. Conversar mais sobre este tema
```

As três primeiras opções respondem à mesma pergunta. A opção 4 aceita o
entendimento atual e leva à próxima etapa. A opção 5 abre uma conversa sobre o
mesmo tema. Você pode explicar um caso, tirar uma dúvida ou enviar uma resposta
complexa. O MVPFy pode continuar essa conversa por mais de um turno. Em cada
turno, grava a mensagem e mostra no máximo uma pergunta principal.

A skill não mostra duas perguntas principais no mesmo turno.

## Você pode responder do seu jeito

Você pode responder:

- `1`, `2` ou `3`.
- `4` para avançar.
- `5` para conversar mais sobre a pergunta atual.
- “2, mas também atendo consultores”.
- uma explicação livre.
- “ainda não sei”.
- uma correção de resposta anterior.
- “pausar”, “continuar”, “revisar preço” ou “gerar documento”.

“Ainda não sei” também é uma resposta válida. O MVPFy registra a lacuna e pode
sugerir uma hipótese provisória, deixando claro que ela ainda precisa de
comprovação.

## Ações que você pode solicitar

| Instrução | Resultado |
| --- | --- |
| “Começar” | Cria ou abre um projeto e faz a primeira pergunta útil. |
| “Continuar” | Lê o estado e retoma pela pendência prioritária. |
| “Pausar” | Grava o ponto atual sem apagar respostas. |
| “Revisar preço” | Trabalha somente em modelo, faixa e premissas de preço. |
| “Mudar o público” | Registra a correção e revisa áreas dependentes. |
| “O que falta?” | Mostra um resumo das pendências sem abrir formulário. |
| “Gerar documento” | Consolida a melhor versão, mesmo que preliminar. |

## Como o fluxo aproveita o que você já disse

Cada resposta recebe uma lista de áreas cobertas. Uma mensagem como “a agência
paga e o cliente acompanha” já descreve papéis comerciais e de produto. A
orquestradora usa essa informação para não colocar perguntas repetidas na fila.

Ela também confere mudanças de direção. Se antes você disser que o cliente pagador é
uma clínica e depois informar que venderá para agências, a nova mensagem fica
registrada como correção. Personas, preço, jornada e canais ligados ao público
anterior voltam para revisão.

## Quando a ideia ficou grande demais

Quando aparecem várias jornadas, muitos públicos ou módulos que parecem
produtos separados, o MVPFy pergunta qual parte entra primeiro:

```text
Qual resultado precisa funcionar do começo ao fim na primeira versão?
1. Registrar e acompanhar o lead.
2. Gerar o relatório para o cliente.
3. Automatizar a distribuição do lead.
```

As outras ideias são preservadas em “Fora do MVP e evolução futura”.
