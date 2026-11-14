# A tecnologia: `mvpfy-technology`

Esta especialista traduz a jornada do MVP em uma arquitetura pequena, operável
e compatível com o momento da empresa. A tecnologia deve apoiar o primeiro
aprendizado sem criar uma operação maior do que o produto precisa.

## Ponto de partida recomendado

- Laravel como aplicação principal.
- Node.js somente com justificativa concreta.
- PostgreSQL, com Supabase quando fizer sentido.
- VPS.
- armazenamento compatível com S3.
- e-mail transacional.
- IA externa apenas com função de produto clara.
- backups, logs e tarefas agendadas conforme necessidade.

## O que entra no `MVP.md`

O `MVP.md` recebe a arquitetura e o modelo conceitual de dados, a
autenticação, os papéis, os espaços e o isolamento. Recebe também as
integrações, as filas, os arquivos, a segurança básica, a observabilidade e o
custo mensal por cenário.

## Um exemplo

Para a ferramenta de leads, a arquitetura precisa separar agências e clientes,
registrar mudanças de status e enviar notificações. Microsserviços e Kubernetes
podem esperar até existir uma necessidade real para esse custo.

## Onde termina este trabalho

Esta especialista não implementa o software, não compra a VPS e não coloca a
stack padrão acima do problema do produto.
