# Trilha multitenante

Use esta referência quando a resposta de `saas.tenancy-model` indicar que uma
aplicação atenderá várias empresas, equipes ou grupos separados.

## Objetivo

Descrever o limite de cada tenant antes de recomendar arquitetura, permissões,
preço ou onboarding. “Ter várias empresas” não basta. O plano precisa explicar
qual unidade recebe dados, membros, cobrança e configuração.

## Pergunta curta

Faça uma pergunta por turno e mantenha três opções, `Avançar` e `Conversar mais
sobre este tema`. A pergunta obrigatória sobre o modelo de atendimento já
resolve a maior parte do desenho. Se ainda faltar contexto, faça no máximo uma
pergunta adicional, combinando:

> O que representa cada espaço do cliente e quem deve administrá-lo?
> 1. Uma empresa, administrada por uma pessoa responsável.
> 2. Uma equipe ou unidade, administrada por um gestor.
> 3. Ainda não sei.
> 4. Avançar
> 5. Conversar mais sobre este tema

Não faça perguntas separadas sobre membros, papéis, acesso entre espaços,
isolamento, banco ou provisionamento durante o MVP. Registre esses pontos como
recomendações derivadas do modelo escolhido. Não abra perguntas sobre
customizações ou domínios próprios antes de confirmar que pertencem à versão
1.0.

## Laravel

Quando Laravel for a stack escolhida, avalie o suporte de Teams da solução
Laravel adotada para representar equipes, membros, convites e papéis. Teams não
substitui a análise do limite de dados. O `MVP.md` ainda precisa registrar a
separação entre tenants, as regras de autorização e o caminho de cada consulta.

Se a equipe não usar Teams, registre o motivo e descreva a alternativa. A skill
recomenda a base técnica, mas não implementa o modelo.

## Campos do estado

Registre a escolha com `--tenancy-data` no `record-answer.mjs`:

```json
{
  "status": "confirmed",
  "model": "multitenant_shared",
  "tenant_unit": "company",
  "owner_role": "account_admin",
  "membership_model": "invitation",
  "cross_tenant_membership": "allowed",
  "isolation_strategy": "logical",
  "database_strategy": "shared_postgresql",
  "provisioning": "assisted"
}
```
