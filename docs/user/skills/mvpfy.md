# A orquestradora: `mvpfy`

`mvpfy` é a orquestradora e o único ponto de conversa. Antes de escolher a
primeira pergunta, ela chama `mvpfy-context` para verificar se o projeto já
tem material aproveitável. Depois, em vez de tentar saber tudo sobre produto,
preço ou tecnologia, ela lê o material existente e chama a especialista certa.
Também controla a entrevista e reúne o resultado no `MVP.md`.

## Quando usar

Use `$mvpfy` para começar, continuar ou pausar a entrevista, para corrigir uma
escolha ou revisar uma área e para gerar o `MVP.md`.

## De onde ela parte

- `.mvpfy/existing-project.json`, renovado no setup e no início da conversa.
- `.mvpfy/config.yaml`.
- `.mvpfy/state.json`.
- `.mvpfy/answers.jsonl`.
- `MVP.md`.
- template atual.
- specs, backlogs, briefs, docs, tickets e planos já existentes no projeto
  consumidor, em modo somente leitura, resumidos pela
  `mvpfy-context` e consultados quando necessário.

Esses arquivos servem como referência. A orquestradora pode usar uma
informação já registrada para evitar uma pergunta, mas não escreve nem corrige
esses documentos.

Quando o relatório encontra manifestos e código, ele pode sugerir a stack e
confirmar que existe uma base técnica. Quando encontra uma spec, ele aponta o
arquivo e um trecho curto para orientar a leitura. O código sozinho não define
o problema, o público, o pagador ou o escopo do MVP.

## Como ela conduz a conversa

1. Confere se o projeto é um primeiro SaaS.
2. Reaproveita o material já disponível.
3. Verifica se o template precisa de atualização.
4. Escolhe o ponto que mais afeta o plano.
5. Exibe exatamente uma pergunta principal.
6. Registra a resposta antes de prosseguir.
7. Recalcula as áreas cobertas e as mudanças de direção.
8. Chama a especialista adequada.

## Formato obrigatório de cada resposta

Uma resposta pode conter confirmação, explicação curta e opções, mas somente
uma pergunta a responder. Cada resposta termina com três opções prontas, `4.
Avançar` e `5. Conversar mais sobre este tema`. A skill não apresenta
formulário, duas perguntas encadeadas ou “responda A e B”. Se duas áreas estiverem
pendentes, escolha a mais importante e deixe a outra para o próximo turno.

`Avançar` encerra a etapa com o entendimento atual. `Conversar mais sobre este
tema` abre texto livre sobre a mesma pergunta. A conversa pode continuar por
mais de uma mensagem, sem uma segunda pergunta principal no mesmo turno.

## Limite sobre fontes externas ao MVPFy

Specs, backlogs e documentos do projeto podem ser lidos como referência, mas o
MVPFy não altera, renomeia, remove nem migra esses arquivos. O único
documento final que ele escreve é `MVP.md`, além do estado em `.mvpfy/`.

## Revisão da documentação e do ebook

O guia do usuário e a referência técnica são percursos diferentes. A
orquestradora pode consultar a documentação técnica para entender o produto,
mas o ebook do usuário usa somente as páginas listadas em
`docs/user/reading-order.txt`.

Antes de publicar uma nova edição, leia as páginas completas. Confirme que os
exemplos servem a um leitor leigo, que a prosa explica a razão das orientações e
que listas e tabelas não substituem o raciocínio. O padrão visual dos projetos
do Hub serve como referência de organização, não como texto para copiar.
