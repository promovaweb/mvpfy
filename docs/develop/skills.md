# Arquitetura das skills

Cada skill vive em seu próprio diretório e mantém uma responsabilidade
delimitada. O corpo de `SKILL.md` contém o fluxo essencial; referências guardam
regras específicas; scripts cuidam das operações que precisam de repetição
exata.

## Catálogo completo

| Skill | Owner | Handoff |
| --- | --- | --- |
| `mvpfy` | Conversa, estado e fila | Qualquer especialista ou documento |
| `mvpfy-problem` | Situação, problema e hipótese | `mvpfy-audience` |
| `mvpfy-audience` | Segmento e papéis | `mvpfy-product` |
| `mvpfy-product` | Jornada e escopo | `mvpfy-saas` |
| `mvpfy-saas` | Conta e ciclo recorrente | `mvpfy-market` ou preço |
| `mvpfy-brand` | Marca e posicionamento | Marketing ou documento |
| `mvpfy-market` | Concorrência e fonte | `mvpfy-pricing` |
| `mvpfy-pricing` | Cobrança e cenários | `mvpfy-technology` |
| `mvpfy-technology` | Stack e operação | `mvpfy-marketing` ou documento |
| `mvpfy-marketing` | Aquisição e venda | Documento |
| `mvpfy-document` | Company.md | Validação |
| `mvpfy-migrate` | Evolução de schema | Orquestradora |

## Estrutura de uma skill

```text
skills/<nome>/
├── SKILL.md
├── agents/openai.yaml
├── references/
├── scripts/
└── assets/
```

Somente os diretórios necessários devem existir. Não criar README dentro de
uma skill. A documentação de uso fica em `docs/user/` e a documentação técnica
fica em `docs/develop/`.

## Contrato de handoff

Uma especialista recebe fatos conhecidos, escolhas confirmadas, hipóteses,
pendências, conflitos e áreas afetadas. Ela devolve fatos novos, escolhas,
recomendações, campos resolvidos, lacunas, conflitos e uma possível próxima
pergunta.

A especialista não apresenta uma entrevista própria com várias perguntas. A
orquestradora escolhe somente um `next_question` para o turno e registra a
resposta antes de chamar a próxima etapa.

## Alterar uma skill

1. Identifique o comportamento que muda.
2. Atualize `SKILL.md` ou a referência do owner.
3. Adicione ou ajuste teste focal.
4. Atualize páginas de usuário e desenvolvimento.
5. Rode `quick_validate.py` e `npm test`.
6. Recompile o ebook quando a documentação pública mudar.

## Não confundir com o Specsfy

O padrão de organização desta documentação é uma referência de leitura. As
skills do MVPFy não são skills do Specsfy, não chamam o método dele e não
escrevem `spec.md`.
