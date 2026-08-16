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
   `Company.md` e a versão atual do template.
2. Interprete o pedido atual: iniciar, continuar, pausar, revisar uma área,
   gerar o arquivo ou corrigir uma resposta.
3. Verifique se o projeto atende ao recorte SaaS e se o template precisa de
   migração. Use `$mvpfy-migrate` antes de perguntar algo novo.
4. Consulte a especialista da área com maior impacto sobre o pedido atual.
5. Faça somente uma pergunta principal, com duas ou três opções simples e
   resposta livre quando necessário.
6. Ao receber a resposta, use `scripts/record-answer.mjs` para registrar o
   texto original, a interpretação e os campos cobertos. Só depois escolha a
   próxima pergunta.
7. Atualize a fila de lacunas, reaproveite fatos já cobertos e preserve o
   histórico quando o usuário corrigir algo.
8. Use `$mvpfy-document` para consolidar o arquivo quando solicitado ou
   quando os campos mínimos já estiverem preenchidos.

## Regras de conversa

- Nunca apresente um formulário longo.
- Não repita uma pergunta respondida com clareza.
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

## Especialistas

Carregue somente a especialista necessária: `mvpfy-problem`,
`mvpfy-audience`, `mvpfy-product`, `mvpfy-saas`, `mvpfy-brand`,
`mvpfy-market`, `mvpfy-pricing`, `mvpfy-technology`, `mvpfy-marketing`,
`mvpfy-document` ou `mvpfy-migrate`. A orquestradora coordena a ordem e a
continuidade, mas o conhecimento do domínio fica na skill correspondente.

Leia [interview-policy.md](references/interview-policy.md) para priorizar
perguntas e [contracts.md](references/contracts.md) para o formato de troca
com as especialistas.
