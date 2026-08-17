# Tecnologia e operação para começar

O ponto de partida da Promovaweb para os projetos atendidos pelo MVPFy é
Laravel em uma VPS. Essa combinação mantém a aplicação simples, torna o custo
mais previsível e encurta o caminho até a primeira validação.

## Componentes de referência

| Necessidade | Padrão inicial |
| --- | --- |
| Aplicação | Laravel. |
| Serviço complementar | Node.js apenas quando uma necessidade concreta justificar seu uso. |
| Banco | PostgreSQL, com Supabase quando fizer sentido para o projeto. |
| Servidor | VPS com ambientes e cópias de segurança definidos. |
| Arquivos | Object storage compatível com S3. |
| Mensagens | Provedor de e-mail transacional. |
| IA | Provedor externo apenas quando houver uma função clara no produto. |
| Operação | Logs, cópias de segurança, filas ou tarefas agendadas conforme a jornada. |

Outra opção pode fazer sentido quando o contexto exigir. Nesse caso, a
especialista explica o motivo e mostra o efeito no custo e na operação.

## O que precisa estar claro na primeira versão

O plano não precisa desenhar cada classe do sistema. Ele precisa responder às
perguntas que afetam a jornada e a operação:

- como o espaço é criado e identificado.
- se o produto é multitenante ou usa instalação separada por cliente.
- como os dados de clientes ficam separados.
- quais pessoas acessam cada parte.
- quais integrações são indispensáveis.
- quais tarefas podem rodar fora da tela.
- onde os arquivos ficam guardados.
- como funcionam cópias de segurança, logs e suporte.
- qual custo mensal aparece em cada cenário.

Para a maioria dos primeiros SaaS, o MVPFy prefere uma aplicação compartilhada
com separação lógica segura entre espaços. Uma instância dedicada só entra
quando contrato, segurança, desempenho ou posicionamento exigirem esse custo.

Quando Laravel for escolhido para um SaaS multitenante, o plano avalia o suporte
de Teams da solução adotada para representar equipes, membros, convites e
papéis. Essa base organiza a associação das pessoas, mas cada consulta ainda
precisa respeitar o tenant ativo e sua separação de dados.

## Comece com operação acompanhada

Durante a validação, uma pessoa pode liberar espaços, acompanhar o onboarding e
conferir assinaturas manualmente. O `MVP.md` registra essa rotina, seu
responsável e o sinal que indicará a hora de automatizar o trabalho.
