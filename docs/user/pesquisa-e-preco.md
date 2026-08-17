# Mercado, preço e custo

O MVPFy pesquisa o mercado quando você informa concorrentes, envia URLs ou
solicita uma referência atual. A pesquisa ajuda a montar uma hipótese de preço,
mas não substitui a conversa com potenciais clientes.

## Quando você tem concorrentes para comparar

Informe uma URL ou um nome. A skill `mvpfy-market` procura, quando os dados
estão publicados:

- o público e a promessa.
- os recursos úteis para a comparação.
- o preço mensal, anual ou sob consulta.
- a moeda, os limites e as condições do plano.
- a diferença entre concorrente direto, indireto e alternativa manual.

O `MVP.md` registra fonte e data. Se o preço não estiver publicado, o plano
escreve “não publicado”. O MVPFy não inventa uma faixa nem apresenta uma
promoção como preço permanente.

## Quando não há concorrente direto

Nesse caso, a conversa olha para o trabalho feito hoje. As perguntas continuam
aparecendo uma por vez, com três respostas prontas, `Avançar` e `Conversar mais
sobre este tema`. A investigação pode tratar de:

- tempo gasto por mês.
- ferramentas combinadas.
- erros, perdas ou atrasos.
- resultado que traria benefício suficiente para justificar o pagamento.

Essas respostas ajudam a aproximar o valor percebido e escolher uma unidade de
cobrança que seja fácil de explicar.

## Como surge a faixa de preço

`mvpfy-pricing` considera cliente pagador, unidade de valor, frequência de uso,
benefício, esforço comercial, custo variável, suporte e estágio da validação.
Com esses dados, pode recomendar cobrança por espaço, por pessoa, por volume,
por uso ou um modelo combinado.

Quando houver dados suficientes, o plano compara três cenários:

| Cenário | Uso |
| --- | --- |
| Mínimo | Poucos clientes, infraestrutura mínima e operação acompanhada de perto. |
| Base | Volume inicial esperado e custos recorrentes conhecidos. |
| Crescimento | Aumento de uso sem acrescentar complexidade antes de existir necessidade. |

As espaços conceituais são:

```text
custo mensal = fixos + variáveis + IA + comunicação + suporte + taxas
margem por cliente = receita líquida - custo variável por cliente
clientes para equilíbrio = custos fixos / margem por cliente
MRR = soma da receita recorrente mensal dos clientes ativos
ARPA = MRR / espaços pagantes
```

O resultado é uma faixa acompanhada das suas premissas. Não é previsão
contábil e não garante receita.
