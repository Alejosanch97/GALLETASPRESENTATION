import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion } from "framer-motion";

/* ───────── Animaciones base ───────── */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
export const rise = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 18 },
  },
};
export const pop = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 160, damping: 14 } },
};

/** Elemento que entra con la cascada del slide */
export const R = ({ as = "div", v = rise, className, style, children, ...rest }) => {
  const M = motion[as];
  return (
    <M variants={v} className={className} style={style} {...rest}>
      {children}
    </M>
  );
};

/* ───────── Número animado ───────── */
const fmt = (n, decimals) =>
  n.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const Counter = ({ to, from = 0, decimals = 0, prefix = "", suffix = "", duration = 1.6, delay = 0.3 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = animate(from, to, {
      duration, delay, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = prefix + fmt(v, decimals) + suffix; },
    });
    return () => c.stop();
  }, [to, from, decimals, prefix, suffix, duration, delay]);
  return <span ref={ref}>{prefix + fmt(from, decimals) + suffix}</span>;
};

/* ───────── Barras horizontales ───────── */
export const HBars = ({ data, max, unit = "%", decimals = 0, highlight, delay = 0.4, color = "var(--sky)", height = 34 }) => {
  const m = max ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="hbars">
      {data.map((d, i) => (
        <div key={d.label} className="hbar" style={{ "--h": `${height}px` }}>
          <span className="hbar-label">{d.label}</span>
          <div className="hbar-track">
            <motion.div
              className="hbar-fill"
              style={{ background: d.color || (highlight === i ? "var(--tang)" : color) }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max((d.value / m) * 100, 0.6)}%` }}
              transition={{ delay: delay + i * 0.08, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="hbar-val">
            <Counter to={d.value} decimals={decimals} suffix={unit} delay={delay + i * 0.08} />
          </span>
        </div>
      ))}
    </div>
  );
};

/* ───────── Dona ───────── */
export const Donut = ({ data, size = 300, stroke = 42, delay = 0.4, center }) => {
  const total = data.reduce((a, d) => a + d.value, 0);
  const r = (size - stroke) / 2;
  let acc = 0;
  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const start = acc;
          acc += frac;
          return (
            <g key={d.label} transform={`rotate(${start * 360 - 90} ${size / 2} ${size / 2})`}>
              <motion.circle
                cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={d.color} strokeWidth={stroke}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: Math.max(frac - 0.004, 0.001) }}
                transition={{ delay: delay + start * 1.2, duration: frac * 1.2 + 0.2, ease: "easeOut" }}
              />
            </g>
          );
        })}
      </svg>
      {center && <div className="donut-center">{center}</div>}
    </div>
  );
};

export const Legend = ({ data, format = (v) => `${v}%` }) => (
  <ul className="legend">
    {data.map((d) => (
      <li key={d.label}>
        <i style={{ background: d.color }} />
        <span>{d.label}</span>
        <b>{format(d.value, d)}</b>
      </li>
    ))}
  </ul>
);

/* ───────── Galleta ilustrada ───────── */
const rand = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

export const Cookie = ({ size = 320, seed = 917, bite = false, glow = true, spin = false }) => {
  const { edge, chips } = useMemo(() => {
    const rnd = rand(seed);
    const pts = [];
    const N = 46;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const rr = 92 + rnd() * 7;
      pts.push([100 + Math.cos(a) * rr, 100 + Math.sin(a) * rr]);
    }
    const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + "Z";
    const ch = [];
    for (let i = 0; i < 15; i++) {
      const a = rnd() * Math.PI * 2;
      const rr = Math.sqrt(rnd()) * 72;
      ch.push({ x: 100 + Math.cos(a) * rr, y: 100 + Math.sin(a) * rr, s: 5 + rnd() * 6, r: rnd() * 90 });
    }
    return { edge: d, chips: ch };
  }, [seed]);

  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 200 200" className="cookie"
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { repeat: Infinity, duration: 60, ease: "linear" } : undefined}
    >
      <defs>
        <radialGradient id={`cg${seed}`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ffd98a" />
          <stop offset="60%" stopColor="#f0b25a" />
          <stop offset="100%" stopColor="#c97a2e" />
        </radialGradient>
        <mask id={`bite${seed}`} maskUnits="userSpaceOnUse" x="-60" y="-60" width="320" height="320">
          <rect x="-60" y="-60" width="320" height="320" fill="#fff" />
          {bite && (<>
            <circle cx="182" cy="46" r="26" fill="#000" />
            <circle cx="166" cy="20" r="20" fill="#000" />
            <circle cx="194" cy="76" r="16" fill="#000" />
          </>)}
        </mask>
        <filter id="cglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <g mask={`url(#bite${seed})`}>
      {glow && <path d={edge} fill="#ff6a3d" opacity="0.45" filter="url(#cglow)" />}
      <path d={edge} fill={`url(#cg${seed})`} />
      <path d={edge} fill="none" stroke="#a65f22" strokeOpacity=".5" strokeWidth="2" />
      {chips.map((c, i) => (
        <rect key={i} x={c.x - c.s / 2} y={c.y - c.s / 2} width={c.s} height={c.s * 0.85} rx={c.s / 3}
          fill="#3a1f14" transform={`rotate(${c.r} ${c.x} ${c.y})`} />
      ))}
      {chips.slice(0, 7).map((c, i) => (
        <circle key={`h${i}`} cx={c.x - 1} cy={c.y - 1.2} r={c.s / 6} fill="#fff4e0" opacity=".35" />
      ))}
      </g>
    </motion.svg>
  );
};

/* ───────── Logo 917 ───────── */
export const Logo = ({ size = 220, spin = true }) => (
  <div className="logo" style={{ width: size, height: size }}>
    <motion.svg
      viewBox="0 0 200 200" width={size} height={size}
      animate={spin ? { rotate: 360 } : undefined}
      transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
    >
      <defs>
        <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text fontFamily="JetBrains Mono" fontSize="11.5" letterSpacing="3.2" fill="var(--butter)">
        <textPath href="#ring">HORNEADA CON DATOS ✦ GALLETAS DE LABORATORIO ✦ BOGOTÁ ✦ </textPath>
      </text>
    </motion.svg>
    <div className="logo-core">
      <span style={{ fontSize: size * 0.24 }}>917</span>
    </div>
  </div>
);

/* ───────── Íconos simples ───────── */
export const Icon = ({ name, size = 40 }) => {
  const s = { width: size, height: size };
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "sugar":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><rect x="8" y="12" width="10" height="10" rx="2" /><rect x="22" y="12" width="10" height="10" rx="2" /><rect x="15" y="24" width="10" height="10" rx="2" /></g></svg>);
    case "butter":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M6 26 L14 14 H34 L26 26 Z" /><path d="M6 26 V31 H26 V26" /><path d="M26 31 L34 19 V14" /></g></svg>);
    case "snow":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M20 5 V35 M7 12.5 L33 27.5 M7 27.5 L33 12.5" /><path d="M16 8 L20 11 L24 8 M16 32 L20 29 L24 32" /></g></svg>);
    case "oven":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><rect x="6" y="7" width="28" height="27" rx="3" /><path d="M6 14 H34" /><rect x="11" y="18" width="18" height="11" rx="2" /><circle cx="12" cy="10.5" r=".8" /><circle cx="17" cy="10.5" r=".8" /></g></svg>);
    case "scale":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><rect x="6" y="20" width="28" height="13" rx="3" /><path d="M10 20 C10 14 30 14 30 20" /><path d="M20 26 L23 23" /></g></svg>);
    case "dice":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><rect x="7" y="7" width="26" height="26" rx="5" /></g><g fill="currentColor"><circle cx="14" cy="14" r="2" /><circle cx="26" cy="26" r="2" /><circle cx="20" cy="20" r="2" /></g></svg>);
    case "warn":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M20 6 L35 33 H5 Z" /><path d="M20 16 V24 M20 28.5 V29" /></g></svg>);
    case "trash":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M8 11 H32 M15 11 V7 H25 V11 M11 11 L13 34 H27 L29 11" /></g></svg>);
    case "wallet":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><rect x="5" y="11" width="30" height="21" rx="4" /><path d="M5 17 H35" /><circle cx="28" cy="24" r="1.5" /></g></svg>);
    case "bag":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M9 13 H31 L29 34 H11 Z" /><path d="M15 13 C15 6 25 6 25 13" /></g></svg>);
    case "store":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M6 15 L9 7 H31 L34 15 Z" /><path d="M8 15 V33 H32 V15" /><rect x="16" y="22" width="8" height="11" /></g></svg>);
    case "party":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M8 33 L15 13 L27 25 Z" /><path d="M22 8 L23 12 M30 11 L27 14 M32 19 L28 19" /></g></svg>);
    case "users":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><circle cx="15" cy="14" r="5" /><path d="M5 32 C5 24 25 24 25 32" /><circle cx="28" cy="15" r="4" /><path d="M27 23 C32 23 36 26 36 31" /></g></svg>);
    case "ruler":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><rect x="4" y="14" width="32" height="12" rx="2" /><path d="M10 14 V19 M16 14 V21 M22 14 V19 M28 14 V21" /></g></svg>);
    case "arrow":
      return (<svg viewBox="0 0 40 40" style={s}><g {...common}><path d="M8 20 H32 M24 12 L32 20 L24 28" /></g></svg>);
    default:
      return null;
  }
};

/* ───────── Hook útil: re-montar animaciones ───────── */
export const useMounted = () => {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
};
