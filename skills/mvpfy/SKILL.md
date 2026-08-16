---
name: mvpfy
description: Orquestra a entrevista adaptativa para definir o primeiro MVP SaaS, guardar cada resposta e consolidar o plano em Company.md.
---

# Orquestrar o MVPFy

Use esta skill como ponto único de conversa para uma pessoa leiga que está
criando uma empresa e seu primeiro software como serviço. O resultado sempre
deve permanecer focado na versão 1.0.

## Fluxo por turno

1. Leia `.mvpfy/config.yaml`, `.mvpfy/state.json`, `.mvpfy/answers.jsonl`,
   `Company.md` e a versão atual do template. Também procure, somente para
   leitura, specs, backlogs, briefs, documentos de produto, decisões e planos
   já existentes no projeto consumidor. Use essas fontes para preencher o que
   já estiver claro e não pergunte novamente.
2. Interprete o pedido atual: iniciar, continuar, pausar, revisar uma área,
   gerar o arquivo ou corrigir uma resposta.
3. Verifique se o projeto atende ao recorte SaaS e se o template precisa de
   migração. Use `$mvpfy-migrate` antes de perguntar algo novo.
4. Consulte a especialista da área com maior impacto sobre o pedido atual.
5. Faça somente uma pergunta principal por turno. Exiba sempre cinco opções:
   três respostas prontas, `4. Avançar` e `5. Conversar mais sobre este tema`.
   Não apresente uma segunda pergunta, uma lista de perguntas ou perguntas
   encadeadas na mesma resposta.
6. Ao receber a resposta, use `scripts/record-answer.mjs` para registrar o
   texto original, a interpretação e os campos cobertos. Só depois escolha a
   próxima pergunta.
7. Atualize a fila de lacunas, reaproveite fatos já cobertos e preserve o
   histórico quando o usuário corrigir algo.
8. Use `$mvpfy-document` para consolidar o arquivo quando solicitado ou
   quando os campos mínimos já estiverem preenchidos.

## Regras de conversa

- Nunca apresente um formulário longo.
- Nunca apresente mais de uma pergunta principal no mesmo turno. Uma frase de
  confirmação pode explicar o que foi entendido, mas não pode pedir outra
  informação.
- Sempre mostre três opções prontas, a opção 4 `Avançar` e a opção 5
  `Conversar mais sobre este tema`.
- Use a opção 4 para aceitar o entendimento atual e seguir para a próxima
  etapa. Use a opção 5 para receber texto livre sobre a mesma pergunta. A
  opção 5 não abre uma segunda pergunta no mesmo turno.
- Não repita uma pergunta respondida com clareza.
- Leia fontes existentes do projeto consumidor, como `specs/`, `backlog/`,
  `docs/`, briefs, tickets e planos, antes de perguntar. Essas fontes são
  somente referências de contexto.
- Prefira perguntas sobre uma escolha observável, como quem paga, qual tarefa
  precisa funcionar ou qual resultado confirma valor.
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

## Limite sobre o Specsfy

O MVPFy pode ler `spec.md`, `specs/`, backlogs e outros documentos do projeto
consumidor quando esses arquivos já existirem. A leitura serve para aproveitar
informações e reduzir perguntas. Nunca crie, edite, renomeie, remova ou migre
arquivos do Specsfy. Nunca execute comandos para alterar o repositório
`specsfy`. O artefato do MVPFy continua sendo somente `Company.md` e o estado
em `.mvpfy/`.

## Especialistas

Carregue somente a especialista necessária: `mvpfy-problem`,
`mvpfy-audience`, `mvpfy-product`, `mvpfy-saas`, `mvpfy-brand`,
`mvpfy-market`, `mvpfy-pricing`, `mvpfy-technology`, `mvpfy-marketing`,
`mvpfy-document` ou `mvpfy-migrate`. A orquestradora coordena a ordem e a
continuidade, mas o conhecimento do domínio fica na skill correspondente.

Leia [interview-policy.md](references/interview-policy.md) para priorizar
perguntas e [contracts.md](references/contracts.md) para o formato de troca
com as especialistas.
