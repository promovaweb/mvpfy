# Tecnologia e operação recomendadas

O padrão inicial da Promovaweb para os projetos atendidos pelo MVPFy é Laravel
em uma VPS. A recomendação favorece uma aplicação simples, custo previsível e
um caminho curto até a primeira validação.

## Componentes de referência

| Necessidade | Padrão inicial |
| --- | --- |
| Aplicação | Laravel. |
| Serviço complementar | Node.js somente com justificativa concreta. |
| Banco | PostgreSQL, com Supabase quando fizer sentido ao projeto. |
| Servidor | VPS com ambientes e backups definidos. |
| Arquivos | Object storage compatível com S3. |
| Mensagens | Provedor transacional de e-mail. |
| IA | Provedor externo apenas quando houver função de produto clara. |
| Operação | Logs, backup, filas ou tarefas agendadas conforme a jornada. |

O especialista pode recomendar outra opção quando o contexto exigir, mas deve
explicar o motivo e o efeito no custo e na operação.

## O que precisa ser decidido no MVP

O plano não precisa desenhar cada classe do sistema. Ele precisa esclarecer:

- como a conta é criada e identificada;
- como os dados de clientes ficam separados;
- quem pode acessar cada parte;
- quais integrações são indispensáveis;
- quais tarefas podem ser assíncronas;
- onde arquivos são guardados;
- como backup, logs e suporte funcionam;
- qual custo mensal aparece em cada cenário.

Para a maioria dos primeiros SaaS, o MVPFy prefere uma aplicação compartilhada
com separação lógica segura entre contas. Instâncias dedicadas só entram com
uma justificativa de contrato, segurança, desempenho ou posicionamento.

## Operação assistida

Durante a validação, liberar conta, acompanhar onboarding ou conferir uma
assinatura manualmente pode ser aceitável. O `MVP.md` registra o processo,
a pessoa responsável e o momento em que a automação passa a valer a pena.
