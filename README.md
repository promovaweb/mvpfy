# MVPFy

O MVPFy é um conjunto de skills para transformar uma ideia em um plano
executável do primeiro produto SaaS. A conversa acontece com perguntas simples,
uma por vez, e cada resposta é salva antes da próxima pergunta.

O resultado público do processo é um único arquivo `Company.md`. Ele reúne o
problema, o público, as personas, a jornada, o escopo da versão 1.0, o modelo
SaaS, o preço, os custos, a tecnologia, o marketing, as métricas e as próximas
validações.

## Instalação

```bash
npx skills add promovaweb/mvpfy
```

No projeto que receberá as skills, use `$mvpfy` como porta de entrada. Para
preparar um projeto local manualmente:

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

## Skills

| Skill | Função |
| --- | --- |
| `mvpfy` | Entrevista, retomada, fila de perguntas e consolidação. |
| `mvpfy-problem` | Situação, problema, alternativa atual e hipótese. |
| `mvpfy-audience` | Segmento, papéis de compra e personas. |
| `mvpfy-product` | Proposta, jornada, módulos e escopo 1.0. |
| `mvpfy-saas` | Conta, acesso, onboarding, cobrança e ciclo do cliente. |
| `mvpfy-brand` | Categoria, posicionamento, nome e slogan. |
| `mvpfy-market` | Concorrentes, alternativas e preços consultados. |
| `mvpfy-pricing` | Modelo de preço, custos e cenários. |
| `mvpfy-technology` | Laravel, VPS, dados, arquivos, IA e operação. |
| `mvpfy-marketing` | Aquisição, conteúdo, leads, venda e lançamento. |
| `mvpfy-document` | Geração e validação do `Company.md`. |
| `mvpfy-migrate` | Atualização do template sem perda de conteúdo. |

## Princípios

- O produto atendido é o primeiro software oferecido como serviço.
- O plano cobre somente a versão 1.0 e separa o que fica para depois.
- A orquestradora pergunta uma coisa por vez.
- O estado vive no projeto consumidor, em `.mvpfy/`.
- O conteúdo final vive em `Company.md`.
- Laravel em VPS é a base técnica preferencial da Promovaweb.

## Documentação e ebook

O [guia do usuário](docs/user/README.md) apresenta o percurso completo. O
[guia de desenvolvimento](docs/develop/README.md) explica contratos, scripts e
testes. O [ebook](ebooks/ebook-mvpfy.pdf) reúne a documentação em uma edição
portátil.

## Validação

```bash
npm test
npm run ebook:verify
```

## Licença

[MIT](LICENSE).
