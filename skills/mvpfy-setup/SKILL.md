---
name: mvpfy-setup
description: Prepara, verifica e atualiza a estrutura do MVPFy no projeto consumidor, instalando skills e preservando MVP.md e o estado existente.
---

# Configurar o MVPFy

## Fluxo

1. Localize a raiz do projeto consumidor e leia as instruções existentes.
2. Execute um único comando:

   ```bash
   npx --yes @promovaweb/mvpfy install --project .
   ```

3. Confirme que `MVP.md`, `.mvpfy/state.json`, `.mvpfy/config.yaml` e as
   skills em `.agents/skills/` existem.
4. Execute `mvpfy doctor --project .` e `mvpfy progress --project .` para
   conferir a estrutura, o documento e o ponto de retomada.
5. Em uma atualização, execute `mvpfy update --project .` e preserve as
   respostas, o documento e as configurações existentes.

## Regras

- O setup é idempotente: crie apenas o que estiver ausente.
- Não altere `spec.md`, `specs/` ou arquivos do Specsfy.
- Não substitua respostas, escolhas ou conteúdo existente no `MVP.md`.
- Informe os arquivos criados, preservados e qualquer pendência real.
