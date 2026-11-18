import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { SLIDES } from "./slides";
import { Countdown } from "./Countdown";
import { Logo } from "./ui/ui";
import "./deck.css";

const W = 1600;
const H = 900;

/* Escala el escenario de 1600×900 para que quepa en cualquier pantalla */
const useStageScale = () => {
  const [s, setS] = useState(1);
  useLayoutEffect(() => {
    const fit = () => setS(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return s;
};

const Background = ({ index }) => (
  <div className="bg">
    <div className="bg-grid" />
    <motion.div
      className="bg-glow a"
      animate={{ x: index % 2 ? 260 : -120, y: index % 3 ? -80 : 60 }}
      transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.div
      className="bg-glow b"
      animate={{ x: index % 2 ? -200 : 160, y: index % 3 ? 90 : -40 }}
      transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
    />
    {Array.from({ length: 16 }).map((_, i) => (
      <motion.i
        key={i}
        className="crumb"
        style={{ left: `${(i * 61) % 100}%`, top: `${(i * 37) % 100}%`, width: 3 + (i % 4) * 2, height: 3 + (i % 4) * 2 }}
        animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    <div className="bg-grain" />
  </div>
);

export const Deck = () => {
  const [phase, setPhase] = useState("start"); // start → countdown → deck
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const scale = useStageScale();
  useEffect(() => confetti.reset(), [index]); // limpia el confeti al cambiar de slide
  const total = SLIDES.length;

  const go = useCallback(
    (to) => {
      const next = Math.max(0, Math.min(total - 1, to));
      setDir(next >= index ? 1 : -1);
      setIndex(next);
    },
    [index, total]
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const fullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (phase === "start" && ["Enter", " ", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        return setPhase("countdown");
      }
      if (phase !== "deck") return;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); prev(); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(total - 1);
      if (e.key.toLowerCase() === "f") fullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, next, prev, go, total]);

  const onStageClick = (e) => {
    if (e.target.closest("button, a, [data-noadvance]")) return;
    if (phase === "start") return setPhase("countdown");
    if (phase === "deck") next();
  };

  const Current = SLIDES[index].Component;

  return (
    <div className="viewport" onClick={onStageClick}>
      <div className="stage" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
        <Background index={phase === "deck" ? index : 0} />

        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.div key="start" className="start" exit={{ opacity: 0, scale: 0.9 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Logo size={260} />
              <p className="start-kicker">Shark Tank · Grado 11° · Instituto Pedagogigico CREAR</p>
              <motion.p className="start-hint" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
                Haz clic para empezar
              </motion.p>
            </motion.div>
          )}

          {phase === "countdown" && <Countdown key="cd" onDone={() => setPhase("deck")} />}

          {phase === "deck" && (
            <motion.div key="deck" className="deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* progreso superior estilo "stories", sin temporizador */}
              <div className="progress" data-noadvance>
                {SLIDES.map((s, i) => (
                  <button key={s.id} className="seg" onClick={() => go(i)} title={s.section}>
                    <motion.i
                      initial={false}
                      animate={{ width: i <= index ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </button>
                ))}
              </div>

              <div className="brandmark">
                <span className="bm-dot" />917
                <em>{SLIDES[index].section}</em>
              </div>

              <AnimatePresence custom={dir}>
                <motion.section
                  key={SLIDES[index].id}
                  className="slide"
                  custom={dir}
                  initial={{ opacity: 0, x: 80 * dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 * dir, filter: "blur(6px)", transition: { duration: 0.3 } }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Current />
                </motion.section>
              </AnimatePresence>

              <div className="controls" data-noadvance>
                <button onClick={prev} aria-label="Anterior" disabled={index === 0}>‹</button>
                <span className="ctr">
                  {String(index + 1).padStart(2, "0")}<small>/{String(total).padStart(2, "0")}</small>
                </span>
                <button onClick={next} aria-label="Siguiente" disabled={index === total - 1}>›</button>
                <button onClick={fullscreen} aria-label="Pantalla completa" className="fs">⤢</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
