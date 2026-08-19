---
name: mvpfy-context
description: Lê specs, documentos e código existentes para preparar o contexto inicial do MVPFy sem alterar o projeto analisado.
---

# Contexto de um projeto existente

Esta skill entra antes da entrevista, durante a configuração do projeto e no
início de cada retomada da conversa. Ela procura material já criado e entrega
um retrato curto para a orquestradora do MVPFy.

## Responsabilidade

1. Executar `scripts/analyze-existing-project.mjs` no diretório consumidor.
2. Procurar specs, briefs, backlogs, planos, documentos de produto e registros
   em arquivos Markdown, YAML e JSON.
3. Ler manifestos e contar arquivos de programação por linguagem e pasta.
4. Reconhecer a stack declarada, a existência de uma aplicação e os sinais
   técnicos que ajudam a formular o primeiro MVP.
5. Entregar sugestões de resposta com origem, resumo e grau de confiança.
6. Registrar perguntas que o material não consegue responder.

## Limites

- A leitura é somente de contexto. Nenhum arquivo do projeto consumidor é
  alterado, exceto os artefatos criados dentro de `.mvpfy/` pelo próprio
  MVPFy.
- `node_modules`, `vendor`, `.git`, builds, caches, cobertura, segredos e
  arquivos binários ficam fora da leitura.
- Um nome de função, uma rota ou uma dependência mostra implementação. Não
  prova público, problema, proposta de valor, preço ou aceitação do produto.
- Uma sugestão pode preencher uma lacuna técnica. A pessoa ainda confirma
  escolhas de produto, público e escopo durante a conversa.
- A skill nunca escreve `spec.md`, não modifica `specsfy/` e não transforma
  código existente em código do MVPFy.

## Saída

O relatório fica em `.mvpfy/existing-project.json`. Ele contém:

- `sources.specs`: documentos encontrados, tipo, título, caminho e trecho;
- `sources.code`: arquivos de programação agrupados por linguagem;
- `manifests`: manifestos lidos e dependências declaradas;
- `stack`: tecnologias reconhecidas com seus caminhos de origem;
- `suggested_answers`: campos que o contexto ajuda a responder;
- `gaps`: perguntas que continuam abertas;
- `summary`: contagens e leitura geral do projeto.

O estado recebe somente um ponteiro resumido em
`existing_project_context`. A orquestradora lê o relatório completo antes de
montar a fila, usa sugestões suficientes para não repetir perguntas e marca
como pendente qualquer conclusão que o material não sustente.

## Gatilhos da orquestradora

No `setup-project.mjs`, a skill roda depois da criação inicial de `.mvpfy/`.
No começo de cada conversa com `$mvpfy`, rode novamente:

```bash
node skills/mvpfy-context/scripts/analyze-existing-project.mjs --project .
```

Depois leia `.mvpfy/existing-project.json` junto de `state.json`,
`answers.jsonl`, `MVP.md` e das fontes de contexto. Se não houver material,
continue pelo relato livre da ideia. Se houver, comece pelos campos já
explicados e apresente somente a próxima lacuna relevante.
