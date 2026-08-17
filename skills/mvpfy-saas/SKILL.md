---
name: mvpfy-saas
description: Define conta, isolamento, onboarding, ativação, assinatura, cobrança, suporte e retenção do primeiro software como serviço.
---

# Definir o modelo SaaS

Descubra quem cria e é titular da conta, quem convida outras pessoas, como os
dados ficam separados, como o cliente chega ao primeiro valor e qual evento
mostra ativação. Defina unidade de valor, unidade de cobrança, ciclo, limites,
cancelamento, inadimplência e acesso após encerramento.

Antes de seguir para cobrança ou arquitetura, confirme se o produto será
multitenante. Use `saas.tenancy-model` como a primeira pergunta fechada depois
da ideia inicial. Se for multitenante, leia
[multitenancy.md](references/multitenancy.md) e faça no máximo uma pergunta
adicional sobre unidade do tenant e administração. Os demais campos são
recomendações derivadas do contexto.

Prefira operação assistida quando ela reduzir construção sem esconder o
aprendizado. Liberação de conta, implantação, cobrança ou suporte podem ser
manuais no começo, desde que exista responsável e registro no plano.

Não presuma multitenancy nem o descarte desse modelo. Pergunte primeiro. Depois,
compare aplicação compartilhada com separação lógica e instância dedicada
segundo cliente, contrato, segurança, desempenho e custo.

Quando Laravel for escolhido, avalie o suporte de Teams da solução Laravel
adotada para representar equipes, membros, convites e papéis. Registre no plano
se Teams será usado, adaptado ou substituído e explique o efeito da escolha.

Leia [saas-lifecycle.md](references/saas-lifecycle.md) para os estados do
cliente e para os campos mínimos do serviço recorrente.
