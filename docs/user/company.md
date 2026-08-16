# O arquivo `Company.md`

`Company.md` é a entrega central do MVPFy. Ele deve ser compreensível sem o
histórico da conversa e útil para equipes diferentes trabalharem no mesmo MVP.

## Estados do documento

| Estado | Significado |
| --- | --- |
| `preliminary` | Há conteúdo aproveitável, mas faltam escolhas importantes. |
| `ready` | Os campos mínimos do primeiro SaaS estão descritos e coerentes. |
| `validated` | As hipóteses principais já foram conferidas fora da entrevista. |

O estado não é uma nota de qualidade. Ele mostra quanto do plano já foi
confirmado.

## Estrutura canônica

O template atual contém 35 áreas:

1. resumo executivo;
2. empresa e contexto;
3. modelo da empresa SaaS;
4. problema;
5. comprovação, alternativas e hipóteses;
6. público-alvo;
7. usuário, comprador e pagador;
8. personas;
9. proposta de valor e posicionamento;
10. nome, marca e slogan;
11. jornada principal;
12. conta, acesso e isolamento;
13. onboarding e primeiro valor;
14. escopo funcional 1.0;
15. módulos e funcionalidades;
16. perfis e permissões;
17. assinatura e cobrança;
18. suporte, retenção e cancelamento;
19. processos manuais;
20. fora do MVP;
21. concorrentes e alternativas;
22. modelo comercial e preço;
23. custos e economia unitária;
24. tecnologia e arquitetura;
25. infraestrutura e operação;
26. uso de IA;
27. website;
28. marketing;
29. vendas e lançamento;
30. métricas;
31. validações e dependências;
32. execução;
33. escolhas confirmadas;
34. hipóteses e pendências;
35. fontes.

Cada seção possui um comentário estável como
`<!-- mvpfy:section:problem-definition -->`. O título pode mudar sem fazer o
renderer perder o conteúdo.

## Fato, recomendação e hipótese

O documento usa rótulos claros:

- **Confirmado:** informação declarada por você ou comprovada por uma fonte.
- **Recomendado:** sugestão feita por uma especialista com base no contexto.
- **Hipótese:** afirmação ainda não conferida com pessoas, mercado ou uso.
- **Pendente:** dado necessário que ainda não foi fornecido.

Essa separação impede que uma estimativa de preço pareça uma pesquisa concluída
ou que uma sugestão de Laravel pareça uma exigência do produto.

## Atualização sem perda

Quando o template evolui, `mvpfy-migrate` insere seções novas, preserva o texto
existente e marca os campos que precisam de resposta. Depois da migração, a
orquestradora faz apenas uma pergunta nova por vez.
