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
  options:
    - "Registrar e acompanhar o contato"
    - "Gerar um resumo para o cliente"
    - "Automatizar a distribuição"
    - "Avançar"
    - "Conversar mais sobre este tema"
  allow_free_text: true
confidence: medium
document_patch:
  sections: []
```

Cada especialista escreve somente no próprio domínio e aponta as seções
afetadas. A orquestradora integra os retornos, elimina perguntas repetidas e
decide qual pergunta aparece ao usuário. O retorno de cada especialista deve
fornecer exatamente três opções prontas. A orquestradora acrescenta as opções
4 e 5 com os rótulos fixos `Avançar` e `Conversar mais sobre este tema`.
