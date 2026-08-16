# Estado persistido

```json
{
  "schema_version": "1.0.0",
  "project_id": "uuid",
  "project_slug": "nome-provisorio",
  "language": "pt-BR",
  "interview_status": "not_started",
  "active_domain": "problem",
  "last_question_id": null,
  "answered_question_ids": [],
  "facts": [],
  "choices": [],
  "assumptions": [],
  "recommendations": [],
  "gaps": [],
  "conflicts": [],
  "section_status": {},
  "research_status": {},
  "document_version": 1
}
```

`answers.jsonl` é append-only. Uma correção cria outro evento com `supersedes`.
O script de persistência usa arquivo temporário e substituição atômica para o
estado mutável.
