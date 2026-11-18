# 917 · Pitch Shark Tank

Presentación interactiva (React + Vite + Framer Motion) del proyecto
**"Ingeniería del Sabor"** — Grado 11°, Instituto Pedagógico CREAR.

## Correr
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera /dist para Vercel
```

## Cómo presentar
| Acción | Tecla / gesto |
|---|---|
| Empezar (conteo 3·2·1) | Clic, Enter o Espacio |
| Siguiente | Clic en cualquier parte, →, Espacio, Enter |
| Anterior | ←, Backspace o botón ‹ |
| Ir a un slide | Clic en la barra de progreso de arriba |
| Primera / última | Home / End |
| Pantalla completa | F o botón ⤢ |

No hay temporizador: cada diapositiva espera al clic.

## Dónde editar
- `src/deck/data.js` — **todos los números** (encuestas, χ², costos, precio, pedido) y los nombres de los Sharks.
- `src/deck/slides/index.js` — orden de las diapositivas.
- `src/deck/slides/*.jsx` — textos de cada diapositiva.
- `src/index.css` — paleta de la marca (variables `--tang`, `--butter`, `--sky`, …).
- `src/deck/deck.css` — estilos de cada diapositiva.

## Marca
- **Nombre:** 917 (el código de la muestra que ganó la cata a ciegas).
- **Paleta "laboratorio de medianoche":** cobalto `#0f1538`, mandarina `#ff6a3d`, mantequilla `#ffe08a`, cobalto claro `#8fa3ff`, avellana rosada `#ff9fb5`, crema `#fff4e0`.
- **Tipografías:** Bricolage Grotesque (títulos), Instrument Serif itálica (acentos), JetBrains Mono (datos y códigos).
