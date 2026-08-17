# Primeiro MVP: do relato ao plano

Este exemplo acompanha uma ideia fictícia. Ele não descreve um produto real do
MVPFy. A proposta é uma ferramenta para pequenas agências acompanharem leads
recebidos por WhatsApp, formulário e Instagram.

## Conte a ideia do jeito que ela vier

Você pode começar com uma frase curta:

```text
Quero criar um sistema para pequenas agências que perdem leads dos clientes.
```

Também pode enviar tudo o que já imaginou em uma única mensagem:

```text
Quero um SaaS para pequenas agências acompanharem leads dos clientes. A
agência paga, o cliente acompanha apenas os próprios contatos e o MVP deve
receber o lead, atribuí-lo a alguém e mostrar um resumo. Já imagino CRM,
integração com WhatsApp e um painel. Quero usar Laravel em uma VPS e cobrar
mensalidade.
```

O agente lê a mensagem inteira antes de perguntar. CRM, WhatsApp e painel
entram como ideias para examinar. Problema, público, jornada, tecnologia e
cobrança podem receber informações desde o primeiro relato.

Você também pode mandar outra mensagem antes de escolher `4. Avançar`. O
MVPFy acolhe esse complemento e só começa a entrevista fechada depois que você
indicar que terminou de apresentar a ideia.

O ponto de partida não é transformar cada recurso citado em módulo. Primeiro,
o MVPFy tenta entender a situação que faz alguém procurar o produto.

## Veja como uma pergunta aparece

Uma conversa possível:

```text
MVPFy: Em qual situação o problema aparece com mais frequência?
1. A equipe recebe contatos em vários canais e perde o acompanhamento.
2. A equipe demora para responder ao primeiro contato.
3. A equipe não consegue mostrar resultados para o cliente.
4. Avançar
5. Conversar mais sobre este tema

Você: 1

MVPFy: resposta salva. Qual pessoa usaria o produto no trabalho diário?
1. A equipe da agência.
2. O cliente da agência.
3. A equipe e o cliente, com acessos diferentes.
4. Avançar
5. Conversar mais sobre este tema
```

O texto “resposta salva” representa uma etapa interna obrigatória. A próxima
pergunta só aparece depois do registro no `answers.jsonl` e da atualização do
estado do projeto.

Se você escolher 5, pode explicar um caso, perguntar o significado de uma
opção ou enviar uma resposta complexa. O MVPFy continua conversando sobre o
mesmo assunto, salva cada turno e mostra no máximo uma pergunta principal.

## Envie mais contexto quando precisar

Você não precisa escolher apenas um número. Esta resposta também é válida:

```text
A agência paga. Cada cliente deve acompanhar somente os próprios leads, e a
equipe da agência precisa administrar tudo em um espaço.
```

Essa frase já informa a empresa cliente, a pessoa responsável pelo pagamento, o titular do espaço e as pessoas usuárias,
permissões e separação entre clientes. O MVPFy aproveita essas informações e
não pergunta novamente qual empresa fará o pagamento.

## Transforme a ideia em uma jornada

Depois de entender o problema, a conversa procura um caminho completo para o
primeiro valor. No exemplo, o fluxo poderia ser:

1. A agência cria um espaço.
2. A equipe cadastra um cliente.
3. O sistema recebe ou registra um lead.
4. A equipe atribui o lead a alguém.
5. O cliente acompanha o andamento.
6. A agência mostra o resultado em um resumo simples.

O MVPFy pergunta quais dessas etapas precisam funcionar na primeira versão. Um
aplicativo móvel, um marketplace e automações avançadas podem ficar para depois
se não ajudarem a provar esse caminho.

## Explique como o serviço começa

O plano registra a agência como espaço pagadora e limita o acesso de cada
cliente aos próprios leads. Também descreve o primeiro valor: registrar um
lead, atribuí-lo e acompanhar seu andamento. A conversa ainda trata do teste,
da implantação assistida e do sinal que confirma a ativação.

## Compare alternativas e monte uma faixa de preço

Se você fornecer URLs de concorrentes, a especialista de mercado consulta os
planos, limites e preços publicados e registra a fonte e a data. Sem uma
referência direta, a conversa olha para o que a agência gasta hoje com
planilhas, horas de acompanhamento e leads perdidos.

A especialista de preço transforma esses dados em uma faixa inicial. Isso é uma
hipótese comercial, não uma promessa. O documento pode comparar um cenário
mínimo, um cenário base e um cenário de crescimento.

## Gere o `MVP.md`

Quando você pedir “gerar o documento”, o MVPFy reúne as áreas já trabalhadas.
Uma primeira versão pode ter estado `preliminary` e indicar `Pendente` onde
faltarem informações. Depois, com problema, público, jornada, escopo, modelo
SaaS, preço, tecnologia, aquisição, métricas e comprovações suficientes, o
documento pode receber o estado `ready`.

## Use o plano com as equipes

O `MVP.md` permite que as equipes partam do mesmo entendimento:

- produto encontra o escopo e as condições de aceite.
- desenvolvimento encontra arquitetura, espaços e integrações.
- website encontra público, promessa e oferta.
- marca encontra posicionamento, nomes e tom.
- marketing encontra canais, conteúdo e captação.
- vendas encontra preço, processo e objeções.
- operação encontra onboarding, suporte e métricas.
