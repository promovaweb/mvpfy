# Acompanhe o progresso do MVP

O arquivo `MVP.md` cresce enquanto a entrevista registra respostas e
recomendações. A skill `mvpfy-progress` apresenta esse estado sem abrir uma
pergunta nova. Ela pode ser usada quando você quiser saber o que já está claro
e qual assunto ainda precisa de atenção.

## Pelo terminal

Na raiz do projeto consumidor:

```bash
mvpfy progress --project .
```

O resultado agrupa o plano em Problema, Público, Produto, SaaS, Mercado e
preço, Tecnologia, Marketing e Validação. O percentual é uma indicação de
preenchimento das seções encontradas no `MVP.md`; ele não substitui a leitura
das hipóteses e dos pontos ainda abertos.

Para abrir o painel:

```bash
mvpfy --project .
```

Na aba **Progresso**, você vê o resumo geral, as áreas e o próximo ponto. Na
aba **Áreas**, pode navegar por cada grupo e ver quais seções estão completas.
Na aba **MVP.md**, o documento é renderizado com cores e pode ser percorrido
com as setas do terminal. Essa leitura não altera o arquivo.

## Instalação e atualização no painel

A aba **Skills** oferece duas ações:

- `I` instala ou reconcilia as skills do MVPFy;
- `R` atualiza as skills já instaladas.

As ações executam `skills add promovaweb/mvpfy --all --copy --yes` e
`skills update --project --yes`. O MVPFy não substitui o CLI oficial nem cria
uma cópia paralela da instalação.

## Como interpretar o resumo

```text
Progresso do MVP: 48%
✓ Problema: 100% (2/2)
◐ Produto: 60% (3/5)
○ Marketing: 0% (0/3)
Próximo ponto: Preencher a seção marketing
```

Uma área concluída tem todas as seções encontradas preenchidas. Uma área em
andamento possui parte do conteúdo definido. Uma área pendente ainda não tem
informação suficiente no documento. O modelo de atendimento SaaS aparece à
parte porque a escolha entre multitenante compartilhado e instalação separada
afeta várias áreas.

## Sem TUI

Para agentes e automações, use JSON:

```bash
mvpfy progress --project . --json
```

Esse formato inclui as áreas, seções pendentes, estado da entrevista, modelo
SaaS e próximo ponto. O comando é somente de leitura.
