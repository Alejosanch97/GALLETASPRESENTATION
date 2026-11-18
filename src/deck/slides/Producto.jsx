import { motion } from "framer-motion";
import { Frame, Kicker, Title, Lead, Card } from "./Frame";
import { R, Cookie, Icon, pop } from "../ui/ui";
import { FACTORS, TREATMENTS, CENTER } from "../data";

/* 07 · La solución */
const CALLOUTS = [
  { t: "Centro suave", d: "El azúcar morena retiene humedad", x: -330, y: -150, side: "l" },
  { t: "Borde dorado", d: "Reacción de Maillard a 160 °C", x: 330, y: -170, side: "r" },
  { t: "Corazón de Nutella", d: "≈13,5 g por galleta", x: -350, y: 120, side: "l" },
  { t: "Chispas de chocolate", d: "350 g por lote", x: 340, y: 110, side: "r" },
];

export const Solucion = () => (
  <Frame className="solucion">
    <Kicker n="06">La solución</Kicker>
    <Title size="m">Les presentamos la <b>917</b>.</Title>
    <div className="sol-stage">
      <R v={pop} className="sol-cookie">
        <Cookie size={400} seed={21} />
        <motion.div className="nutella-core" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} />
      </R>
      {CALLOUTS.map((c, i) => (
        <motion.div
          key={c.t}
          className={`callout-tag ${c.side}`}
          style={{ x: c.x, y: c.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.18, type: "spring", stiffness: 140 }}
        >
          <b>{c.t}</b>
          <span>{c.d}</span>
        </motion.div>
      ))}
    </div>
    <R className="sol-line">
      Galleta gourmet de 50 g · <b>elegida a ciegas por el público</b> · repetible lote tras lote
    </R>
  </Frame>
);

/* 08 · El experimento */
export const Experimento = () => (
  <Frame className="experimento">
    <Kicker n="07">La ciencia detrás</Kicker>
    <Title size="m">No adivinamos la receta. <em>Diseñamos un experimento.</em></Title>
    <div className="grid-3">
      {FACTORS.map((f, i) => (
        <Card key={f.key} className="factor">
          <div className="factor-head">
            <span className="factor-k">{f.key}</span>
            <Icon name={f.icon} size={44} />
          </div>
          <h3>{f.name}</h3>
          <div className="lvl">
            <div className="lvl-row"><span className="lvl-tag low">−1</span>{f.low}</div>
            <div className="lvl-row"><span className="lvl-tag high">+1</span>{f.high}</div>
          </div>
        </Card>
      ))}
    </div>
    <R className="constants">
      <span>Lo que <b>no</b> cambió:</span>
      <span className="const"><Icon name="oven" size={26} /> 160 °C</span>
      <span className="const">⏱ 13 min</span>
      <span className="const"><Icon name="scale" size={26} /> 50 g por galleta</span>
      <span className="const">Mismas marcas y equipos</span>
    </R>
  </Frame>
);

/* 09 · El cubo 2³ */
const S = 150;
const proj = (x, y, z) => {
  // x: azúcar, y: mantequilla (vertical), z: reposo
  // proyección oblicua (para que el vértice T8 no tape el punto central)
  const px = 300 + x * S * 0.95 - z * S * 0.5;
  const py = 270 - y * S * 0.95 + z * S * 0.38;
  return [px, py];
};
const EDGES = [];
TREATMENTS.forEach((a, i) =>
  TREATMENTS.forEach((b, j) => {
    if (j <= i) return;
    const diff = (a.A !== b.A) + (a.B !== b.B) + (a.C !== b.C);
    if (diff === 1) EDGES.push([a, b]);
  })
);

export const Cubo = () => (
  <Frame className="cubo">
    <div className="cubo-text">
      <Kicker n="08">Diseño factorial 2³</Kicker>
      <Title size="m">3 factores × 2 niveles = <b>8 recetas</b>.</Title>
      <Lead>
        Cada vértice del cubo es una receta. En el centro, la receta base (código {CENTER.code}).
        Cambiar un ingrediente a la vez <em>esconde</em> cómo se combinan; el diseño factorial las mide todas a la vez.
      </Lead>
      <R className="cubo-legend">
        <span><i className="ax ax-a" />Azúcar →</span>
        <span><i className="ax ax-b" />Mantequilla ↑</span>
        <span><i className="ax ax-c" />Reposo ↙</span>
      </R>
      <R className="masas">4 masas · cada una dividida en 2 bandejas (30 y 90 min) · 3 parejas · horneado sorteado</R>
    </div>
    <R v={pop} className="cubo-svg">
      <svg viewBox="0 0 600 560" width="640" height="600">
        <g transform="translate(0,40)">
          {EDGES.map(([a, b], i) => {
            const [x1, y1] = proj(a.A, a.B, a.C);
            const [x2, y2] = proj(b.A, b.B, b.C);
            const axis = a.A !== b.A ? "var(--tang)" : a.B !== b.B ? "var(--butter)" : "var(--sky)";
            return (
              <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={axis} strokeWidth="2.5" strokeOpacity=".75"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }} />
            );
          })}
          {(() => {
            const [cx, cy] = proj(0, 0, 0);
            return (
              <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.8 }} style={{ originX: `${cx}px`, originY: `${cy}px` }}>
                <circle cx={cx} cy={cy} r="24" fill="var(--ink-3)" stroke="var(--cream)" strokeDasharray="4 4" />
                <text x={cx} y={cy + 5} textAnchor="middle" className="node-t">{CENTER.code}</text>
              </motion.g>
            );
          })()}
          {TREATMENTS.map((t, i) => {
            const [x, y] = proj(t.A, t.B, t.C);
            const win = t.code === "917";
            return (
              <motion.g key={t.id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.07 }}>
                <circle cx={x} cy={y} r="34" fill={win ? "var(--tang)" : "var(--ink-2)"} stroke={win ? "var(--butter)" : "var(--line-strong)"} strokeWidth="2" />
                <text x={x} y={y - 3} textAnchor="middle" className="node-id">{t.id}</text>
                <text x={x} y={y + 14} textAnchor="middle" className="node-t">{t.code}</text>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </R>
  </Frame>
);

/* 10 · La cata a ciegas */
const STEPS = [
  { n: "24", t: "catadores", d: "estudiantes de 6°, 9°, 10° y 11°" },
  { n: "5", t: "platos", d: "4 tratamientos + la receta base" },
  { n: "3", t: "dígitos", d: "nadie sabía qué receta probaba" },
  { n: "1", t: "favorita", d: "y la calificaron de 1 a 5" },
];
const PLATES = ["917", "235", "358", "764", "846"];

export const Cata = () => (
  <Frame className="cata">
    <Kicker n="09">Prueba sensorial · Encuesta 2</Kicker>
    <Title size="m">Una cata <em>a ciegas</em>. Que hable el paladar, no la marca.</Title>
    <div className="plates">
      {PLATES.map((p, i) => (
        <motion.div key={p} className="plate"
          initial={{ y: 80, opacity: 0, rotate: -20 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 120 }}>
          <Cookie size={120} seed={100 + i * 7} glow={false} />
          <span className="plate-code">{p}</span>
        </motion.div>
      ))}
    </div>
    <div className="steps">
      {STEPS.map((s) => (
        <Card key={s.t} className="step">
          <b>{s.n}</b><span>{s.t}</span><p>{s.d}</p>
        </Card>
      ))}
    </div>
    <R className="foot-note">Orden aleatorio entre rondas · agua entre muestras · 25–26 oct 2026</R>
  </Frame>
);
