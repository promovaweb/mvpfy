# Estado e persistência

O projeto consumidor guarda a continuidade da entrevista em `.mvpfy/`. A
estrutura permite pausar, corrigir uma resposta e continuar sem reiniciar o
plano.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `config.yaml` | Projeto, idioma, tipo e template vigente. |
| `state.json` | Visão mutável da entrevista e das áreas preenchidas. |
| `answers.jsonl` | Eventos append-only com resposta original e interpretação. |
| `research.json` | Pesquisas de mercado e fontes consultadas. |
| `template-version` | Versão do template usada na última migração. |

## `state.json`

Os campos centrais são `project_id`, `interview_status`, `active_domain`,
`last_question_id`, `answered_question_ids`, `facts`, `choices`, `assumptions`,
`recommendations`, `gaps`, `conflicts`, `section_status` e
`research_status`.

O estado é uma visão atual. Para saber como uma resposta chegou até ali, leia
`answers.jsonl`.

## Evento de resposta

```json
{
  "event_id": "uuid",
  "timestamp": "2026-08-16T12:00:00Z",
  "question_id": "problem.context",
  "question_text": "Onde o problema aparece?",
  "raw_answer": "Em clínicas pequenas",
  "normalized_answer": "Clínicas pequenas",
  "extracted_fields": ["problem.context", "audience.segment"],
  "supersedes": null
}
```

Uma correção não apaga o evento anterior. Ela cria outro evento com
`supersedes` apontando para o item corrigido.

## Gravação segura

O fluxo valida dados, grava um arquivo temporário, substitui o destino e só
depois permite a próxima pergunta. Se a gravação falhar, a interface repete o
mesmo turno.

## Leitura de contexto

Specs, backlogs, docs, briefs e planos existentes podem ser lidos para
preencher fatos e evitar repetição. A rotina de leitura deve ser somente de
consulta. Ela não deve criar, editar ou migrar arquivos fora de `Company.md` e
`.mvpfy/`.
