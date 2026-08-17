# Contribuição

## Antes de editar

Leia `AGENTS.md`, confirme o estado Git do submódulo e identifique o owner no
[estrutura de arquivos](arquivos.md). Preserve alterações locais que não pertencem
à tarefa.

## Ao mudar comportamento

1. Descreva o comportamento observável.
2. Altere a skill, referência ou script responsável.
3. Acrescente um teste focal.
4. Atualize a documentação de usuário.
5. Atualize a documentação técnica.
6. Recompile e verifique o ebook se as páginas mudaram.
7. Rode lint, testes e validadores.

## Ao mudar uma skill

Use a orientação do `skill-creator`. Confira frontmatter, descrição, estrutura,
referências diretas e `agents/openai.yaml`. A regra de uma pergunta por turno
precisa aparecer na skill, na política, no contrato e no teste correspondente.

## Limites de escrita

Leia specs, backlogs e docs do projeto consumidor quando isso ajudar o MVPFy a
evitar perguntas repetidas. Não altere esses arquivos. Dentro do ecossistema,
este submódulo só publica a própria biblioteca e seu `MVP.md` no projeto
consumidor.

## Validação

```bash
npm test
npm run ebook
npm run ebook:verify
git diff --check
```

Na raiz do Hub, rode também os validadores aplicáveis ao submódulo.
