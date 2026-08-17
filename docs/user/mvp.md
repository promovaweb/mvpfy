# O plano que você recebe: `MVP.md`

`MVP.md` é a entrega central do MVPFy. Ele transforma a conversa em um plano
que pode circular entre produto, desenvolvimento, marketing, vendas e
operação sem depender do histórico do chat.

## Como ler o estado do plano

| Estado | Significado |
| --- | --- |
| `preliminary` | Há conteúdo aproveitável, mas faltam escolhas importantes. |
| `ready` | Os campos mínimos do primeiro SaaS estão descritos e coerentes. |
| `validated` | As hipóteses principais já foram conferidas fora da entrevista. |

O estado não funciona como uma nota. Ele mostra quanto do plano já tem base
suficiente para orientar o próximo trabalho.

## O que o plano reúne

O template atual reúne 35 áreas. Elas acompanham o caminho natural de uma
empresa que sai da ideia e chega à primeira operação SaaS.

Primeiro, o plano explica o ponto de partida:

- resumo executivo.
- empresa e contexto.
- modelo da empresa SaaS.
- problema.
- comprovação, alternativas e hipóteses.
- público-alvo.
- pessoa usuária, cliente pagador e pagador.
- personas.
- proposta de valor e posicionamento.
- nome, marca e slogan.

Depois, ele descreve o produto e a relação com cada cliente:

- jornada principal.
- modelo multitenante, espaço, acesso e separação de dados.
- onboarding e primeiro valor.
- escopo funcional da versão 1.0.
- módulos e funcionalidades.
- perfis e permissões.
- assinatura e cobrança.
- suporte, retenção e cancelamento.
- processos manuais.
- itens fora do MVP.

Por fim, o plano mostra como a empresa pode chegar ao mercado e operar:

- concorrentes e alternativas.
- modelo comercial e preço.
- custos e economia unitária.
- tecnologia e arquitetura.
- infraestrutura e operação.
- uso de IA.
- website.
- marketing.
- vendas e lançamento.
- métricas.
- validações e dependências.
- execução.
- escolhas confirmadas.
- hipóteses e pendências.
- fontes.

Cada seção possui um comentário estável, como
`<!-- mvpfy:section:problem-definition -->`. Se o nome visível mudar, o
renderer ainda encontra o conteúdo pelo identificador.

## O que está confirmado e o que ainda falta

O documento usa quatro rótulos para que uma sugestão não pareça uma certeza:

- **Confirmado:** informação declarada por você ou respaldada por uma fonte.
- **Recomendado:** sugestão de uma especialista, baseada no contexto disponível.
- **Hipótese:** afirmação ainda não conferida com pessoas, mercado ou uso.
- **Pendente:** informação necessária que ainda não foi fornecida.

Essa separação impede que uma estimativa de preço pareça uma pesquisa concluída
ou que uma sugestão de Laravel pareça uma exigência do produto.

## Como o plano evolui

Quando o template evolui, `mvpfy-migrate` insere as seções novas, conserva o
texto existente e marca os campos que precisam de resposta. Depois da
atualização, a orquestradora continua pela primeira pergunta relevante, sempre
uma por vez.
