# Guia do usuário do MVPFy

<!-- markdownlint-disable MD033 -->
<p align="center">
  <picture>
    <source srcset="../brand/logo/icon.svg" type="image/svg+xml">
    <img src="../brand/logo/icon.png" alt="Logo do MVPFy" width="128">
  </picture>
</p>
<!-- markdownlint-enable MD033 -->

Você não precisa chegar com um plano pronto. Basta descrever o que imagina criar,
mesmo que a ideia ainda misture público e funcionalidades com preço e tecnologia.
O MVPFy lê esse primeiro relato, aproveita o que já está claro e conduz a
conversa até uma versão inicial que possa ser construída e testada.

Durante a entrevista, você conversa com a skill `mvpfy`. Ela faz uma pergunta
por vez, grava a resposta antes de seguir e chama especialistas para cada
área: problema e público, produto e preço, tecnologia e entrada no mercado.

No fim, você recebe um arquivo `MVP.md`. Ele dá aos responsáveis por site,
marca, desenvolvimento e vendas uma base comum para construir a versão 1.0,
vender o serviço e acompanhar os primeiros clientes.

O MVPFy não cria `spec.md`, não executa o método do Specsfy e não altera o
repositório `specsfy`. A semelhança entre os guias existe apenas na organização
da documentação e no padrão visual do ebook.

## Escolha como começar

Você pode ler este percurso online ou levar o conteúdo para um leitor digital.
Esta edição portátil é a **v0.4.7**:

- [PDF](../../ebooks/MVPFy-Guia-do-Usuario-v0.4.7.pdf), para leitura e impressão.
- [EPUB](../../ebooks/MVPFy-Guia-do-Usuario-v0.4.7.epub), para leitores digitais.
- [manifesto](../../ebooks/build.json), com a versão e os hashes do build.

O ebook contém somente o guia do usuário, na ordem de compilação registrada em
[reading-order.txt](reading-order.txt). A documentação técnica continua
disponível online para instalação, manutenção e contribuição com o framework.

## Para qual situação o MVPFy serve

No começo de uma empresa, é comum pensar no painel antes de entender o
problema, escolher a tecnologia antes de conhecer o volume e imaginar o preço
sem saber qual cliente fará o pagamento. O MVPFy coloca essas escolhas em ordem numa
conversa simples.

O guia foi feito para este cenário:

- uma empresa nova ou uma operação ainda em formação.
- um primeiro produto de software.
- uma oferta contínua de software como serviço.
- uma versão 1.0 para aprender com os primeiros clientes.

Se a ideia for uma agência que cria sites sob encomenda, o MVPFy verifica se
existe também um produto SaaS repetível. Sem esse produto, a proposta não se
encaixa no percurso principal.

## Um percurso curto e progressivo

1. Leia [A proposta](proposta.md) para saber o que o MVPFy prepara.
2. Siga [Instalação](instalacao.md) para preparar o projeto que receberá o plano.
3. Acompanhe [Primeiro MVP](primeiro-mvp.md) com um exemplo do início ao fim.
4. Consulte [Entrevista](entrevista.md) para entender a conversa e a retomada.
5. Abra [MVP.md](mvp.md) para conhecer o documento entregue.
6. Use [Pesquisa e preço](pesquisa-e-preco.md) e [Tecnologia e operação](tecnologia-e-operacao.md) quando essas partes fizerem sentido para sua ideia.
7. Consulte [Progresso](progresso.md) para acompanhar as áreas do MVP pela CLI ou TUI.
8. Consulte o [catálogo de skills](skills/README.md) se quiser saber qual especialista trata cada assunto.

## Você pode continuar depois

Você pode parar quando quiser. O MVPFy grava as respostas no projeto que você
preparou e retoma a conversa depois. Ao dizer “continuar”, ele lê o que já foi
registrado, encontra o próximo ponto relevante e mostra somente uma pergunta.

Uma mensagem longa também é bem-vinda. Ao saber que agências pequenas perdem
leads recebidos por WhatsApp, formulário e Instagram, o MVPFy pode usar
essa informação para descrever o problema, o público, os canais e a alternativa
atual. Você não precisa repetir a mesma resposta em perguntas diferentes.

## Próximo passo

Para acompanhar um exemplo concreto, abra [Primeiro MVP](primeiro-mvp.md). Se
você já instalou o framework e precisa consultar o papel de uma skill, use o índice de
[skills](skills/README.md). O [guia de desenvolvimento](../develop/README.md)
fica separado para instalação e manutenção da implementação.
