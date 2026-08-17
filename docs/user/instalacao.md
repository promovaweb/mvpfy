# Instalação do MVPFy

Para usar o MVPFy, tenha Node.js 22 ou superior instalado. Depois, instale a
CLI globalmente e execute-a na raiz do projeto que receberá o planejamento:

```bash
npm install --global @promovaweb/mvpfy
mvpfy --version
```

## Prepare o projeto

Na raiz do projeto consumidor, execute os dois comandos abaixo. Eles instalam as
skills e preparam os arquivos locais:

```bash
mvpfy install --project .
node skills/mvpfy/scripts/setup-project.mjs --project .
```

O primeiro comando instala as skills do MVPFy. O segundo cria `MVP.md` e
`.mvpfy/` para guardar o plano e o estado necessário para retomar a entrevista,
sem alterar o código da aplicação ou os arquivos do Specsfy.

Confira o resultado com os dois comandos abaixo. Eles mostram se o projeto e o
planejamento já estão prontos:

```bash
mvpfy doctor --project .
mvpfy progress --project .
```

Com o projeto preparado, carregue `$mvpfy` no agente e peça para começar. A
primeira mensagem livre será registrada antes da primeira pergunta fechada.

## Atualize as skills

Na mesma raiz do projeto, execute o comando de atualização. Ele mantém as
skills disponíveis para a próxima sessão:

```bash
mvpfy update --project .
```

Quando já existir um `MVP.md` de uma versão anterior, a atualização compara o
template e chama `mvpfy-migrate` antes de continuar. As respostas registradas
permanecem disponíveis para a próxima lacuna da entrevista.

Se algo não aparecer no projeto, consulte [Solução de problemas](solucao-de-problemas.md).
Essa página reúne as verificações para corrigir a instalação.
