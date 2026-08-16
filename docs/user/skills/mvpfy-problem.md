# Skill `mvpfy-problem`

Esta especialista transforma uma descrição de solução em um problema de
negócio observável. “Preciso de um aplicativo” é uma entrada; a saída precisa
explicar qual situação gera perda, atraso, erro, custo ou insegurança.

## Analisa

- situação e frequência;
- pessoa afetada;
- tarefa que ela tenta realizar;
- impacto atual;
- alternativa usada hoje;
- motivo da insuficiência;
- comprovações já disponíveis;
- hipótese que o MVP deve testar.

## Saída

```text
Para [público], que precisa [tarefa], o problema é [dificuldade], causando
[impacto]. Hoje usa [alternativa], que falha porque [limitação]. O MVP deve
testar [hipótese].
```

## Exemplo

“Agências perdem leads” ainda precisa de frequência, consequência e alternativa.
Se o contexto existente já disser que os contatos chegam por três canais e são
controlados em planilhas, a especialista usa essa informação e pergunta apenas
o ponto decisivo que faltar.

## Não faz

Não escolhe framework, não cria módulos e não define preço. Faz handoff para
`mvpfy-audience` quando o grupo afetado estiver claro.
