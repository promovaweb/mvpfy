# Artefatos

| Arquivo | Função |
| --- | --- |
| `MVP.md` | Plano único entregue ao usuário. |
| `.mvpfy/state.json` | Estado atual e fila de trabalho. |
| `.mvpfy/answers.jsonl` | Histórico append-only de respostas. |
| `.mvpfy/existing-project.json` | Relatório renovado de specs, código, manifestos e sugestões. |
| `.mvpfy/research.json` | Referências de mercado consultadas. |
| `.mvpfy/template-version` | Versão usada na última migração. |

Os IDs `mvpfy:section:<id>` tornam a atualização idempotente e permitem que o
template evolua sem substituir texto já preenchido.
