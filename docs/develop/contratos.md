# Contratos

Especialistas recebem um pacote YAML com projeto, pedido, campos conhecidos,
escolhas, hipóteses, lacunas, conflitos e modo da entrevista. A resposta
retorna fatos, escolhas, recomendações, campos resolvidos, lacunas e
`next_question`.

A especialista não deve perguntar várias coisas nem escrever fora da própria
área. A orquestradora integra retornos e elimina repetição.

## Contrato de uma pergunta

`next_question` representa uma única pergunta principal. A especialista devolve
três opções prontas. A orquestradora adiciona:

```text
4. Avançar
5. Conversar mais sobre este tema
```

`Avançar` aceita a definição atual. A opção 5 recebe texto livre sobre a mesma
pergunta, registra essa conversa e permite reavaliar a lacuna sem apresentar
outra pergunta no turno atual.
