# Documentação e ebook

O percurso do usuário, o percurso técnico e a especificação são Markdown. O
ebook é um formato derivado dessas páginas, não uma segunda fonte de conteúdo.

## Ordem das páginas

`docs/reading-order.txt` lista cada página na ordem pedagógica. O build lê os
caminhos, verifica se existem e passa a mesma sequência ao Pandoc para PDF e
EPUB.

## Build

```bash
npm run ebook
npm run ebook:verify
```

O primeiro comando gera a edição versionada, os aliases `ebook-mvpfy.pdf` e
`ebook-mvpfy.epub` e `ebooks/build.json`. O segundo confere arquivos, hashes,
texto mínimo do PDF e integridade do EPUB.

## Quando incrementar a versão

Altere `ebooks/VERSION` quando o conjunto de páginas mudar. Uma nova seção ou
capítulo usa incremento minor; correção textual sem nova área pode usar patch.
O manifesto registra o hash das fontes, portanto o build precisa ser executado
depois de toda mudança documental.

## Visual

O pipeline usa `pdf.css`, `epub.css`, `template.html`, `metadata.yaml`, capa,
fontes e ícone local. O visual segue o padrão dos projetos do Hub sem importar
arquivos do Specsfy e sem criar uma fonte paralela no Hub.

## Links

Links relativos entre páginas do MVPFy continuam úteis no Markdown e no ebook.
Antes do build, confira que toda página referenciada existe.
