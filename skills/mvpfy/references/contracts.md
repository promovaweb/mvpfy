# Contrato entre a orquestradora e as especialistas

## Entrada

```yaml
project_id: identificador-estavel
current_request: pedido-atual
known_facts: []
confirmed_choices: []
assumptions: []
open_questions: []
conflicts: []
affected_sections: []
interview_mode: full | focused | review | generate
language: pt-BR
```

## Saída

```yaml
domain: product
new_facts: []
new_choices: []
new_assumptions: []
recommendations: []
resolved_fields: []
remaining_gaps: []
conflicts: []
next_question:
  id: product.primary-journey
  text: "Qual resultado precisa funcionar do começo ao fim?"
  options: []
  allow_free_text: true
confidence: medium
document_patch:
  sections: []
```

Cada especialista escreve somente no próprio domínio e aponta as seções
afetadas. A orquestradora integra os retornos, elimina perguntas repetidas e
decide qual pergunta aparece ao usuário.
