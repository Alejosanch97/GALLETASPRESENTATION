import { motion } from "framer-motion";
import { Frame, Kicker, Title, Lead, Card } from "./Frame";
import { R, Counter, HBars, Donut, Legend, pop } from "../ui/ui";
import { SURVEY1 } from "../data";

/* 04 · Validación del concepto */
export const Validacion = () => (
  <Frame className="validacion">
    <Kicker n="03">Estudio de mercado · Encuesta 1</Kicker>
    <Title size="m">Antes de hornear, <em>preguntamos.</em></Title>
    <div className="val-grid">
      <Card className="clean">
        <h4>Depuración de datos</h4>
        <div className="dots">
          {Array.from({ length: SURVEY1.raw }).map((_, i) => {
            const dup = i % 3 === 2 || i >= 109; // 36 + 3 = 39 respuestas duplicadas
            return (
              <motion.i
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={dup ? { opacity: [0, 1, 0.12], scale: [0, 1, 0.7] } : { opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.008, duration: dup ? 1.6 : 0.4, times: dup ? [0, 0.3, 1] : undefined }}
                className={dup ? "dup" : ""}
              />
            );
          })}
        </div>
        <div className="clean-nums">
          <span><b><Counter to={112} delay={0.3} /></b> recibidas</span>
          <span className="arrow">→</span>
          <span className="ok"><b><Counter to={73} delay={1.4} /></b> válidas</span>
        </div>
        <p className="foot">Estudiantes de {SURVEY1.grades} · {SURVEY1.ages} · {SURVEY1.dates}</p>
      </Card>

      <Card className="buy">
        <h4>¿La comprarías?</h4>
        <Donut
          data={SURVEY1.buy}
          size={260}
          stroke={38}
          center={<><b><Counter to={96} suffix="%" delay={0.8} /></b><small>no la descarta</small></>}
        />
        <Legend data={SURVEY1.buy} />
      </Card>

      <Card className="interest">
        <h4>Interés en la idea <small>(escala 1 a 5)</small></h4>
        <HBars data={SURVEY1.interest} max={5} unit="" decimals={1} color="var(--butter)" height={40} />
        <div className="callout">
          <b>86 %</b> le daría 4 o 5 a recomendarla a un amigo, <i>sin haberla probado.</i>
        </div>
      </Card>
    </div>
  </Frame>
);

/* 05 · Qué quiere el público */
export const Preferencias = () => (
  <Frame className="prefs">
    <Kicker n="04">Lo que pide nuestro cliente</Kicker>
    <Title size="m">Quieren una galleta <em>generosa</em>, y que sepa increíble.</Title>
    <div className="prefs-grid">
      <Card className="attr">
        <h4>Lo más importante en una galleta</h4>
        <div className="attr-row">
          <Donut data={SURVEY1.attribute} size={230} stroke={36}
            center={<><b><Counter to={58} suffix="%" /></b><small>sabor</small></>} />
          <Legend data={SURVEY1.attribute} />
        </div>
      </Card>
      <div className="chips">
        {[
          { v: 67, l: "quiere mucha Nutella", c: "tang" },
          { v: 70, l: "quiere muchas chispas", c: "butter" },
          { v: 0, l: "eligió tamaño pequeño", c: "sky" },
        ].map((x, i) => (
          <R v={pop} key={x.l} className={`chip chip-${x.c}`}>
            <b><Counter to={x.v} suffix="%" delay={0.5 + i * 0.15} /></b>
            <span>{x.l}</span>
          </R>
        ))}
      </div>
      <Card className="where">
        <h4>¿Dónde compran galletas?</h4>
        <HBars data={SURVEY1.where} max={40} highlight={2} height={36} />
        <p className="foot">La tienda del colegio ya es un canal: cercano y directo.</p>
      </Card>
      <Card className="freq">
        <h4>¿Con qué frecuencia?</h4>
        <HBars data={SURVEY1.frequency} max={70} color="var(--blush)" height={36} />
        <p className="foot">Es un <b>antojo</b>: la experiencia tiene que valer la pena.</p>
      </Card>
    </div>
  </Frame>
);

/* 06 · El insight */
export const Insight = () => (
  <Frame center className="insight">
    <Kicker n="05">El insight</Kicker>
    <Title size="m">El colegio está <em>dividido</em>.</Title>
    <R className="split">
      <motion.div className="split-a" initial={{ width: "50%" }} animate={{ width: "51%" }} transition={{ delay: 0.6, duration: 1.2 }}>
        <span className="split-n">51%</span><span>Crujiente</span>
      </motion.div>
      <motion.div className="split-b" initial={{ width: "50%" }} animate={{ width: "49%" }} transition={{ delay: 0.6, duration: 1.2 }}>
        <span className="split-n">49%</span><span>Suave</span>
      </motion.div>
    </R>
    <div className="split-groups">
      <Card><b>59 %</b> de 5° a 8° prefiere <span className="t-blush">suave</span></Card>
      <Card><b>57 %</b> de 9° a 11° prefiere <span className="t-tang">crujiente</span></Card>
    </div>
    <R className="answer">
      No tuvimos que escoger: <b>centro suave + borde crujiente.</b> Justo lo que es una galleta estilo Crumbl.
    </R>
  </Frame>
);
