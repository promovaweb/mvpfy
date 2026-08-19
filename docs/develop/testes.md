# Testes

Execute:

```bash
npm test
npm run ebook:verify
```

Os testes conferem as 15 skills, frontmatter, metadados de interface, IDs do
template e os scripts de setup, registro, renderização e migração. Teste manual
recomendado: iniciar um projeto temporário, registrar uma resposta, executar a
migração duas vezes e conferir que nenhum bloco foi duplicado.

O teste da orquestradora também confirma a regra de uma pergunta por turno,
três opções prontas, `Avançar`, conversa livre e leitura somente de fontes
existentes do projeto consumidor.
