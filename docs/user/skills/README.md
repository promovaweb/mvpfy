# Catálogo de skills do MVPFy

O usuário conversa com `$mvpfy`. A orquestradora escolhe a especialista e
integra o retorno. Você não precisa chamar cada skill manualmente, mas conhecer
as responsabilidades ajuda a entender por que uma pergunta apareceu.

## Ordem típica

```text
contexto existente
      ↓
problema → público → produto → SaaS
      ↓          ↓        ↓       ↓
mercado → preço → tecnologia → marketing
      ↓
marca → Company.md → migração quando o template mudar
```

Essa ordem é adaptativa. Uma fonte já existente pode preencher uma área inteira
ou fazer a orquestradora voltar a um domínio anterior.

## Skills

| Skill | Quando entra | Entrega principal |
| --- | --- | --- |
| [`mvpfy`](mvpfy.md) | Sempre que você inicia ou retoma | Próxima pergunta e estado integrado |
| [`mvpfy-problem`](mvpfy-problem.md) | O problema ainda está genérico | Declaração do problema e hipótese |
| [`mvpfy-audience`](mvpfy-audience.md) | Público ou papéis estão misturados | Segmento, ICP e personas |
| [`mvpfy-product`](mvpfy-product.md) | A solução precisa virar escopo | Jornada, módulos e versão 1.0 |
| [`mvpfy-saas`](mvpfy-saas.md) | É preciso explicar o serviço recorrente | Conta, onboarding e ciclo do cliente |
| [`mvpfy-brand`](mvpfy-brand.md) | Produto e público já têm direção | Nome, posicionamento e slogan |
| [`mvpfy-market`](mvpfy-market.md) | Há concorrentes ou URLs | Mapa competitivo e fontes |
| [`mvpfy-pricing`](mvpfy-pricing.md) | Valor e cobrança precisam de hipótese | Faixas, planos e cenários |
| [`mvpfy-technology`](mvpfy-technology.md) | A jornada permite desenhar a base técnica | Arquitetura Laravel e custos |
| [`mvpfy-marketing`](mvpfy-marketing.md) | Oferta e público precisam chegar ao mercado | Aquisição, conteúdo e venda |
| [`mvpfy-document`](mvpfy-document.md) | Você pede o plano ou há dados suficientes | `Company.md` renderizado e validado |
| [`mvpfy-migrate`](mvpfy-migrate.md) | O template mudou | Documento atualizado sem perda |

Cada página explica entradas, análise, saída, limites, exemplo e próximo
handoff. O catálogo descreve o MVPFy; ele não altera a biblioteca Specsfy.
