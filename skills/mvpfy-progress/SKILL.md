---
name: mvpfy-progress
description: Apresenta ao usuário o andamento do plano MVPFy por áreas e pendências sem iniciar outra pergunta.
---

# Skill: MVPFy Progress

Leia `.mvpfy/state.json` e `MVP.md` antes de responder sobre andamento. Esta
skill somente observa o projeto. Ela não grava respostas, não altera o
documento e não modifica arquivos do Specsfy.

## Responsabilidade

Apresente uma visão curta do trabalho já registrado:

- percentual aproximado do plano;
- áreas concluídas, em andamento e pendentes;
- modelo de atendimento SaaS, incluindo o estado da definição multitenante;
- próxima lacuna relevante;
- quantidade de respostas salvas e último ponto da entrevista;
- distinção entre informação confirmada, recomendação e ponto ainda aberto.

Calcule o andamento a partir dos blocos identificados do `MVP.md`. Um bloco
contendo `Pendente`, `A definir` ou `Ainda não` continua aberto. Quando não
houver documento, informe que o projeto ainda não foi preparado. Não trate a
existência de uma seção como conclusão.

## Forma da resposta

Use poucas linhas e agrupe o resultado por área. A resposta pode ser solicitada
por “mostrar progresso”, “o que falta?” ou pela TUI. Não apresente uma nova
pergunta junto com o relatório. A orquestradora decide o próximo turno da
entrevista depois de ler este resultado.

Modelo:

```text
Progresso do MVP: 48%

Concluído: problema, público e jornada central.
Em andamento: modelo multitenante e preço.
Pendente: concorrentes, custos e lançamento.
Próximo ponto: definir como os espaços de cliente serão separados.
```

## Limites

Não invente percentuais, não transforme recomendação em escolha do usuário e
não peça confirmação para preencher o relatório. Caso haja conflito entre o
estado e o documento, informe a diferença e deixe a orquestradora tratar a
reconciliação.
