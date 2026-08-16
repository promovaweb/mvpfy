# Entrevista adaptativa

A entrevista é a interface principal do MVPFy. Você fala em linguagem comum e
a orquestradora escolhe a próxima lacuna com maior impacto no plano.

## O ciclo de cada resposta

1. Você responde com número, texto, combinação de opções ou “não sei”.
2. O MVPFy guarda a resposta original.
3. A resposta é normalizada sem alterar seu sentido.
4. Fatos, escolhas, hipóteses e áreas cobertas são extraídos.
5. `state.json` e `Company.md` são atualizados quando aplicável.
6. A orquestradora recalcula o que ainda falta.
7. Uma única pergunta seguinte é apresentada.

Se a gravação falhar, o fluxo não avança. A mesma pergunta volta para que você
possa tentar novamente.

## Formato fixo de cada turno

Cada pergunta aparece com cinco opções:

```text
Qual situação descreve melhor o problema?
1. A equipe perde o acompanhamento.
2. A equipe demora para responder.
3. A equipe não consegue mostrar o resultado.
4. Avançar
5. Conversar mais sobre este tema
```

As três primeiras opções são respostas prontas para a mesma pergunta. A opção
4 aceita o entendimento atual e leva à próxima etapa. A opção 5 abre um chat
sobre o mesmo tema: você pode escrever uma explicação, uma dúvida ou um caso
complexo. O MVPFy pode investigar esse caso em mais de um turno, mas continua
exibindo no máximo uma pergunta por vez e salva cada resposta antes de seguir.

Nunca aparecem duas perguntas principais no mesmo turno.

## Formas de resposta

Você pode responder:

- `1`, `2` ou `3`;
- `4` para avançar;
- `5` para conversar mais sobre a pergunta atual;
- “2, mas também atendo consultores”;
- uma explicação livre;
- “ainda não sei”;
- uma correção de resposta anterior;
- “pausar”, “continuar”, “revisar preço” ou “gerar documento”.

“Ainda não sei” também é informação. O MVPFy registra a lacuna e pode sugerir
uma hipótese provisória, deixando claro que ela precisa de validação.

## Comandos de conversa

| Pedido | Resultado |
| --- | --- |
| “Começar” | Cria ou abre um projeto e faz a primeira pergunta útil. |
| “Continuar” | Lê o estado e retoma pela pendência prioritária. |
| “Pausar” | Salva o ponto atual sem apagar respostas. |
| “Revisar preço” | Trabalha somente em modelo, faixa e premissas de preço. |
| “Mudar o público” | Registra a correção e revisa áreas dependentes. |
| “O que falta?” | Mostra um resumo das pendências sem abrir formulário. |
| “Gerar documento” | Consolida a melhor versão, mesmo que preliminar. |

## Como o fluxo evita perguntas repetidas

Cada resposta recebe uma lista de campos cobertos. Uma resposta sobre “a
agência paga e o cliente acompanha” cobre papéis comerciais e de produto. A
orquestradora usa esses campos para retirar perguntas redundantes da fila.

Ela também verifica contradições. Se antes o comprador era uma clínica e depois
você disser que venderá para agências, a alteração é registrada como correção.
As personas, preço, jornada e canais relacionados voltam para revisão.

## Quando o MVP está grande demais

O MVPFy pede uma escolha quando encontra várias jornadas, muitos públicos ou
módulos independentes. A pergunta não é “quais recursos você quer?”, mas:

```text
Qual resultado precisa funcionar do começo ao fim na primeira versão?
1. Registrar e acompanhar o lead.
2. Gerar o relatório para o cliente.
3. Automatizar a distribuição do lead.
```

As outras ideias são preservadas em “Fora do MVP e evolução futura”.
