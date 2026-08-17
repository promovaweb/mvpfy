# Especificação do MVPFy

## Finalidade

O MVPFy é uma suíte de skills para uma pessoa que está criando uma empresa e
seu primeiro produto SaaS. Ele transforma contexto em um plano de MVP para
produto, desenvolvimento, website, marca, marketing, vendas e operação.

O artefato central é `MVP.md`. O MVPFy não cria `spec.md`, não executa o
método do Specsfy e não altera arquivos do repositório Specsfy.

## Entrada e fontes

O usuário pode começar com uma frase, uma ideia detalhada, URLs de concorrentes
ou arquivos existentes no projeto. A orquestradora lê, em modo somente leitura,
`MVP.md`, `.mvpfy/`, specs, backlogs, briefs, docs, tickets e planos. Uma
informação clara encontrada nessas fontes vale como contexto preenchido e não
deve voltar como pergunta.

Uma mensagem pode conter o plano inteiro conhecido até aquele momento. Antes
de cada pergunta, a orquestradora analisa a mensagem completa, os eventos
anteriores, o `MVP.md` e as referências disponíveis. Ela registra todos os
campos identificados e pergunta somente sobre a lacuna prioritária restante.
Mensagens adicionais durante a entrada inicial são acumuladas. a opção 4
continua disponível para iniciar as perguntas fechadas.

## Contrato rígido da entrevista

Cada turno tem exatamente uma pergunta principal. A mensagem pode conter uma
confirmação curta e contexto, mas termina com exatamente cinco opções:

1. resposta pronta.
2. resposta pronta.
3. resposta pronta.
4. `Avançar`.
5. `Conversar mais sobre este tema`.

As opções 1, 2 e 3 respondem à mesma pergunta. `Avançar` aceita o entendimento
atual e segue para a próxima lacuna. `Conversar mais sobre este tema` abre
texto livre sobre a pergunta atual. A resposta livre é salva, analisada e só
então a próxima pergunta pode aparecer em um novo turno.

O percurso fechado tem no máximo oito perguntas. Cada etapa recebe uma pergunta
essencial: problema, público, produto, mercado, tecnologia e marketing. SaaS
pode receber duas, uma para o modelo de atendimento e outra para a unidade do
tenant. Se a entrada inicial ou as fontes de consulta já cobrirem uma etapa,
ela é pulada. Depois do teto, o sistema consolida o `MVP.md` e registra o
restante como recomendação ou hipótese.

É inválido exibir duas perguntas, pedir que a pessoa responda dois campos,
mostrar um formulário ou adicionar uma sexta opção.

## Ciclo de persistência

1. Ler fontes e estado atuais.
2. Escolher uma lacuna prioritária.
3. Exibir a pergunta única e as cinco opções.
4. Receber número ou texto livre.
5. Salvar resposta bruta e interpretação.
6. Atualizar fatos, escolhas, hipóteses e áreas cobertas.
7. Atualizar `MVP.md` quando aplicável.
8. Só então selecionar o próximo turno.

Se a gravação falhar, o MVPFy repete a mesma pergunta. Ele não avança com
estado incerto.

## Especialistas

| Skill | Responsabilidade |
| --- | --- |
| `mvpfy` | Orquestração, contexto, estado e pergunta única. |
| `mvpfy-problem` | Problema, situação, alternativa e hipótese. |
| `mvpfy-audience` | Segmentos, papéis e personas. |
| `mvpfy-product` | Proposta, jornada e escopo 1.0. |
| `mvpfy-saas` | Espaço do cliente, acesso, onboarding, cobrança e retenção. |
| `mvpfy-brand` | Posicionamento, nome e slogan. |
| `mvpfy-market` | Concorrentes, alternativas, fontes e preços observados. |
| `mvpfy-pricing` | Modelo de cobrança, faixas e cenários econômicos. |
| `mvpfy-technology` | Laravel, VPS, dados, arquivos, IA e operação. |
| `mvpfy-marketing` | Website, conteúdo, leads, venda e lançamento. |
| `mvpfy-document` | Renderização e validação do `MVP.md`. |
| `mvpfy-migrate` | Atualização do template com preservação. |

## Escopo do primeiro SaaS

O plano precisa definir um público, um problema, uma promessa e uma jornada
principal. Também precisa explicar titular do espaço, pessoas usuárias, primeiro valor,
assinatura, suporte, cancelamento, custo, preço e métricas.

Itens interessantes que não apoiam a validação entram fora da versão 1.0.
Processos manuais podem aparecer como operação provisória quando reduzem o
tempo de construção.

## Tecnologia preferencial

Laravel em VPS é a base inicial. PostgreSQL, Supabase, object storage,
provedor de e-mail e IA entram conforme a jornada exigir. Node.js só entra com
justificativa concreta. A recomendação registra custo, premissa e condição para
revisão.

## `MVP.md`

O template possui 35 seções com IDs estáveis. O documento distingue confirmado,
recomendado, hipótese e pendência. `preliminary` significa que há lacunas.
`ready` significa que os campos mínimos do MVP SaaS estão descritos.
`validated` significa que as hipóteses principais foram conferidas fora da
entrevista.

## Migração

Quando a versão do template muda, `mvpfy-migrate` adiciona seções ausentes,
mantém conteúdo, marca campos novos e devolve uma única pendência. Não migra
specs, backlogs, `spec.md` ou qualquer arquivo externo ao MVPFy.

## Aceite

- uma pergunta principal por turno.
- três opções prontas, `Avançar` e conversa livre.
- gravação antes da pergunta seguinte.
- leitura de contexto existente sem escrita nesses arquivos.
- retomada depois de pausa.
- correção com histórico.
- `MVP.md` idempotente e validável.
- 12 skills com responsabilidades separadas.
- PDF e EPUB reconstruíveis a partir da documentação.
