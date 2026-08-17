# O serviço recorrente: `mvpfy-saas`

Esta especialista explica o que acontece ao redor do software. Um SaaS não
termina quando a pessoa entra na tela principal. Uma pessoa precisa criar o espaço,
usar o serviço, pagar, receber suporte e encerrar o acesso quando necessário.

Ela começa confirmando se várias empresas ou equipes usarão a mesma aplicação.
Essa pergunta vem logo depois da ideia inicial. Se a resposta for multitenante,
a especialista faz no máximo uma pergunta curta sobre a unidade do espaço e sua
administração antes de tratar preço ou arquitetura.

## O que ela procura

- B2B, B2C ou profissionais independentes.
- titular do espaço e pessoas usuárias.
- separação dos dados entre espaços.
- convite, demonstração ou teste.
- onboarding e primeiro valor.
- ativação.
- unidade de valor.
- assinatura, limites e excedentes.
- cancelamento, inadimplência e suporte.
- processos manuais aceitáveis durante a validação.

Com essa resposta, ela recomenda:

- unidade do tenant.
- titularidade e administração.
- convites, membros e papéis.
- participação de uma pessoa em vários tenants.
- limite dos dados e banco.
- criação e configuração de novos tenants.

Esses itens não abrem uma fila adicional. Eles aparecem como recomendações
para o MVP, usando o suporte de Teams do Laravel quando fizer sentido.

## Um exemplo

Uma agência pode criar o espaço, adicionar seus clientes e manter a cobrança no
próprio contrato. Cada cliente acompanha seus leads, sem acesso aos dados de
outros espaços. Esse arranjo muda permissões, preço e onboarding.

Quando Laravel for escolhido, o plano avalia o suporte de Teams da solução
adotada para equipes, membros, convites e papéis. Teams ajuda na associação de
pessoas ao tenant, mas não substitui as regras de isolamento e autorização.

## Ponto de partida técnico

Para muitos primeiros produtos, uma aplicação compartilhada com separação
lógica segura atende bem. Uma instância dedicada só deve aparecer quando
segurança, contrato, desempenho ou posicionamento justificarem esse desenho.

## Onde termina este trabalho

Esta especialista não presume que a cobrança precisa ser totalmente automática
no primeiro dia. Se uma operação acompanhada ajudar a validar a oferta, o plano
pode registrá-la como parte provisória do serviço.
