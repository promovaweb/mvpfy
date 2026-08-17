# `mvpfy-progress`

Esta skill lê o estado e o `MVP.md` para mostrar o andamento do planejamento.
Ela não conduz a entrevista, não salva resposta e não altera arquivos do
Specsfy.

## O que ela apresenta

- percentual geral do plano;
- andamento por área;
- respostas salvas e último ponto da entrevista;
- modelo multitenante ou instalação separada;
- primeira seção ainda pendente.

O percentual é uma referência de preenchimento. Uma seção pode conter uma
recomendação e ainda precisar de confirmação na entrevista.

## Exemplo

```text
Progresso do MVP: 48%
Concluído: Problema e Público.
Em andamento: Produto e SaaS.
Pendente: Marketing e Validação.
Próximo ponto: definir o primeiro canal de aquisição.
```

Para abrir a visão completa, use `mvpfy progress` ou a aba **Progresso** da
TUI. Para ler o documento inteiro com cores, use a aba **MVP.md**.
