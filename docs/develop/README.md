# Guia de desenvolvimento do MVPFy

<!-- markdownlint-disable MD033 -->
<p align="center">
  <picture>
    <source srcset="../brand/logo/icon.svg" type="image/svg+xml">
    <img src="../brand/logo/icon.png" alt="Logo do MVPFy" width="128">
  </picture>
</p>
<!-- markdownlint-enable MD033 -->

Este percurso explica como o MVPFy funciona por dentro e como alterar a
biblioteca sem romper a entrevista, a persistência ou o `MVP.md`. Ele é
destinado a agentes e pessoas que contribuem com skills, scripts, template,
documentação, ebook ou testes.

O MVPFy é um projeto independente. Ele não importa, cria, lê ou modifica
`spec.md`, skills ou arquivos do Specsfy. A estrutura desta documentação foi
inspirada na separação de percursos do Specsfy, mas toda implementação e toda
fonte de verdade ficam neste submódulo.

Para aprender a usar o produto em um projeto consumidor, siga o [guia do
usuário](../user/README.md).

## Leitura inicial

| Preciso entender… | Documento |
| --- | --- |
| arquitetura e responsabilidades | [Arquitetura](arquitetura.md) |
| cada skill e seu handoff | [Skills](skills.md) |
| estado, respostas e gravação | [Estado e persistência](estado-e-persistencia.md) |
| template e `MVP.md` | [Template do documento](mvp-template.md) |
| comandos e arquivos executáveis | [Scripts](scripts.md) |
| SemVer, changelog e GitHub Release | [Versionamento e releases](release.md) |
| testes e validações | [Testes](testes.md) |
| ebook e manutenção das páginas | [Documentação e ebook](ebook-e-documentacao.md) |
| contribuição completa | [Contribuição](contribuicao.md) |

## Para agentes

1. Leia o `AGENTS.md` da raiz e de `mvpfy/`.
2. Confirme os arquivos executáveis antes de descrever um fluxo.
3. Preserve a separação entre orquestradora e especialistas.
4. Salve a resposta antes de apresentar a pergunta seguinte.
5. Atualize docs, testes e ebook quando a interface pública mudar.
6. Rode os validadores do submódulo antes de entregar a alteração.

## Modelo de contribuição

Uma mudança começa pelo comportamento observável. Depois, ajuste a skill ou o
script responsável, escreva um teste focal, atualize a documentação de usuário
e técnica e reconstrua o ebook. O [mapa de arquivos](arquivos.md) ajuda a
encontrar o owner correto antes da edição.

## Contexto técnico

As páginas em [`context/`](context/README.md) registram finalidade,
arquitetura, stack, dados, entrevista, documento e testes. Elas são pequenas o
pre suficiente para serem carregadas por um agente sem substituir o código ou
os contratos canônicos.

## Validação rápida

Na raiz do submódulo:

```bash
npm test
npm run ebook
npm run ebook:verify
```

O lint de Markdown e os validadores da raiz do Hub também fazem parte da
entrega quando o submódulo é alterado dentro do monorepo.
