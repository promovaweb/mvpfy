# Skill `mvpfy-migrate`

Esta skill atualiza um `MVP.md` quando o template evolui. Ela usa IDs de
seção e versão de schema para inserir o que falta no lugar correto.

## Fluxo

1. Ler a versão do documento.
2. Ler IDs existentes.
3. Comparar com o template atual.
4. Inserir seções ausentes.
5. Preservar o conteúdo preenchido.
6. Marcar campos novos como pendentes.
7. Atualizar a versão após gravação válida.
8. Devolver à orquestradora uma única pergunta nova relevante.

## Exemplo

Se o template ganhar “Plano de onboarding” e o documento já descreve convite e
primeiro valor em outra seção, o texto antigo permanece. A nova seção recebe
uma síntese segura ou “Pendente”; o MVPFy pergunta somente o detalhe que não
puder ser inferido.

## Não faz

Não remove histórico, não duplica seções, não migra arquivos do Specsfy e não
faz uma rodada de perguntas em lote.
