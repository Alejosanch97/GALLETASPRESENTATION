import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Frame, Kicker, Title, Lead, Card } from "./Frame";
import { R, Counter, Donut, Legend, Cookie, Icon, Logo, pop } from "../ui/ui";
import { Countdown } from "../Countdown";
import { RAW_COSTS, UNIT_COST, PRICES, ASK, TEAM, SHARKS, money } from "../data";

const BRAND_CONFETTI = ["#ff6a3d", "#ffe08a", "#8fa3ff", "#ff9fb5", "#fff4e0"];

/* 18 · Costos de materias primas */
export const Costos = () => (
  <Frame className="costos">
    <Kicker n="17">Análisis financiero</Kicker>
    <Title size="m">Lo que más cuesta es lo que nos hace <em>irresistibles</em>.</Title>
    <div className="costos-grid">
      <R v={pop}>
        <Donut data={RAW_COSTS} size={380} stroke={56}
          center={<><b><Counter to={57001} prefix="$" /></b><small>materias primas por lote</small></>} />
      </R>
      <div className="costos-side">
        <Legend data={RAW_COSTS} format={(v, d) => `${money(v)} · ${d.pct.toLocaleString("es-CO")} %`} />
        <Card tone="tang" className="big-insight">
          <b>Nutella + chocolate = 78 %</b>
          <span>Harina, huevos y azúcares: menos del 8 %. Para mejorar el margen, hay que comprar esos dos al por mayor.</span>
        </Card>
      </div>
    </div>
  </Frame>
);

/* 19 · La ganadora es más barata */
export const MasBarata = () => (
  <Frame className="barata">
    <Kicker n="18">El bonus del experimento</Kicker>
    <Title size="m">La que más gustó es también la <b>más barata</b>.</Title>
    <div className="vs">
      <Card className="vs-card">
        <span className="vs-tag">Receta base · 846</span>
        <div className="vs-price">$2.301</div>
        <ul><li>225 g mantequilla</li><li>200 g azúcares</li><li>25 galletas por lote</li></ul>
      </Card>
      <R v={pop} className="vs-mid">
        <div className="saving"><Counter to={-4.7} decimals={1} suffix="%" delay={0.9} /></div>
        <span>−$109 por galleta</span>
      </R>
      <Card className="vs-card win" tone="tang">
        <span className="vs-tag">Fórmula 917</span>
        <div className="vs-price">$2.192</div>
        <ul><li><b>−25 g</b> mantequilla (lo caro)</li><li><b>+75 g</b> azúcares (lo barato)</li><li><b>26</b> galletas por lote</li></ul>
      </Card>
    </div>
    <Lead>El diseño experimental no solo mejoró el sabor: <em>mejoró la rentabilidad.</em></Lead>
  </Frame>
);

/* 20 · Costo total por galleta */
export const CostoTotal = () => (
  <Frame className="ctotal">
    <Kicker n="19">Costo real de una galleta</Kicker>
    <Title size="m">Producir una 917 cuesta <b><Counter to={3140} prefix="$" delay={0.4} /></b></Title>
    <R className="stack">
      {UNIT_COST.map((u, i) => (
        <motion.div key={u.label} className="stack-seg" style={{ background: u.color }}
          initial={{ width: 0 }} animate={{ width: `${u.pct}%` }}
          transition={{ delay: 0.6 + i * 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          {u.pct > 8 && <span>{u.pct.toLocaleString("es-CO")} %</span>}
        </motion.div>
      ))}
    </R>
    <div className="grid-4">
      {UNIT_COST.map((u) => (
        <Card key={u.label} className="cost-item">
          <i style={{ background: u.color }} />
          <b>{money(u.value)}</b>
          <span>{u.label}</span>
        </Card>
      ))}
    </div>
    <R className="foot-note">Si los estudiantes atienden el negocio sin pagar mano de obra, el costo baja a ≈ $2.539.</R>
  </Frame>
);

/* 21 · Precio */
export const Precio = () => {
  const maxM = 1400;
  return (
    <Frame className="precio">
      <Kicker n="20">Precio y margen</Kicker>
      <Title size="m">Gourmet a <b>$4.000</b>. Menos de un tercio de la competencia.</Title>
      <div className="precio-grid">
        <Card className="margins">
          <h4>Margen de contribución por precio</h4>
          <div className="mbars">
            {PRICES.map((p, i) => {
              const chosen = p.price === 4000;
              const h = (Math.abs(p.margin) / maxM) * 100;
              return (
                <div key={p.price} className={`mb ${chosen ? "chosen" : ""} ${p.margin < 0 ? "neg" : ""}`}>
                  <div className="mb-area">
                    <motion.i initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.15, duration: 0.9 }} />
                    <b>{p.margin < 0 ? "−" : ""}{money(Math.abs(p.margin))}</b>
                  </div>
                  <span className="mb-price">{money(p.price)}</span>
                  <small>{p.breakeven ? `${p.breakeven} galletas para recuperar` : "pierde dinero"}</small>
                </div>
              );
            })}
          </div>
        </Card>
        <div className="precio-side">
          <Card className="compare">
            <h4>Frente a la competencia</h4>
            <div className="cmp">
              <div className="cmp-row">
                <span>917</span>
                <motion.i className="us" initial={{ width: 0 }} animate={{ width: `${(4000 / 15000) * 100}%` }} transition={{ delay: 0.8, duration: 1 }} />
                <b>$4.000</b>
              </div>
              <div className="cmp-row">
                <span>Crumbl Bogotá</span>
                <motion.i className="them" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5, duration: 1.2 }} />
                <b>$13–15 mil</b>
              </div>
            </div>
          </Card>
          <div className="promo-row">
            <Card tone="butter" className="promo"><small>Promo</small><b>3 × $11.000</b></Card>
            <Card tone="tang" className="promo"><small>Punto de equilibrio</small><b><Counter to={75} /> galletas</b><span>≈ 3 lotes</span></Card>
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* 22 · Modelo de negocio */
const BLOCKS = [
  { icon: "users", t: "A quién", items: ["Estudiantes de bachillerato · 12–17 años", "Docentes y padres en eventos del colegio"] },
  { icon: "store", t: "Dónde", items: ["Tienda del colegio y descansos", "Encargos: cumpleaños y celebraciones", "Ferias del colegio → panaderías cercanas"] },
  { icon: "bag", t: "Cómo llega fresca", items: ["Bolsa individual de alta barrera", "Se empaca 100 % fría (sin vapor)", "Etiqueta: ingredientes y fecha"] },
];

export const Modelo = () => (
  <Frame className="modelo">
    <Kicker n="21">Modelo de negocio</Kicker>
    <Title size="m">Un negocio pensado para <em>nuestro</em> colegio, listo para crecer.</Title>
    <div className="grid-3">
      {BLOCKS.map((b, i) => (
        <Card key={b.t} className="block" tone={["tang", "butter", "sky"][i]}>
          <Icon name={b.icon} size={48} />
          <h3>{b.t}</h3>
          <ul>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </Card>
      ))}
    </div>
    <R className="valueprop">
      <span>Propuesta de valor</span>
      Galleta gourmet, <b>elegida por los consumidores</b>, a menos de 1/3 del precio de la competencia.
    </R>
  </Frame>
);

/* 23 · El pedido */
export const Ask = () => (
  <Frame className="ask">
    <Kicker n="22">Lo que les pedimos, Sharks</Kicker>
    <div className="ask-grid">
      <div className="ask-left">
        <R className="ask-amount"><Counter to={ASK.amount} prefix="$" duration={2.2} delay={0.5} /></R>
        <R className="ask-for">por el <b>{ASK.equity} %</b> de 917</R>
        <R className="ask-val">Valoración implícita: {money(ASK.amount / (ASK.equity / 100))}</R>
        <div className="ask-kpis">
          <Card><b>{ASK.perMonth}</b><span>galletas al mes<br />(2 lotes por semana)</span></Card>
          <Card><b>{money(ASK.monthly)}</b><span>margen mensual</span></Card>
          <Card tone="tang"><b>{ASK.payback.toLocaleString("es-CO")} meses</b><span>para recuperar su inversión</span></Card>
        </div>
      </div>
      <Card className="ask-uses">
        <h4>¿En qué se usa?</h4>
        <Donut data={ASK.uses} size={270} stroke={44}
          center={<><b>78 %</b><small>a producir</small></>} />
        <Legend data={ASK.uses} format={(v) => money(v)} />
      </Card>
    </div>
  </Frame>
);

/* 24 · Hoja de ruta */
const ROAD = [
  { t: "Mes 1", h: "Estandarizar", d: "Cuchara porcionadora y calibrador digital: cada galleta, idéntica." },
  { t: "Mes 2", h: "Borde más crujiente", d: "Probar 180 °C como 4.º factor y reposo en nevera en vez de congelador." },
  { t: "Mes 3", h: "Comprar al por mayor", d: "Nutella 20 % más barata → margen de $860 a ≈ $1.080 por galleta." },
  { t: "Mes 4+", h: "Nuevos sabores", d: "Vainilla, arequipe y capa de chocolate, pedidos por los estudiantes." },
];

export const Ruta = () => (
  <Frame className="ruta">
    <Kicker n="23">Hoja de ruta</Kicker>
    <Title size="m">Con su inversión, la 917 <em>sube de nivel</em>.</Title>
    <div className="road">
      <motion.div className="road-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
      {ROAD.map((r, i) => (
        <motion.div key={r.t} className="road-step"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.25 }}>
          <span className="road-dot" />
          <small>{r.t}</small>
          <h3>{r.h}</h3>
          <p>{r.d}</p>
        </motion.div>
      ))}
    </div>
  </Frame>
);

/* 25 · Equipo */
export const Equipo = () => (
  <Frame className="equipo">
    <Kicker n="24">El equipo detrás de la 917</Kicker>
    <Title size="m">Química, estadística y finanzas <em>en una sola cocina</em>.</Title>
    <div className="team">
      {TEAM.map((p, i) => (
        <Card key={p.name} className="member">
          <div className="avatar" style={{ background: ["var(--tang)", "var(--butter)", "var(--sky)", "var(--blush)", "var(--cream)"][i] }}>
            {p.name.split(" ").map((w) => w[0]).join("")}
          </div>
          <b>{p.name}</b>
          <span>{p.role}</span>
        </Card>
      ))}
    </div>
    <R className="foot-note">Grado 11° · Instituto Pedagógico CREAR · Bogotá, noviembre de 2026</R>
  </Frame>
);

/* 26 · ¿Quién invierte? (interactivo) */
const STATES = ["?", "deal", "out"];
export const Sharks = () => {
  const [votes, setVotes] = useState(SHARKS.map(() => 0));
  const toggle = (i) => {
    setVotes((v) => {
      const n = [...v];
      n[i] = (n[i] + 1) % 3;
      if (STATES[n[i]] === "deal") confetti({ particleCount: 80, spread: 70, origin: { x: 0.2 + i * 0.2, y: 0.6 }, colors: BRAND_CONFETTI });
      return n;
    });
  };
  const deals = votes.filter((v) => STATES[v] === "deal").length;
  return (
    <Frame center className="sharks">
      <Kicker n="25">Momento de decidir</Kicker>
      <Title size="l">¿Quién se une a la <b>917</b>?</Title>
      <div className="shark-row" data-noadvance>
        {SHARKS.map((s, i) => {
          const st = STATES[votes[i]];
          return (
            <motion.button key={s} className={`shark ${st}`} onClick={() => toggle(i)} whileTap={{ scale: 0.94 }} whileHover={{ y: -6 }}>
              <span className="shark-name">{s}</span>
              <AnimatePresence mode="wait">
                <motion.span key={st} className="shark-state" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                  {st === "?" ? "?" : st === "deal" ? "¡TRATO!" : "FUERA"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <R className="foot-note">Toca cada tarjeta: ? → ¡Trato! → Fuera · {deals} {deals === 1 ? "trato" : "tratos"} sobre la mesa</R>
    </Frame>
  );
};

/* 27 · La muestra (cierre con conteo) */
export const Muestra = () => {
  const [stage, setStage] = useState("idle"); // idle → count → done
  const finish = () => {
    setStage("done");
    const end = Date.now() + 1800;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 }, colors: BRAND_CONFETTI });
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors: BRAND_CONFETTI });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };
  return (
    <Frame center className="muestra">
      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <motion.div key="idle" className="m-idle" exit={{ opacity: 0, scale: 0.9 }}>
            <Kicker n="26">La muestra</Kicker>
            <Title size="l">Los datos ya hablaron.<br /><em>Ahora que hable su paladar.</em></Title>
            <motion.button className="cta" data-noadvance onClick={() => setStage("count")}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(255,106,61,.6)", "0 0 0 26px rgba(255,106,61,0)"] }}
              transition={{ repeat: Infinity, duration: 1.8 }}>
              Repartir la muestra
            </motion.button>
          </motion.div>
        )}
        {stage === "count" && (
          <div key="count" className="m-count" data-noadvance>
            <Countdown onDone={finish} hold={300} finale={<Cookie size={300} />} />
          </div>
        )}
        {stage === "done" && (
          <motion.div key="done" className="m-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div initial={{ scale: 0.4, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 90, damping: 11 }}>
              <Cookie size={360} bite />
            </motion.div>
            <motion.h1 className="title title-xl" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              ¡A probar la <b>917</b>!
            </motion.h1>
            <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Horneada con datos. Elegida por ustedes. Gracias, Sharks.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  );
};
