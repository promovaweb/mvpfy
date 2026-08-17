# Trilha multitenante

Use esta referência quando a resposta de `saas.tenancy-model` indicar que uma
aplicação atenderá várias empresas, equipes ou grupos separados.

## Objetivo

Descrever o limite de cada tenant antes de recomendar arquitetura, permissões,
preço ou onboarding. “Ter várias empresas” não basta. O plano precisa explicar
qual unidade recebe dados, membros, cobrança e configuração.

## Ordem das perguntas

Faça uma pergunta por turno e mantenha três opções, `Avançar` e `Conversar mais
sobre este tema`.

1. O tenant representa uma empresa, uma equipe, uma filial, um cliente de uma
   agência ou outro grupo?
2. Qual pessoa cria o tenant e administra seu espaço?
3. Como as pessoas entram: convite do administrador, cadastro próprio ou
   implantação acompanhada?
4. Uma pessoa pode participar de mais de um tenant?
5. Quais papéis precisam existir dentro do tenant?
6. O que precisa ficar invisível para os outros tenants?
7. O banco será compartilhado com separação lógica ou dedicado por tenant?
8. Como o tenant será criado, configurado e levado ao primeiro valor?

Pare quando as respostas permitirem descrever titularidade, associação de
membros, acesso, isolamento, provisionamento e custo. Não crie perguntas sobre
customizações ou domínios próprios antes de saber se isso faz parte da primeira
versão.

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
