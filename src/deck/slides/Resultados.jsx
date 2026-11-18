import { Fragment, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Frame, Kicker, Title, Lead, Card } from "./Frame";
import { R, Counter, HBars, pop, Cookie } from "../ui/ui";
import { TREATMENTS, CENTER, CHI, FACTOR_CHI, RATINGS, IMPROVEMENTS } from "../data";

const BRAND_CONFETTI = ["#ff6a3d", "#ffe08a", "#8fa3ff", "#ff9fb5", "#fff4e0"];
const burst = (delay = 0) =>
  setTimeout(() => {
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.65 }, colors: BRAND_CONFETTI, scalar: 1.1 });
  }, delay);

/* 11 · Ranking de la cata */
export const Ranking = () => {
  useEffect(() => {
    const t = burst(2300);
    return () => clearTimeout(t);
  }, []);
  const rows = [...TREATMENTS, { ...CENTER, label: "Base" }].sort((a, b) => b.votes - a.votes);
  const max = 7;
  return (
    <Frame className="ranking">
      <Kicker n="10">Resultado de la cata</Kicker>
      <Title size="m">De 24 catadores, la muestra <b>917</b> ganó.</Title>
      <div className="rank-wrap">
        <div className="vbars">
          {rows.map((t, i) => {
            const win = t.code === "917";
            return (
              <div key={t.code} className={`vbar ${win ? "win" : ""}`}>
                <span className="vbar-v"><Counter to={t.votes} delay={0.5 + i * 0.1} /></span>
                <div className="vbar-track">
                  <motion.div className="vbar-fill"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max((t.votes / max) * 100, 2)}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <span className="vbar-code">{t.code}</span>
                <span className="vbar-id">{t.label || t.id}</span>
              </div>
            );
          })}
        </div>
        <motion.div className="reveal-917"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ delay: 2.1, type: "spring", stiffness: 140, damping: 12 }}>
          <small>¿Por qué 917?</small>
          <p>Era el código de la muestra ganadora. <b>El público le puso el nombre.</b></p>
          <span className="r-meta">29 % de las elecciones · la receta base: solo 1 voto</span>
        </motion.div>
      </div>
    </Frame>
  );
};

/* 12 · Chi-cuadrado */
export const Chi = () => {
  const maxScale = 20;
  const pos = (v) => `${(v / maxScale) * 100}%`;
  return (
    <Frame className="chi">
      <Kicker n="11">Prueba chi-cuadrado (χ²)</Kicker>
      <Title size="m">¿Fue suerte? <em>Los números dicen que no.</em></Title>
      <div className="chi-grid">
        <Card className="chi-q">
          <h4>La pregunta</h4>
          <p>Si todas las galletas gustaran igual, cada una tendría ≈ <b>{CHI.expected.toLocaleString("es-CO")}</b> votos.</p>
          <div className="exp-vs">
            {TREATMENTS.map((t, i) => (
              <div key={t.id} className="ev">
                <motion.i className="obs" initial={{ height: 0 }} animate={{ height: t.votes * 18 }} transition={{ delay: 0.6 + i * 0.06 }} />
                <span>{t.id}</span>
              </div>
            ))}
            <motion.div className="exp-line" style={{ bottom: CHI.expected * 18 + 26 }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
              <span>esperado</span>
            </motion.div>
          </div>
        </Card>
        <Card className="chi-meter">
          <div className="chi-big">
            χ² = <Counter to={CHI.value} decimals={2} duration={2} delay={0.6} />
          </div>
          <div className="meter">
            <div className="meter-track">
              <div className="meter-zone" style={{ left: pos(CHI.critical) }} />
              <motion.div className="meter-fill" initial={{ width: 0 }} animate={{ width: pos(CHI.value) }} transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }} />
              <div className="meter-crit" style={{ left: pos(CHI.critical) }}><span>valor crítico 14,07</span></div>
            </div>
            <div className="meter-labels"><span>azar</span><span>preferencia real</span></div>
          </div>
          <div className="chi-facts">
            <span><b>7</b> grados de libertad</span>
            <span><b>α = 0,05</b></span>
            <span><b>p ≈ 0,02</b></span>
          </div>
          <motion.div className="verdict" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6 }}>
            Se rechaza que todas gusten igual: <b>el público sí tuvo una favorita.</b>
          </motion.div>
        </Card>
      </div>
    </Frame>
  );
};

/* 13 · Interacciones */
const Heat = ({ title, rows, cols, data }) => {
  const max = 10;
  return (
    <div className="heat">
      <h5>{title}</h5>
      <div className="heat-grid">
        <span />
        {cols.map((c) => <span key={c} className="hh">{c}</span>)}
        {rows.map((r, i) => (
          <Fragment key={r}>
            <span className="hr">{r}</span>
            {data[i].map((v, j) => (
              <motion.div key={`${r}${j}`} className="cell"
                style={{ background: `color-mix(in oklab, var(--tang) ${(v / max) * 100}%, var(--ink-3))` }}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.9 + (i * 2 + j) * 0.12, type: "spring" }}>
                {v}
              </motion.div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const Interacciones = () => (
  <Frame className="inter">
    <Kicker n="12">El hallazgo más interesante</Kicker>
    <Title size="m">Ningún ingrediente gana <em>solo</em>. Gana la <b>combinación</b>.</Title>
    <div className="inter-grid">
      <Card className="solo">
        <h4>Cada factor por separado</h4>
        <div className="solo-bars">
          {FACTOR_CHI.map((f, i) => (
            <div key={f.name} className="sb">
              <span className="sb-l">{f.name}<small>{f.a} {f.av} · {f.b} {f.bv}</small></span>
              <div className="sb-track">
                <motion.i initial={{ width: 0 }} animate={{ width: `${(f.chi / 5) * 100}%` }} transition={{ delay: 0.5 + i * 0.15, duration: 1 }} />
                <div className="sb-crit" style={{ left: `${(3.84 / 5) * 100}%` }} />
              </div>
              <b>{f.chi.toLocaleString("es-CO")}</b>
            </div>
          ))}
          <p className="foot">Ninguno supera 3,84 (el valor crítico). Por sí solos, no explican nada.</p>
        </div>
      </Card>
      <Card className="combo">
        <h4>Combinados (número de votos)</h4>
        <div className="heats">
          <Heat title="Azúcar × Mantequilla" cols={["Mant. baja", "Mant. alta"]} rows={["Azúcar alto", "Azúcar bajo"]} data={[[10, 3], [5, 5]]} />
          <Heat title="Azúcar × Reposo" cols={["30 min", "90 min"]} rows={["Azúcar alto", "Azúcar bajo"]} data={[[9, 4], [5, 5]]} />
        </div>
        <motion.p className="combo-k" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          El azúcar alto <b>solo</b> brilla con poca mantequilla y reposo corto. Esa es exactamente la 917.
        </motion.p>
      </Card>
    </div>
  </Frame>
);

/* 14 · Hipótesis vs realidad */
export const Hipotesis = () => (
  <Frame className="hipo">
    <Kicker n="13">Hipótesis vs. realidad</Kicker>
    <Title size="m">Nos equivocamos… y <em>eso</em> fue lo mejor.</Title>
    <div className="hipo-grid">
      <Card className="h-card">
        <span className="h-tag">Lo que esperábamos</span>
        <h3>Azúcar alto + <s>reposo largo</s></h3>
        <p>Creímos que más frío compensaría la expansión del azúcar.</p>
      </Card>
      <R v={pop} className="h-arrow">→</R>
      <Card className="h-card h-real" tone="tang">
        <span className="h-tag">Lo que eligió el público</span>
        <h3>Azúcar alto + <b>reposo corto</b></h3>
        <p>A −18 °C por 90 min la masa se endurece y el azúcar no alcanza a disolverse en 13 min de horno.</p>
      </Card>
    </div>
    <R className="quote">
      <span>“</span>Se sentían los granos de azúcar demasiado.<span>”</span>
      <small>— catadora que eligió la T6 (azúcar alto, 90 min)</small>
    </R>
    <R className="foot-note">Hipótesis cumplida parcialmente: sí hubo interacción azúcar × reposo, pero en dirección contraria.</R>
  </Frame>
);

/* 15 · La receta ganadora */
const RECIPE = [
  { v: "200 g", l: "azúcar morena", hi: true },
  { v: "75 g", l: "azúcar blanca", hi: true },
  { v: "200 g", l: "mantequilla", hi: true },
  { v: "30 min", l: "reposo en frío", hi: true },
  { v: "350 g", l: "harina de trigo" },
  { v: "350 g", l: "chips de chocolate" },
  { v: "2", l: "huevos" },
  { v: "350 g", l: "Nutella (relleno)" },
];

export const Receta = () => (
  <Frame className="receta">
    <Kicker n="14">La fórmula 917 · Tratamiento T2</Kicker>
    <Title size="m">Una receta definida con <em>datos</em>, no con intuición.</Title>
    <div className="receta-grid">
      <Card className="recipe-card">
        <div className="rc-head"><span>FÓRMULA</span><b>917</b></div>
        <ul>
          {RECIPE.map((r, i) => (
            <motion.li key={r.l} className={r.hi ? "hi" : ""}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.07 }}>
              <b>{r.v}</b><span>{r.l}</span>
            </motion.li>
          ))}
        </ul>
        <div className="rc-foot">160 °C · 13 min · porciones de 50 g · 26 galletas por lote</div>
      </Card>
      <Card className="ratings">
        <h4>Calificación de las favoritas <small>(1 a 5, n = 24)</small></h4>
        <HBars data={RATINGS} max={5} unit="" decimals={1} highlight={0} height={26} />
      </Card>
    </div>
  </Frame>
);

/* 16 · Después de probarla */
export const Probarla = () => (
  <Frame className="probarla">
    <Kicker n="15">El efecto de probarla</Kicker>
    <Title size="m">Cuando la prueban, <em>la quieren comprar.</em></Title>
    <div className="prob-grid">
      <Card className="jump">
        <h4>Intención de compra: “sí”</h4>
        <div className="jump-bars">
          <div className="jb">
            <motion.i initial={{ height: 0 }} animate={{ height: "64%" }} transition={{ delay: 0.5, duration: 1 }} />
            <b><Counter to={64} suffix="%" delay={0.5} /></b>
            <span>Solo con la idea</span>
          </div>
          <div className="jb hot">
            <motion.i initial={{ height: 0 }} animate={{ height: "92%" }} transition={{ delay: 1.1, duration: 1.2 }} />
            <b><Counter to={92} suffix="%" delay={1.1} /></b>
            <span>Después de probarla</span>
          </div>
        </div>
        <p className="foot">Y nadie respondió “no”.</p>
      </Card>
      <div className="prob-stats">
        <Card tone="butter" className="ps"><b><Counter to={96} suffix="%" /></b><span>dulzor en su punto justo<br /><small>aunque tiene el azúcar alto</small></span></Card>
        <Card tone="blush" className="ps"><b><Counter to={88} suffix="%" /></b><span>Nutella en su punto justo</span></Card>
      </div>
      <Card className="improve">
        <h4>¿Qué le mejorarías?</h4>
        <HBars data={IMPROVEMENTS} max={9} unit="" highlight={0} height={24} />
      </Card>
    </div>
  </Frame>
);

/* 17 · Consistencia */
const THICK = [
  { label: "0,7 cm", value: 10.85 },
  { label: "0,8 cm", value: 9.58 },
  { label: "0,9 cm", value: 8.78 },
  { label: "1,0 cm", value: 7.51 },
  { label: "1,1 cm", value: 6.77 },
];

export const Consistencia = () => (
  <Frame className="consis">
    <Kicker n="16">Control de calidad · 20 galletas medidas</Kicker>
    <Title size="m">Lo que separa una galleta casera de un producto: <em>consistencia.</em></Title>
    <div className="consis-grid">
      <Card className="diam">
        <div className="diam-cookies">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.1, type: "spring" }}>
              <Cookie size={92} seed={300 + i * 13} glow={false} />
            </motion.div>
          ))}
        </div>
        <div className="diam-big"><Counter to={7.6} decimals={2} suffix=" cm" /></div>
        <p>diámetro promedio · varía solo <b>3,0 %</b></p>
        <div className="ci">
          <div className="ci-track">
            <motion.div className="ci-band" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }}
              style={{ left: `${((7.49 - 7.2) / 1.1) * 100}%`, width: `${((7.71 - 7.49) / 1.1) * 100}%` }} />
            <div className="ci-mean" style={{ left: `${((7.6 - 7.2) / 1.1) * 100}%` }} />
          </div>
          <div className="ci-l"><span>7,25 mín</span><span>IC 95 %: 7,49 – 7,71</span><span>8,25 máx</span></div>
        </div>
        <p className="foot">La clave: porcionar cada galleta con balanza.</p>
      </Card>
      <Card className="thick">
        <h4>Factor de expansión según grosor</h4>
        <HBars data={THICK} max={11} unit="" decimals={2} color="var(--sky)" highlight={4} height={34} />
        <p className="foot">Cada milímetro extra de grosor baja la expansión ≈ 1 punto. <b>Más gruesa = más estilo Crumbl.</b> Próximo paso: calibrador digital.</p>
      </Card>
    </div>
  </Frame>
);
