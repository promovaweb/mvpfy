# Política da entrevista

## Entrada inicial

Antes da primeira pergunta fechada, receba um texto livre guiado da ideia do
SaaS e do MVP. Use uma orientação única, como:

> Conte, em um único texto, qual SaaS você imagina, qual é seu público, qual
> problema resolve e quais módulos, recursos ou integrações você já pensou.

Essa entrada pode mencionar automações e itens futuros. A pessoa pode enviar
várias mensagens. Acolha e salve cada uma, acumulando o conteúdo em
`initial_idea`, e ofereça sempre `4. Continuar para as perguntas` antes de
iniciar a entrevista.

Extraia esses elementos como candidatos. Um candidato é algo citado para
investigação, não uma funcionalidade aprovada. A fila deve começar pelos itens
que ajudam a confirmar problema, público, jornada e limite da versão 1.0.

## Pergunta obrigatória sobre multitenancy

Depois de salvar a entrada inicial e antes da primeira pergunta comum, confirme
explicitamente o modelo de atendimento:

```text
O sistema atenderá várias empresas ou equipes separadas dentro da mesma aplicação?
1. Sim. Vários clientes usarão a mesma aplicação, com dados separados.
2. Não. Cada cliente terá uma instalação ou ambiente próprio.
3. Ainda não sei. Quero comparar os dois modelos.
4. Avançar
5. Conversar mais sobre este tema
```

Não pule essa pergunta porque a mensagem inicial usou “multitenante” ou
“multi-tenant”. A escolha precisa aparecer como resposta persistida em
`saas.tenancy-model`.

Quando a resposta for a opção 1, abra a trilha multitenante. Pergunte uma coisa
por turno, somente até registrar:

1. O que representa um tenant: empresa, equipe, filial, cliente de uma
   agência ou outro grupo.
2. Qual pessoa cria o tenant e administra seu espaço.
3. Como membros entram: convite do administrador, cadastro próprio ou
   implantação acompanhada.
4. Uma pessoa pode participar de mais de um tenant?
5. Quais papéis precisam existir dentro do tenant?
6. O que precisa ficar invisível para os outros tenants?
7. O banco será compartilhado com separação lógica ou dedicado por tenant?
8. Como o tenant será criado, configurado e levado ao primeiro valor?

Se a resposta for a opção 2, pergunte apenas o modelo de instalação e o motivo
da separação. Se for a opção 3, explique a diferença prática antes de pedir uma
nova escolha. Toda pergunta mantém três opções, `Avançar` e `Conversar mais
sobre este tema`.

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

1. Modelo multitenante ou instalação separada.
2. Unidade, titularidade e membros do tenant, quando aplicável.
3. Situação e ideia.
4. Problema principal.
5. Pessoa mais afetada.
6. Alternativa usada hoje.
7. Resultado esperado.
8. Jornada principal.
9. Recurso indispensável.
10. Usuário, comprador e pagador.
11. Primeiro valor do SaaS.
12. Concorrentes ou alternativas.
13. Cobrança e ticket.
14. Volume inicial e custo.
15. Aquisição e venda.
16. Nome e posição da marca.

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
