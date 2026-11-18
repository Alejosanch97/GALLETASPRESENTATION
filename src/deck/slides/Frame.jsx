import { motion } from "framer-motion";
import { R, stagger } from "../ui/ui";

/** Contenedor de cada diapositiva: activa la cascada de animaciones */
export const Frame = ({ children, className = "", center = false }) => (
  <motion.div
    className={`frame ${center ? "frame-center" : ""} ${className}`}
    variants={stagger}
    initial="hidden"
    animate="show"
  >
    {children}
  </motion.div>
);

export const Kicker = ({ n, children }) => (
  <R className="kicker">
    {n && <span className="kicker-n">{n}</span>}
    {children}
  </R>
);

/** Título: usa <em> para la palabra en serif cursiva y <b> para el acento mandarina */
export const Title = ({ children, size = "l" }) => (
  <R as="h1" className={`title title-${size}`}>{children}</R>
);

export const Lead = ({ children }) => <R as="p" className="lead">{children}</R>;

export const Card = ({ children, className = "", tone, style }) => (
  <R className={`card ${tone ? `card-${tone}` : ""} ${className}`} style={style}>{children}</R>
);

export const Stat = ({ value, label, tone = "tang" }) => (
  <div className={`stat stat-${tone}`}>
    <div className="stat-v">{value}</div>
    <div className="stat-l">{label}</div>
  </div>
);
