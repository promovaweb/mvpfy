# MVPFy

O MVPFy é um conjunto de skills para transformar uma ideia em um plano
executável do primeiro produto SaaS. A conversa acontece com uma única pergunta
por turno, três respostas prontas, `4. Avançar` e `5. Conversar mais sobre este
tema`. Cada resposta é salva antes do próximo turno.

O resultado público do processo é um único arquivo `MVP.md`. Ele reúne o
problema, o público, as personas, a jornada, o escopo da versão 1.0, o modelo
SaaS, o preço, os custos, a tecnologia, o marketing, as métricas e as próximas
validações.

O MVPFy pode ler specs, backlogs, briefs e documentos já existentes no projeto
consumidor para evitar perguntas repetidas. Essa leitura é somente de
referência. O MVPFy não cria, altera ou migra `spec.md`, `specs/` ou qualquer
arquivo do Specsfy.

## Versionamento e releases

O arquivo [`VERSION`](VERSION) controla o SemVer do framework. O campo
`version` do `package.json` e a seção mais recente do [`CHANGELOG.md`](CHANGELOG.md)
precisam usar a mesma versão.

Cada push na `main` precisa incluir uma nova versão quando trouxer uma melhoria
publicável. O workflow
[`release.yml`](.github/workflows/release.yml) valida os testes, compara a
versão com o commit anterior, cria a tag `vX.Y.Z` e publica a release no
GitHub usando as notas da seção correspondente do changelog.

Para conferir antes do push:

```bash
npm run release:check
```

Consulte o [fluxo de release](docs/develop/release.md) para escolher entre
patch, minor e major e para entender as recusas do workflow.

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
| `mvpfy-document` | Geração e validação do `MVP.md`. |
| `mvpfy-migrate` | Atualização do template sem perda de conteúdo. |

## Princípios

- O produto atendido é o primeiro software oferecido como serviço.
- O plano cobre somente a versão 1.0 e separa o que fica para depois.
- A orquestradora exibe uma pergunta por turno com cinco opções fixas.
- A opção 5 abre conversa livre sobre a pergunta atual sem criar outra pergunta.
- O estado vive no projeto consumidor, em `.mvpfy/`.
- O conteúdo final vive em `MVP.md`.
- Laravel em VPS é a base técnica preferencial da Promovaweb.

## Documentação e ebook

O [guia do usuário](docs/user/README.md) apresenta o percurso completo. O
[guia de desenvolvimento](docs/develop/README.md) explica contratos, scripts e
testes. O [ebook](ebooks/ebook-mvpfy.pdf) publica somente o Guia do usuário em
uma edição portátil.

## Validação

```bash
npm test
npm run ebook:verify
```

## Licença

[MIT](LICENSE).
