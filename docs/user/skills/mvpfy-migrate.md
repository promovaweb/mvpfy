# A atualização do template: `mvpfy-migrate`

Esta skill cuida da atualização do `MVP.md` quando o template evolui. Ela usa
IDs de seção e a versão do schema para acrescentar o que falta sem apagar o
plano que você já construiu.

## Como a atualização acontece

1. Ler a versão do documento.
2. Localizar os identificadores existentes.
3. Comparar o arquivo com o template atual.
4. Inserir as seções ausentes.
5. Preservar o conteúdo preenchido.
6. Marcar campos novos como pendentes.
7. Atualizar a versão depois de uma gravação válida.
8. Entregar à orquestradora uma única pergunta nova relevante.

## Um exemplo

Se o template ganhar “Plano de onboarding” e o documento já descrever convite e
primeiro valor em outra seção, o texto antigo permanece. A nova seção recebe
uma síntese segura ou “Pendente”. O MVPFy pergunta somente o detalhe que não
puder ser entendido a partir do material existente.

## Onde termina este trabalho

Esta skill não remove histórico, não duplica seções, não migra arquivos do
Specsfy e não cria uma série de perguntas em lote.
