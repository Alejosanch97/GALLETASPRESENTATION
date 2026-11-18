import { motion } from "framer-motion";
import { Frame, Kicker, Title, Lead, Card } from "./Frame";
import { R, Counter, Cookie, Logo, Icon, pop } from "../ui/ui";

/* 01 · Portada */
export const Portada = () => (
  <Frame className="portada">
    <div className="portada-left">
      <Kicker>Pitch · Shark Tank 2026</Kicker>
      <R className="mega">
        <motion.span
          className="mega-917"
          initial={{ letterSpacing: "0.4em", opacity: 0 }}
          animate={{ letterSpacing: "-0.04em", opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          917
        </motion.span>
      </R>
      <Title size="m">La galleta que <em>eligieron</em> los datos.</Title>
      <Lead>Gourmet, rellena de Nutella y diseñada con un experimento 2³. A menos de un tercio del precio de la competencia.</Lead>
      <R className="tease">¿Por qué se llama 917? <span>Quédense hasta el final del experimento.</span></R>
    </div>
    <R v={pop} className="portada-right">
      <div className="orbit-wrap">
        <Cookie size={470} spin />
        <div className="orbit-logo"><Logo size={170} /></div>
      </div>
    </R>
  </Frame>
);

/* 02 · Gancho */
export const Gancho = () => (
  <Frame center className="gancho">
    <Kicker n="01">El gancho</Kicker>
    <Title size="l">¿Cuánto pagarías por <em>una</em> galleta?</Title>
    <R v={pop} className="pricetag">
      <span className="pt-hole" />
      <div className="pt-amount"><Counter to={15000} prefix="$" duration={2.2} delay={0.8} /></div>
      <div className="pt-sub">Galleta estilo Crumbl · Bogotá</div>
    </R>
    <Lead>
      En tiendas especializadas cuesta entre <b>$13.000 y $15.000</b>. Hay gente dispuesta a pagarlo…
      pero no los estudiantes de nuestro colegio.
    </Lead>
  </Frame>
);

/* 03 · Problema */
const PAINS = [
  { icon: "wallet", t: "Precio inalcanzable", d: "Una galleta gourmet cuesta más que el almuerzo de un estudiante. El antojo existe; el bolsillo no.", tone: "tang" },
  { icon: "dice", t: "Recetas de intuición", d: "En la repostería pequeña cada lote sale distinto: depende de quién cocina y del día.", tone: "butter" },
  { icon: "trash", t: "Pruebas que se botan", d: "Ajustar a ojo cuesta ingredientes, tiempo y dinero en intentos fallidos.", tone: "sky" },
];

export const Problema = () => (
  <Frame className="problema">
    <Kicker n="02">El problema</Kicker>
    <Title size="m">Una galleta casera sale bien <em>una vez</em>.<br />Un producto sale bien <b>siempre</b>.</Title>
    <div className="grid-3">
      {PAINS.map((p) => (
        <Card key={p.t} tone={p.tone} className="pain">
          <div className="pain-ic"><Icon name={p.icon} size={46} /></div>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
        </Card>
      ))}
    </div>
  </Frame>
);
