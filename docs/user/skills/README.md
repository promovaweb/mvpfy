# As especialistas que trabalham no MVPFy

Você conversa apenas com `$mvpfy`. A orquestradora lê o que já foi registrado,
escolhe a especialista adequada e incorpora o retorno ao plano. Você não
precisa chamar cada skill manualmente. Conhecer o papel de cada uma ajuda a
entender por que determinada pergunta apareceu.

## Ordem típica

```text
contexto existente
      ↓
problema → público → produto → SaaS
      ↓          ↓        ↓       ↓
mercado → preço → tecnologia → marketing
      ↓
marca → MVP.md → migração quando o template mudar
```

Essa ordem é apenas um caminho comum. Um documento já existente pode preencher
uma área inteira, e uma resposta nova pode levar a conversa de volta para um
assunto anterior. A orquestradora acompanha o conteúdo disponível, não uma
lista fixa de perguntas.

## Skills

| Skill | Quando entra | O que acrescenta ao plano |
| --- | --- | --- |
| [`mvpfy`](mvpfy.md) | Sempre que você inicia ou retoma | Próxima pergunta e estado integrado |
| [`mvpfy-context`](mvpfy-context.md) | Setup e início de cada conversa | Specs, código, stack e lacunas disponíveis |
| [`mvpfy-problem`](mvpfy-problem.md) | O problema ainda está genérico | Declaração do problema e hipótese |
| [`mvpfy-audience`](mvpfy-audience.md) | Público ou papéis estão misturados | Segmento, ICP e personas |
| [`mvpfy-product`](mvpfy-product.md) | A solução precisa virar escopo | Jornada, módulos e versão 1.0 |
| [`mvpfy-saas`](mvpfy-saas.md) | É preciso explicar o serviço recorrente | Espaço do cliente, onboarding e ciclo do cliente |
| [`mvpfy-brand`](mvpfy-brand.md) | Produto e público já têm direção | Nome, posicionamento e slogan |
| [`mvpfy-market`](mvpfy-market.md) | Há concorrentes ou URLs | Comparação de mercado e fontes |
| [`mvpfy-pricing`](mvpfy-pricing.md) | Valor e cobrança precisam de hipótese | Faixas, planos e cenários |
| [`mvpfy-technology`](mvpfy-technology.md) | A jornada permite desenhar a base técnica | Arquitetura Laravel e custos |
| [`mvpfy-marketing`](mvpfy-marketing.md) | Oferta e público precisam chegar ao mercado | Aquisição, conteúdo e venda |
| [`mvpfy-document`](mvpfy-document.md) | Você pede o plano ou há dados suficientes | `MVP.md` renderizado e validado |
| [`mvpfy-migrate`](mvpfy-migrate.md) | O template mudou | Documento atualizado sem perda |
| [`mvpfy-progress`](mvpfy-progress.md) | Você quer ver o andamento sem abrir uma pergunta | Resumo por áreas e próxima lacuna |

Cada página explica o que a especialista recebe, como trabalha, o que entrega
e onde termina sua responsabilidade. Os exemplos usam uma ideia de SaaS para
mostrar a passagem de uma etapa para outra.

O catálogo descreve o MVPFy. Ele não altera a biblioteca Specsfy.
