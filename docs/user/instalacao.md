# Instalação

No projeto consumidor, instale o catálogo:

```bash
npx skills add promovaweb/mvpfy
```

Depois, peça ao agente: “Quero começar meu primeiro MVP SaaS com o MVPFy”. A
skill cria ou usa `.mvpfy/` e mantém o plano em `Company.md`.

Para preparar a estrutura sem iniciar a conversa:

```bash
node skills/mvpfy/scripts/setup-project.mjs --project .
```

Não coloque respostas de uma empresa cliente no repositório da biblioteca.
