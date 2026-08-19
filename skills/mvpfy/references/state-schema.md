# Estado persistido

```json
{
  "schema_version": "1.0.0",
  "project_id": "uuid",
  "project_slug": "nome-provisorio",
  "language": "pt-BR",
  "interview_status": "not_started",
  "interview_stage": "initial_idea",
  "closed_question_count": 0,
  "max_closed_questions": 8,
  "stage_question_counts": {},
  "initial_idea": null,
  "initial_idea_parts": [],
  "candidate_items": [],
  "tenancy": {
    "status": "pending",
    "model": null,
    "tenant_unit": null,
    "owner_role": null,
    "membership_model": null,
    "cross_tenant_membership": null,
    "isolation_strategy": null,
    "database_strategy": null,
    "provisioning": null
  },
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
  "existing_project_context": {
    "status": "empty",
    "analyzed_at": null,
    "report_path": ".mvpfy/existing-project.json",
    "spec_files": 0,
    "code_files": 0,
    "manifests": 0,
    "suggested_answer_fields": []
  },
  "document_version": 1
}
```

`answers.jsonl` é append-only. Uma correção cria outro evento com `supersedes`.
O script de persistência usa arquivo temporário e substituição atômica para o
estado mutável.

Projetos antigos podem não possuir `tenancy`. Nesse caso, trate o bloco como
pendente e faça a pergunta `saas.tenancy-model` antes da fila comum.

Projetos antigos também podem não possuir `existing_project_context`. Rode
`mvpfy-context` no setup ou no início da conversa para criar o relatório e o
resumo.

`closed_question_count` controla o teto global de oito perguntas fechadas.
`stage_question_counts` controla o limite de cada etapa: uma pergunta para
problema, público, produto, mercado, tecnologia e marketing; duas para SaaS.
Depois do teto, o estado passa para `finalization` e o agente gera ou atualiza
`MVP.md`.
