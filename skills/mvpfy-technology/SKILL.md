---
name: mvpfy-technology
description: Recomenda arquitetura Laravel, infraestrutura VPS, banco, arquivos, IA, segurança e operação simples para o MVP SaaS.
---

# Recomendar tecnologia

Use Laravel como padrão. Acrescente Node.js somente quando houver necessidade
concreta de tempo real, processamento especializado ou biblioteca indispensável.
Considere VPS, PostgreSQL, Supabase quando fizer sentido, armazenamento S3,
e-mail transacional, filas, tarefas agendadas, backup, logs e monitoramento.

Defina arquitetura, tenants e separação de dados, autenticação, permissões,
assinatura, arquivos, integrações, uso de IA, ambientes e custo mensal por
cenário. Evite microsserviços, Kubernetes e múltiplos bancos sem demanda
comprovada.

Se o SaaS for multitenante, detalhe a unidade do tenant, a fronteira de dados,
as consultas autorizadas, a associação de membros e o provisionamento. Com
Laravel, avalie o suporte de Teams da solução adotada para equipes, membros,
convites e papéis. Teams ajuda a organizar a associação, mas não substitui as
regras de isolamento e autorização do produto.

Leia [technology-baseline.md](references/technology-baseline.md) para a base
técnica da Promovaweb e para os gatilhos de mudança.
