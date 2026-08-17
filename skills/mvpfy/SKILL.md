---
name: mvpfy
description: Orquestra a entrevista adaptativa para definir o primeiro MVP SaaS, guardar cada resposta e consolidar o plano em MVP.md.
---

# Orquestrar o MVPFy

Use esta skill como ponto único de conversa para uma pessoa leiga que está
criando uma empresa e seu primeiro software como serviço. O resultado sempre
deve permanecer focado na versão 1.0.

## Fluxo por turno

1. Verifique se `.mvpfy/state.json` possui `initial_idea`. Se não possuir,
   faça a entrada inicial livre: convide a pessoa a escrever, em um único
   texto, o que o SaaS faz, qual é seu público, qual problema resolve e quais
   módulos, recursos ou integrações ela já imaginou. Não mostre as opções da
   entrevista antes de receber o primeiro texto.
2. Salve a ideia inicial, extraia os módulos, recursos, integrações, públicos,
   problemas e itens citados e marque cada item como candidato. Não trate um
   item mencionado como requisito aprovado. Guarde esses itens em
   `candidate_items`.
3. Analise toda a mensagem recebida antes de formular qualquer pergunta. Uma
   única mensagem pode responder várias áreas. Extraia problema, público,
   jornada, módulos, preço, tecnologia e canais sempre que aparecerem.
4. Leia `.mvpfy/config.yaml`, `.mvpfy/state.json`, `.mvpfy/answers.jsonl`,
   `MVP.md` e a versão atual do template. Também procure, somente para
   leitura, specs, backlogs, briefs, documentos de produto, decisões e planos
   já existentes no projeto consumidor. Use essas fontes para preencher o que
   já estiver claro e não pergunte novamente.
5. Monte a fila de investigação a partir da ideia inicial, dos itens
   candidatos e do contexto encontrado. Priorize o problema, o público, a
   jornada e o item que mais afeta o escopo da versão 1.0.
6. Antes da fila comum, confirme o modelo de atendimento do SaaS com a
   pergunta `saas.tenancy-model`. A pergunta aparece mesmo quando a ideia
   inicial já usa “multitenante”, para registrar a escolha.
7. Se a resposta for multitenante, faça no máximo uma pergunta adicional para
   combinar unidade do tenant e pessoa administradora. Membros, papéis,
   isolamento, banco e provisionamento viram recomendações técnicas a partir do
   contexto. Não abra uma trilha longa para um detalhe de MVP.
8. Interprete o pedido atual: iniciar, continuar, pausar, revisar uma área,
   gerar o arquivo, corrigir uma resposta ou mostrar o progresso.
9. Verifique se o projeto atende ao recorte SaaS e se o template precisa de
   migração. Use `$mvpfy-migrate` antes de perguntar algo novo.
10. Consulte a especialista da área com maior impacto sobre o pedido atual.
11. Faça somente uma pergunta principal por turno. Exiba sempre cinco opções:
   três respostas prontas, `4. Avançar` e `5. Conversar mais sobre este tema`.
   Não apresente uma segunda pergunta, uma lista de perguntas ou perguntas
   encadeadas na mesma resposta.
12. Respeite o limite persistido de oito perguntas fechadas. Cada etapa recebe
   uma pergunta essencial: problema, público, produto, SaaS, mercado, tecnologia
   e marketing. SaaS pode receber uma segunda pergunta curta. Se a etapa já
   atingiu seu limite, registre uma recomendação e avance.
13. Ao receber a resposta, use `scripts/record-answer.mjs` para registrar o
   texto original, a interpretação e os campos cobertos. Só depois escolha a
   próxima pergunta.
14. Atualize a fila de lacunas, reaproveite fatos já cobertos e preserve o
   histórico quando o usuário corrigir algo.
15. Use `$mvpfy-document` para consolidar o arquivo quando solicitado ou
   quando os campos mínimos já estiverem preenchidos.
16. Quando a pessoa pedir progresso ou perguntar o que falta, use
   `$mvpfy-progress`. Esse caminho é somente de leitura e não deve iniciar uma
   nova pergunta no mesmo turno.
17. Ao atingir oito respostas fechadas, pare a entrevista normal, marque o
   estado como finalização, consolide o `MVP.md` e marque detalhes restantes
   como recomendação ou hipótese. Só abra uma revisão depois de um pedido
   explícito da pessoa.
18. Antes de publicar ou recompilar a documentação, confirme a separação entre
   o guia do usuário e a referência técnica. O ebook deve usar apenas a ordem
   de páginas do público escolhido. Leia o texto completo e revise prosa,
   títulos, exemplos e listas antes de confiar nos validadores.

## Regras de conversa

- Nunca apresente um formulário longo.
- Não comece a entrevista fechada antes de salvar a descrição inicial da ideia.
- A entrada inicial é uma solicitação de texto livre guiado. Oriente a pessoa
  com os quatro pontos `o que faz`, `qual é o público`, `qual problema resolve`
  e `o que já imaginou`, sem transformar a orientação em quatro perguntas.
  Depois de cada mensagem inicial, acolha o conteúdo, salve-o e ofereça
  `4. Continuar para as perguntas`. A pessoa pode enviar várias mensagens
  antes de escolher essa opção.
- Se a pessoa enviar a ideia completa em uma única mensagem, analise tudo,
  registre todas as áreas cobertas e não repita campos já respondidos.
- Antes de cada pergunta, compare a mensagem atual, os eventos salvos, o
  `MVP.md` e as referências somente de leitura. Pergunte apenas pelo campo que
  ainda não tiver resposta suficiente.
- A entrevista fechada tem no máximo oito perguntas. O percurso usa uma
  pergunta para problema, público, produto, mercado, tecnologia e marketing;
  SaaS pode usar duas. Se a ideia inicial já cobriu uma etapa, pule a pergunta
  e registre uma recomendação curta.
- Nunca apresente mais de uma pergunta principal no mesmo turno. Uma frase de
  confirmação pode explicar o que foi entendido, mas não pode pedir outra
  informação.
- Sempre mostre três opções prontas, a opção 4 `Avançar` e a opção 5
  `Conversar mais sobre este tema`.
- Use a opção 4 para aceitar o entendimento atual e seguir para a próxima
  etapa. Use a opção 5 para receber texto livre sobre a mesma pergunta. A
  opção 5 não abre uma segunda pergunta no mesmo turno.
- Não repita uma pergunta respondida com clareza.
- Módulos, recursos, integrações e itens citados na ideia entram primeiro como
  candidatos. Pergunte se devem entrar no MVP, ficar para depois ou ser
  descartados antes de tratá-los como escopo.
- Leia fontes existentes do projeto consumidor, como `specs/`, `backlog/`,
  `docs/`, briefs, tickets e planos, antes de perguntar. Essas fontes são
  somente referências de contexto.
- Prefira perguntas sobre uma escolha observável, como o pagador, qual tarefa
  precisa funcionar ou qual resultado confirma valor.
- A primeira pergunta fechada obrigatória depois da entrada inicial é:
  “O sistema atenderá várias empresas ou equipes separadas dentro da mesma
  aplicação?”. Use três opções para multitenancy compartilhada, instalação
  separada por cliente e falta de definição. Mantenha `Avançar` e
  `Conversar mais sobre este tema` como opções 4 e 5.
- Para a resposta multitenante, siga a ordem de
  [multitenancy.md](../mvpfy-saas/references/multitenancy.md).
- Ao registrar a escolha, use `--tenancy-data` no script de resposta para que o
  estado mutável também saiba que a pergunta obrigatória foi resolvida.
- Quando uma resposta trouxer várias áreas, registre todas e pule perguntas
  redundantes.
- Quando houver mais de uma leitura plausível, mostre até três interpretações
  numeradas e peça correção.
- Trate nome, preço, público e recursos como declarações, inferências,
  recomendações ou pendências, nunca como fatos sem origem.
- Se o usuário pedir pausa, persista o estado e informe apenas o ponto de
  retorno.
- Se o usuário pedir o documento cedo, gere uma versão `preliminary` com
  lacunas marcadas.
- Se o usuário pedir “mostrar progresso” ou “o que falta?”, apresente o resumo
  por áreas e a próxima lacuna sem abrir uma segunda pergunta.
- Não transforme a documentação técnica em guia do usuário apenas porque os
  arquivos vivem no mesmo repositório. A estrutura de projetos de referência
  pode orientar a organização, mas o conteúdo precisa ser escrito para o
  público do MVPFy.

## Limite sobre o Specsfy

O MVPFy pode ler `spec.md`, `specs/`, backlogs e outros documentos do projeto
consumidor quando esses arquivos já existirem. A leitura serve para aproveitar
informações e reduzir perguntas. Nunca crie, edite, renomeie, remova ou migre
arquivos do Specsfy. Nunca execute comandos para alterar o repositório
`specsfy`. O artefato do MVPFy continua sendo somente `MVP.md` e o estado
em `.mvpfy/`.

## Especialistas

Carregue somente a especialista necessária: `mvpfy-problem`,
`mvpfy-audience`, `mvpfy-product`, `mvpfy-saas`, `mvpfy-brand`,
`mvpfy-market`, `mvpfy-pricing`, `mvpfy-technology`, `mvpfy-marketing`,
`mvpfy-document`, `mvpfy-migrate` ou `mvpfy-progress`. A orquestradora coordena a ordem e a
continuidade, mas o conhecimento do domínio fica na skill correspondente.

Leia [interview-policy.md](references/interview-policy.md) para priorizar
perguntas e [contracts.md](references/contracts.md) para o formato de troca
com as especialistas.
