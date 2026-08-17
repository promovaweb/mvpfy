# A entrevista, uma pergunta por vez

A entrevista é o lugar onde a ideia ganha forma. Você escreve como falaria com
uma pessoa da equipe, e a orquestradora escolhe o próximo ponto que mais ajuda
a montar o plano.

## Primeiro, conte a ideia inteira

Antes da primeira pergunta com opções, descreva livremente a ideia do SaaS e do
MVP. Conte o que o produto pode fazer, qual público ele atenderia e quais módulos,
recursos ou integrações já apareceram na sua cabeça. O MVPFy salva esse relato
e separa os itens citados para examiná-los depois.

Depois, começa a entrevista fechada. Cada turno tem uma única pergunta e cinco
opções. Um item citado não entra automaticamente na versão 1.0. A conversa vai
mostrar se ele apoia a jornada principal, se deve esperar ou se não serve ao
recorte escolhido.

Você também pode enviar tudo em uma mensagem. Por exemplo:

```text
Quero um SaaS para pequenas agências acompanharem leads de seus clientes.
Hoje elas usam planilhas e WhatsApp. A agência paga, cada cliente vê apenas
seus próprios leads e o MVP precisa cadastrar o lead, atribuí-lo a alguém e
mostrar um resumo. Quero começar com Laravel em uma VPS e cobrar mensalidade.
```

Nesse caso, o MVPFy já pode registrar problema, público, cliente pagador,
permissões, jornada, tecnologia e cobrança. Ele não precisa perguntar de novo
qual empresa ou pessoa fará o pagamento ou repetir etapas que você descreveu. A próxima pergunta trata apenas
do ponto importante que ainda falta.

Se quiser acrescentar informações, envie outra mensagem. Todas são acolhidas e
salvas. Quando terminar, escolha `4. Avançar`.

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

As opções 1, 2, 3 e 5 permitem continuar enviando conteúdo. A opção 4 salva o
estado da entrada e libera a próxima pergunta fechada.

## O que acontece depois da sua resposta

1. Você responde com número, texto, combinação de opções ou “não sei”.
2. O MVPFy guarda sua mensagem original.
3. A resposta recebe uma leitura organizada, sem mudança de sentido.
4. O sistema registra escolhas, hipóteses e áreas já cobertas.
5. `state.json` e `MVP.md` são atualizados quando fizer sentido.
6. A orquestradora revê o que ainda falta.
7. Uma única pergunta seguinte aparece.

Se a gravação falhar, o fluxo não avança. A mesma pergunta volta para que você
possa tentar novamente.

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
complexa. O MVPFy pode continuar essa conversa por mais de um turno, sempre
salvando cada mensagem e mostrando no máximo uma pergunta principal.

Nunca aparecem duas perguntas principais no mesmo turno.

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

“Ainda não sei” também ajuda. O MVPFy registra a lacuna e pode sugerir uma
hipótese provisória, deixando claro que ela ainda precisa de comprovação.

## Peça uma ação quando precisar

| Pedido | Resultado |
| --- | --- |
| “Começar” | Cria ou abre um projeto e faz a primeira pergunta útil. |
| “Continuar” | Lê o estado e retoma pela pendência prioritária. |
| “Pausar” | Salva o ponto atual sem apagar respostas. |
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
produtos separados, o MVPFy pede um recorte. A pergunta passa a ser:

```text
Qual resultado precisa funcionar do começo ao fim na primeira versão?
1. Registrar e acompanhar o lead.
2. Gerar o relatório para o cliente.
3. Automatizar a distribuição do lead.
```

As outras ideias são preservadas em “Fora do MVP e evolução futura”.
