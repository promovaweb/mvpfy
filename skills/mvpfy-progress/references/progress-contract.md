# Contrato de leitura do progresso

## Fontes

Leia, nesta ordem:

1. `.mvpfy/state.json`, quando existir.
2. `MVP.md`, quando existir.
3. `Company.md` somente para reconhecer uma origem legada, sem criar uma nova
   cópia e sem apagar o `MVP.md`.

Não leia nem altere `spec.md`, `specs/`, `backlog/` ou outros arquivos do
Specsfy. Eles podem servir como referência para a entrevista principal, mas não
fazem parte do cálculo desta skill.

## Áreas padrão

| Área | Blocos principais |
| --- | --- |
| Problema | `problem`, `evidence` |
| Público | `audience`, `personas` |
| Produto | `value-and-positioning`, `main-journey`, `scope`, `modules`, `permissions` |
| SaaS | `account-model`, `onboarding`, `subscription`, `support-retention`, `manual-processes` |
| Mercado e preço | `competition`, `commercial`, `economics` |
| Tecnologia | `technology`, `infrastructure`, `ai` |
| Marketing | `website`, `marketing`, `sales` |
| Validação | `metrics`, `risks`, `execution`, `decisions`, `hypotheses`, `sources` |

Cada área recebe a média dos blocos encontrados. Se nenhum bloco do grupo
existir, a área fica pendente. O percentual geral é a média das áreas que têm
blocos.

## Modelo SaaS

Leia `state.tenancy` e informe explicitamente um destes estados:

- pendente;
- multitenante compartilhado;
- instalação separada;
- comparação em aberto.

Quando o modelo for multitenante e houver campos ausentes, a próxima lacuna
deve apontar tenant, titularidade, membros, isolamento ou provisionamento antes
de detalhes menos importantes.
