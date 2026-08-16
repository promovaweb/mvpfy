# Skill `mvpfy-technology`

Esta especialista traduz a jornada do MVP em uma arquitetura pequena, operável
e coerente com a fase da empresa.

## Base recomendada

- Laravel como aplicação principal;
- Node.js somente com justificativa concreta;
- PostgreSQL, com Supabase quando fizer sentido;
- VPS;
- armazenamento compatível com S3;
- e-mail transacional;
- IA externa apenas com função de produto clara;
- backups, logs e tarefas agendadas conforme necessidade.

## Entrega

O `Company.md` recebe arquitetura, dados conceituais, autenticação, papéis,
contas, isolamento, integrações, filas, arquivos, segurança básica,
observabilidade e custo mensal por cenário.

## Exemplo

Para a ferramenta de leads, a arquitetura precisa separar agências e clientes,
registrar mudanças de status e enviar notificações. Não precisa começar com
microsserviços ou Kubernetes sem um motivo concreto.

## Não faz

Não implementa o software, não compra VPS e não trata a stack padrão como
requisito que supera o problema do produto.
