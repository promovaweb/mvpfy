# Setup do MVPFy: `$mvpfy-setup`

Use `$mvpfy-setup` para instalar as skills, criar os arquivos do planejamento
e conferir se o projeto pode iniciar ou retomar a entrevista.

## Um comando para começar

Na raiz do projeto consumidor, execute:

```bash
npx --yes @promovaweb/mvpfy install --project .
```

O comando instala as skills e prepara `MVP.md` e `.mvpfy/`. Se esses arquivos
já existirem, ele preserva as respostas e a estrutura atual.

## Conferência e atualização

Use os comandos abaixo para verificar o resultado ou atualizar as skills:

```bash
mvpfy doctor --project .
mvpfy progress --project .
mvpfy update --project .
```

O setup não cria nem modifica arquivos do Specsfy. O resultado do MVPFy fica
somente em `MVP.md` e `.mvpfy/`.
