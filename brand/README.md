# Marca MVPFy

O MVPFy transforma uma ideia inicial no plano do primeiro produto SaaS, com
entrevista guiada e um único documento `MVP.md`. Sua identidade combina o
petróleo e o turquesa da Promovaweb com âmbar, cor própria do projeto
associada à meta alcançada e ao produto que chega ao ar.

## Conceito visual

O símbolo mostra **degraus até o MVP**: três degraus turquesa sobem até uma
bandeira âmbar fincada no topo. Cada degrau é uma etapa do plano (ideia,
entrevista e documento), e a bandeira marca o primeiro produto no ar.

## Arquivos oficiais

| Arquivo | Uso |
| --- | --- |
| `logo/icon.svg` | ícone principal com placa petróleo |
| `logo/icon-light.svg` | ícone transparente sobre fundo claro |
| `logo/icon-dark.svg` | ícone transparente sobre fundo escuro |
| `logo/logo-light.svg` | assinatura horizontal sobre fundo claro |
| `logo/logo-dark.svg` | assinatura horizontal sobre fundo escuro |
| `logo/icon.png` | fallback raster de 512 × 512 px |
| `logo/icon-light.png`, `logo/icon-dark.png` | fallbacks raster de 512 × 512 px |
| `logo/logo-light.png`, `logo/logo-dark.png` | fallbacks raster de 1300 × 519 px, usados no README |
| `logo/icon-16w.png` a `logo/icon-512w.png` | favicons e ícones de aplicativo (16, 32, 48, 180, 192 e 512 px) |

O nome na assinatura já está convertido em curvas (Manrope 750). As
dimensões e os hashes de cada arquivo ficam em `manifest.json`.

Use a variante correspondente ao fundo. Preserve 12,5% de área livre ao redor
do ativo. O tamanho mínimo é 24 px para o ícone e 140 px para a assinatura.

## Sistema digital

- `colors/palette.json`: fonte editável da paleta;
- `tokens.json`: tokens agnósticos;
- `global.css`: webfontes, variáveis CSS e troca de tema;
- `tailwind-theme.js`: extensão para Tailwind CSS;
- `accessibility.md`: relatório de contraste;
- `typography/README.md`: hierarquia tipográfica;
- `fonts/`: Manrope e Inter latinas, com as licenças OFL;
- `style-guide.html`: guia visual de consulta rápida.

## Regras para agentes

1. Use os ativos desta pasta sem redesenhá-los.
2. Âmbar indica meta, entrega ou destaque; turquesa identifica a família.
3. Sobre fundo claro, o âmbar do logo e do texto é `#B45309`; `#F59E0B`
   fica reservado a fundos escuros e áreas gráficas.
4. Estado nunca depende apenas de cor: inclua texto, ícone ou posição.
5. Use tokens semânticos e a variante correta para light ou dark mode.
6. Não aplique filtros, gradientes, sombras, rotações ou deformações.
