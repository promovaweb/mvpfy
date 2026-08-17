# Versionamento e releases

O MVPFy usa Semantic Versioning para que cada melhoria publicada tenha uma
versão identificável. A fonte canônica é o arquivo [`VERSION`](../../VERSION).
O `package.json` e o `CHANGELOG.md` repetem essa versão para que o pacote, a
documentação e o GitHub mostrem o mesmo estado. O ebook usa a mesma versão do
framework em seus arquivos, no nome do PDF, no EPUB e no manifesto.

## Arquivos envolvidos

| Arquivo | Responsabilidade |
| --- | --- |
| `VERSION` | Número SemVer que será publicado. |
| `package.json` | Versão do pacote Node.js, mantida igual a `VERSION`. |
| `CHANGELOG.md` | Explicação da mudança na seção `[X.Y.Z]`. |
| `ebooks/VERSION` | Cópia de conferência da versão usada pelo ebook. Deve ser igual a `VERSION`. |
| `scripts/validate-release.mjs` | Confere versão, changelog e avanço desde o commit anterior. |
| `scripts/extract-release-notes.mjs` | Prepara as notas usadas no GitHub Release. |
| `.github/workflows/release.yml` | Executa testes, cria tag e publica a release. |

## Escolha da versão

| Tipo de mudança | Exemplo | Incremento |
| --- | --- | --- |
| Correção compatível | Ajustar uma validação sem mudar o uso | `0.2.0` para `0.2.1` |
| Nova capacidade compatível | Adicionar uma skill ou comando sem quebrar o fluxo | `0.2.0` para `0.3.0` |
| Quebra de contrato | Remover campo, mudar formato ou exigir migração | `0.2.0` para `1.0.0` |

O primeiro número zero indica que o framework ainda está antes da primeira
versão estável. Mesmo nesse estágio, não reutilize uma versão já publicada.

## Como publicar uma melhoria

1. Faça a alteração no framework.
2. Atualize `VERSION` com a próxima versão.
3. Atualize `package.json.version` para o mesmo valor.
4. Atualize `ebooks/VERSION` com o mesmo valor.
5. Crie a seção `## [X.Y.Z] - AAAA-MM-DD` no topo de `CHANGELOG.md`.
6. Explique a alteração e o efeito para a pessoa que usa o MVPFy.
7. Rode as verificações locais.
8. Faça commit e push na `main`.

Verifique localmente com:

```bash
npm run release:check
npm test
```

Se a mudança alterar `docs/`, também execute:

```bash
npm run ebook
npm run ebook:verify
```

## O que acontece no GitHub

O workflow roda em todo push na `main`. A publicação só prossegue quando a
versão atual é maior que a versão do commit anterior. Depois, ele:

1. executa `npm test`.
2. valida `VERSION`, `package.json` e `CHANGELOG.md`.
3. recusa uma tag `vX.Y.Z` que já exista.
4. cria e envia a tag anotada.
5. extrai as notas da seção correspondente.
6. cria a GitHub Release com a tag e essas notas.

Isso mantém uma relação direta entre commit, tag, versão e changelog.

## Recusas esperadas

O workflow falha quando:

- `VERSION` não usa `MAJOR.MINOR.PATCH` válido.
- `package.json.version` diverge de `VERSION`.
- o changelog não tem a seção da versão atual.
- a versão não avançou em relação ao commit anterior.
- a tag da versão já existe.
- os testes falham.

Corrija a versão no commit seguinte e faça novo push. Não remova tags ou
reescreva releases já publicadas para contornar a validação.

## Versão única do framework e do ebook

`VERSION` é a fonte canônica do framework. `ebooks/VERSION` é um espelho
conferido pelo build. Os dois arquivos precisam permanecer iguais. O nome dos
arquivos PDF e EPUB, os metadados e o manifesto também recebem essa versão.
Uma alteração de código ou documentação que gere uma publicação deve atualizar
o framework e o ebook juntos. Nunca publique uma edição do ebook com SemVer
independente.
