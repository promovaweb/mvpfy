# Acessibilidade das cores

Este relatório foi calculado pela fórmula de luminância relativa da WCAG 2.2 a
partir de `brand/colors/palette.json`. Uma aprovação numérica não substitui o
teste do componente, dos estados e do arquivo rasterizado.

## Pares de interface

| Modo | Uso | Primeiro plano | Fundo | Proporção | Mínimo | Resultado |
| --- | --- | --- | --- | ---: | ---: | --- |
| light | texto principal | `#001117` | `#FFFFFF` | 19.22:1 | 4.5:1 | Aprovado |
| light | texto principal em superfície | `#001117` | `#F2F8F9` | 17.91:1 | 4.5:1 | Aprovado |
| light | texto secundário | `#2D4C58` | `#FFFFFF` | 9.19:1 | 4.5:1 | Aprovado |
| light | acento usado como texto | `#B45309` | `#FFFFFF` | 5.02:1 | 4.5:1 | Aprovado |
| light | acento usado como texto em superfície | `#B45309` | `#F2F8F9` | 4.68:1 | 4.5:1 | Aprovado |
| light | indicador de foco | `#15626A` | `#FFFFFF` | 7.03:1 | 3:1 | Aprovado |
| dark | texto principal | `#F2F8F9` | `#000A0E` | 18.64:1 | 4.5:1 | Aprovado |
| dark | texto principal em superfície | `#F2F8F9` | `#001117` | 17.91:1 | 4.5:1 | Aprovado |
| dark | texto secundário | `#B2C6CE` | `#000A0E` | 11.30:1 | 4.5:1 | Aprovado |
| dark | acento usado como texto | `#FCD34D` | `#000A0E` | 13.87:1 | 4.5:1 | Aprovado |
| dark | acento usado como texto em superfície | `#FCD34D` | `#001117` | 13.33:1 | 4.5:1 | Aprovado |
| dark | indicador de foco | `#5EEDE1` | `#000A0E` | 13.98:1 | 3:1 | Aprovado |

## Pares do logo

Elementos gráficos do símbolo seguem o mínimo de 3:1 para objetos não
textuais.

| Uso | Primeiro plano | Fundo | Proporção | Mínimo | Resultado |
| --- | --- | --- | ---: | ---: | --- |
| ícone: degraus turquesa sobre placa | `#2AD5BE` | `#00161E` | 10.02:1 | 3:1 | Aprovado |
| ícone: bandeira âmbar sobre placa | `#F59E0B` | `#00161E` | 8.63:1 | 3:1 | Aprovado |
| ícone: mastro claro sobre placa | `#F2F8F9` | `#00161E` | 17.27:1 | 3:1 | Aprovado |
| fundo claro: degraus e nome petróleo sobre branco | `#00161E` | `#FFFFFF` | 18.53:1 | 3:1 | Aprovado |
| fundo claro: mastro sobre branco | `#15626A` | `#FFFFFF` | 7.03:1 | 3:1 | Aprovado |
| fundo claro: bandeira âmbar sobre branco | `#B45309` | `#FFFFFF` | 5.02:1 | 3:1 | Aprovado |
| fundo escuro: degraus turquesa sobre petróleo | `#2AD5BE` | `#000A0E` | 10.82:1 | 3:1 | Aprovado |
| fundo escuro: bandeira âmbar sobre petróleo | `#F59E0B` | `#000A0E` | 9.31:1 | 3:1 | Aprovado |
| fundo escuro: nome e mastro claros sobre petróleo | `#F2F8F9` | `#000A0E` | 18.64:1 | 3:1 | Aprovado |

O âmbar `#F59E0B` sobre branco fica em 2.15:1. Por isso a
variante para fundo claro usa `#B45309`, e o acento textual do light mode
também usa `#B45309`.
