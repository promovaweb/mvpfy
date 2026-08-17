# Primeiro MVP: um percurso completo

Este exemplo é didático. Ele não descreve um produto real do MVPFy. A ideia é
uma ferramenta para pequenas agências acompanharem leads recebidos por
WhatsApp, formulário e Instagram.

## 1. Comece com uma frase

Você pode iniciar assim:

```text
Quero criar um sistema para pequenas agências que perdem leads dos clientes.
```

Ou pode enviar um contexto completo de uma vez:

```text
Quero um SaaS para pequenas agências acompanharem leads dos clientes. A
agência paga, o cliente acompanha apenas os próprios contatos e o MVP deve
receber o lead, atribuí-lo a alguém e mostrar um resumo. Já imagino CRM,
integração com WhatsApp e um painel. Quero usar Laravel em uma VPS e cobrar
mensalidade.
```

O agente analisa esse texto inteiro antes de perguntar. CRM, WhatsApp e painel
ficam como candidatos para investigação, enquanto problema, público, jornada,
tecnologia e cobrança já podem preencher partes do plano. Você pode mandar
mais mensagens antes de escolher `4. Continuar para as perguntas`.

O MVPFy não transforma essa frase diretamente em módulos. Ele começa
entendendo a situação.

## 2. Responda uma pergunta por vez

Uma conversa possível:

```text
MVPFy: Em qual situação o problema aparece com mais frequência?
1. A equipe recebe contatos em vários canais e perde o acompanhamento.
2. A equipe demora para responder ao primeiro contato.
3. A equipe não consegue mostrar resultados para o cliente.
4. Avançar
5. Conversar mais sobre este tema

Você: 1

MVPFy: resposta salva. Quem usaria o produto no trabalho diário?
1. A equipe da agência.
2. O cliente da agência.
3. A equipe e o cliente, com acessos diferentes.
4. Avançar
5. Conversar mais sobre este tema
```

O texto “resposta salva” representa o comportamento obrigatório. A pergunta
seguinte só aparece depois do registro no `answers.jsonl` e da atualização do
estado.

Se você escolher 5, pode explicar um caso, perguntar o significado de uma
opção ou trazer uma resposta mais complexa. O MVPFy conversa sobre a mesma
questão, salva cada turno e continua exibindo no máximo uma pergunta por vez.

## 3. Dê respostas ricas quando quiser

Você não precisa escolher apenas um número. Esta resposta também é válida:

```text
A agência paga. Cada cliente deve acompanhar somente os próprios leads, e a
equipe da agência precisa administrar tudo em uma conta.
```

Essa frase pode preencher comprador, pagador, titular da conta, usuários,
permissões e isolamento entre clientes. O MVPFy não deve perguntar novamente
quem paga.

## 4. Defina a jornada principal

Depois de entender o problema, a conversa reduz o produto a um fluxo. No
exemplo, uma jornada possível é:

1. A agência cria uma conta.
2. A equipe cadastra um cliente.
3. O sistema recebe ou registra um lead.
4. A equipe atribui o lead a alguém.
5. O cliente acompanha o andamento.
6. A agência mostra o resultado em um resumo simples.

O MVPFy pergunta quais etapas são indispensáveis. Um aplicativo móvel, um
marketplace e automações avançadas podem ficar para depois se não forem
necessários para provar essa jornada.

## 5. Defina o SaaS

O plano precisa registrar que a agência é a conta pagadora, que cada cliente
tem acesso limitado e que o primeiro valor ocorre quando um lead é registrado,
atribuído e acompanhado. Também precisa dizer se o teste é gratuito, se a
implantação será assistida e qual evento confirma ativação.

## 6. Pesquise mercado e preço

Se você fornecer URLs de concorrentes, o especialista de mercado consulta
planos, limites e preços atuais e registra fonte e data. Se não houver uma
referência direta, a conversa pergunta quanto a agência gasta hoje com planilha,
horas de acompanhamento e perda de leads.

O especialista de preço transforma esses dados em uma faixa inicial, não em uma
promessa. O documento pode trazer um cenário enxuto, um cenário base e um
cenário de crescimento.

## 7. Gere o MVP.md

Quando você pedir “gerar o documento”, o MVPFy consolida todas as áreas. Uma
versão inicial pode ter estado `preliminary` e mostrar `Pendente` nas lacunas.
Quando houver problema, público, jornada, escopo, modelo SaaS, preço,
tecnologia, aquisição, métricas e validações suficientes, o documento pode
passar a `ready`.

## 8. O que você entrega às equipes

O `MVP.md` permite que cada equipe comece do mesmo entendimento:

- produto recebe escopo e critérios de aceite;
- desenvolvimento recebe arquitetura, contas e integrações;
- website recebe público, promessa e oferta;
- marca recebe posicionamento, nomes e tom;
- marketing recebe canais, conteúdo e captação;
- vendas recebe preço, processo e objeções;
- operação recebe onboarding, suporte e métricas.
