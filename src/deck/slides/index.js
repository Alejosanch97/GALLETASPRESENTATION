import { Portada, Gancho, Problema } from "./Apertura";
import { Validacion, Preferencias, Insight } from "./Mercado";
import { Solucion, Experimento, Cubo, Cata } from "./Producto";
import { Ranking, Chi, Interacciones, Hipotesis, Receta, Probarla, Consistencia } from "./Resultados";
import { Costos, MasBarata, CostoTotal, Precio, Modelo, Ask, Ruta, Equipo, Sharks, Muestra } from "./Negocio";

// Orden del pitch: gancho → problema → mercado → solución → ciencia → resultados → finanzas → pedido → cierre.
// Para reordenar, mover líneas. "section" aparece arriba a la izquierda.
export const SLIDES = [
  { id: "portada", section: "Inicio", Component: Portada },
  { id: "gancho", section: "El gancho", Component: Gancho },
  { id: "problema", section: "El problema", Component: Problema },
  { id: "validacion", section: "Mercado", Component: Validacion },
  { id: "preferencias", section: "Mercado", Component: Preferencias },
  { id: "insight", section: "Mercado", Component: Insight },
  { id: "solucion", section: "La solución", Component: Solucion },
  { id: "experimento", section: "La ciencia", Component: Experimento },
  { id: "cubo", section: "La ciencia", Component: Cubo },
  { id: "cata", section: "La ciencia", Component: Cata },
  { id: "ranking", section: "Resultados", Component: Ranking },
  { id: "chi", section: "Resultados", Component: Chi },
  { id: "interacciones", section: "Resultados", Component: Interacciones },
  { id: "hipotesis", section: "Resultados", Component: Hipotesis },
  { id: "receta", section: "Resultados", Component: Receta },
  { id: "probarla", section: "Resultados", Component: Probarla },
  { id: "consistencia", section: "Resultados", Component: Consistencia },
  { id: "costos", section: "Finanzas", Component: Costos },
  { id: "barata", section: "Finanzas", Component: MasBarata },
  { id: "costo-total", section: "Finanzas", Component: CostoTotal },
  { id: "precio", section: "Finanzas", Component: Precio },
  { id: "modelo", section: "Negocio", Component: Modelo },
  { id: "ask", section: "El pedido", Component: Ask },
  { id: "ruta", section: "El pedido", Component: Ruta },
  { id: "equipo", section: "Equipo", Component: Equipo },
  { id: "sharks", section: "Cierre", Component: Sharks },
  { id: "muestra", section: "Cierre", Component: Muestra },
];
