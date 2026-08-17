# Documentação do MVPFy

<!-- markdownlint-disable MD033 -->
<p align="center">
  <picture>
    <source srcset="brand/logo/icon.svg" type="image/svg+xml">
    <img src="brand/logo/icon.png" alt="Logo do MVPFy" width="128">
  </picture>
</p>
<!-- markdownlint-enable MD033 -->

O MVPFy transforma uma ideia inicial em um plano utilizável para construir e
validar o primeiro SaaS de uma empresa. A conversa acontece com perguntas
simples, uma por vez. O trabalho especializado fica distribuído nas skills e
o resultado é consolidado em um único `MVP.md`.

A documentação segue a separação usada pelo Specsfy: um percurso para quem
usa o produto e outro para quem mantém a biblioteca.

## Percursos

| Preciso fazer… | Documento |
| --- | --- |
| Entender a proposta e iniciar um planejamento | [Guia do usuário](user/README.md) |
| Instalar as skills em um projeto consumidor | [Instalação](user/instalacao.md) |
| Conduzir a primeira entrevista completa | [Primeiro MVP](user/primeiro-mvp.md) |
| Consultar uma skill específica | [Catálogo de skills](user/skills/README.md) |
| Entender contratos, arquivos e estado | [Guia técnico](develop/README.md) |
| Consultar a especificação funcional | [Especificação](specification.md) |

## Ebook

O [ebook do MVPFy](../ebooks/ebook-mvpfy.pdf) reúne os dois percursos, a
especificação e os exemplos em uma edição portátil. O PDF e o EPUB são
gerados a partir das páginas listadas em [reading-order.txt](reading-order.txt).

## Fonte de verdade

As skills em `skills/`, os scripts em cada pacote, os testes em `tests/` e o
template `skills/mvpfy-document/assets/MVP.template.md` descrevem o
comportamento executável. A documentação explica esse comportamento e não
substitui os arquivos que o runtime lê.
