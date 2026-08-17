# Pesquisa de mercado, preço e custo

O MVPFy pesquisa o mercado quando você informa concorrentes, URLs ou pede uma
referência atual. A pesquisa apoia a conversa; ela não substitui a validação
com compradores.

## Com URLs de concorrentes

Informe uma URL ou nome. A skill `mvpfy-market` procura, quando disponível:

- público e promessa;
- recursos relevantes para comparação;
- preço mensal, anual ou sob consulta;
- moeda, limites e condições do plano;
- diferença entre concorrente direto, indireto e alternativa manual.

O `MVP.md` registra fonte e data. Preço ausente continua como “não
publicado”; o MVPFy não inventa uma faixa e não trata promoção como preço
permanente.

## Sem concorrentes claros

A conversa investiga a alternativa usada hoje. Esses pontos podem entrar na
fila, mas aparecem um por turno, sempre no formato de três opções, `Avançar` e
`Conversar mais sobre este tema`:

- tempo gasto por mês;
- ferramentas combinadas;
- erros, perdas ou atrasos;
- resultado que teria valor suficiente para pagar.

Essa informação serve como referência de valor percebido e ajuda a escolher
uma unidade de cobrança simples.

## Como o preço é montado

`mvpfy-pricing` considera comprador, unidade de valor, frequência de uso,
benefício, esforço comercial, custo variável, suporte e estágio da validação.
Pode recomendar cobrança por conta, usuário, volume, uso ou um modelo híbrido.

O plano deve mostrar premissas e três cenários quando houver dados:

| Cenário | Uso |
| --- | --- |
| Enxuto | Poucos clientes, infraestrutura mínima e operação assistida. |
| Base | Volume inicial esperado e custos recorrentes conhecidos. |
| Crescimento | Aumento de uso sem introduzir complexidade antes da hora. |

As contas conceituais são:

```text
custo mensal = fixos + variáveis + IA + comunicação + suporte + taxas
margem por cliente = receita líquida - custo variável por cliente
clientes para equilíbrio = custos fixos / margem por cliente
MRR = soma da receita recorrente mensal dos clientes ativos
ARPA = MRR / contas pagantes
```

O resultado é uma faixa com premissas. Não é uma previsão contábil nem uma
garantia de receita.
