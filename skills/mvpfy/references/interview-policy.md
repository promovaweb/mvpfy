# Política da entrevista

## Entrada inicial

Antes da primeira pergunta fechada, receba um texto livre guiado da ideia do
SaaS e do MVP. Use uma orientação única, como:

> Conte, em um único texto, qual SaaS você imagina, para quem ele serve, qual
> problema resolve e quais módulos, recursos ou integrações você já pensou.

Essa entrada pode mencionar automações e itens futuros. A pessoa pode enviar
várias mensagens. Acolha e salve cada uma, acumulando o conteúdo em
`initial_idea`, e ofereça sempre `4. Continuar para as perguntas` antes de
iniciar a entrevista.

Extraia esses elementos como candidatos. Um candidato é algo citado para
investigação, não uma funcionalidade aprovada. A fila deve começar pelos itens
que ajudam a confirmar problema, público, jornada e limite da versão 1.0.

Se uma mensagem já trouxer problema, público, jornada, módulos, preço e
tecnologia, registre todos esses campos antes de escrever a próxima pergunta.
Não repita nenhum deles. A próxima pergunta trata somente da lacuna que
continuar relevante para o MVP.

## Perguntas

Faça exatamente uma pergunta principal por turno. Cada turno de investigação
deve exibir cinco opções nesta ordem: três respostas prontas, `4. Avançar` e
`5. Conversar mais sobre este tema`. Uma mensagem pode confirmar o
entendimento anterior, mas não pode pedir duas informações. Na entrada
inicial, as três primeiras opções podem orientar a continuação do relato; a
opção 4 sempre deve continuar para as perguntas e a opção 5 deve acolher mais
texto sobre a ideia.

1. Situação e ideia.
2. Problema principal.
3. Pessoa mais afetada.
4. Alternativa usada hoje.
5. Resultado esperado.
6. Jornada principal.
7. Recurso indispensável.
8. Usuário, comprador e pagador.
9. Primeiro valor do SaaS.
10. Concorrentes ou alternativas.
11. Cobrança e ticket.
12. Volume inicial e custo.
13. Aquisição e venda.
14. Nome e posição da marca.

## Prioridade

Priorize a lacuna que muda problema, público, jornada, preço ou operação. Uma
resposta rica pode cobrir várias áreas. Não reabra uma resposta clara apenas
para completar uma tabela.

Faça uma pergunta adicional quando houver contradição, público sem prioridade,
mais de uma jornada central, preço sem unidade de valor ou arquitetura sem
volume previsto. Se a pessoa disser “não sei”, registre a hipótese necessária
e siga para uma recomendação curta.

Antes de criar a pergunta, leia fontes já existentes no projeto consumidor,
como `spec.md`, `specs/`, `backlog/`, `docs/`, briefs, tickets e planos. Use o
conteúdo claro como contexto preenchido. Não crie nem edite esses arquivos.

Se a ideia inicial citar “CRM, financeiro, aplicativo e agente de IA”, não
transforme a lista em quatro requisitos. Escolha uma única pergunta para
entender qual resultado deve ser validado primeiro. Os outros itens continuam
como candidatos com estado pendente.

## Estado

Antes de cada pergunta, leia o estado e o documento. Depois de cada resposta,
registre o evento, atualize os campos afetados e só então mostre a próxima
pergunta. Correções geram um novo evento com referência ao item anterior.

O texto novo sempre passa por análise completa antes da seleção da pergunta.
Uma resposta longa pode remover várias lacunas de uma só vez.

## Verificação da saída

Antes de enviar a mensagem, confirme:

- existe no máximo uma pergunta que pede resposta;
- existem exatamente três opções prontas, mais `Avançar` e a conversa livre;
- `Avançar` não solicita informação nova;
- a opção de conversa mantém o mesmo tema e não introduz uma segunda pergunta;
- nenhuma informação disponível nas fontes do projeto está sendo solicitada
  novamente.
