// Todos los datos del pitch salen del documento "Ingeniería del Sabor" (nov. 2026).
// Si cambian un número, cámbienlo aquí y se actualiza en toda la presentación.

export const TEAM = [
  { name: "Adrián Grijalba", role: "Masas M2 · M3" },
  { name: "Alejandra Blanco", role: "Masas M1 · M4" },
  { name: "Daniel Olaya", role: "Masas M1 · M4" },
  { name: "Freedman Guzmán", role: "Punto central · mediciones" },
  { name: "Luna Velásquez", role: "Masas M2 · M3" },
];

export const SURVEY1 = {
  raw: 112,
  valid: 73,
  dates: "18–19 sep 2026",
  grades: "5° a 11°",
  ages: "12 a 17 años",
  frequency: [
    { label: "De vez en cuando", value: 66 },
    { label: "Varias veces por semana", value: 19 },
    { label: "Todos los días", value: 3 },
  ],
  where: [
    { label: "Panaderías", value: 36 },
    { label: "Supermercados", value: 34 },
    { label: "Tienda del colegio", value: 14 },
  ],
  interest: [
    { label: "Ganas de probarla", value: 4.1 },
    { label: "Gusto por la Nutella", value: 4.2 },
    { label: "La recomendaría", value: 4.4 },
  ],
  buy: [
    { label: "Sí", value: 64, color: "var(--tang)" },
    { label: "Tal vez", value: 32, color: "var(--butter)" },
    { label: "No", value: 4, color: "var(--line-strong)" },
  ],
  size: [
    { label: "Mediana", value: 63 },
    { label: "Grande", value: 37 },
    { label: "Pequeña", value: 0 },
  ],
  attribute: [
    { label: "Sabor", value: 58, color: "var(--tang)" },
    { label: "Textura", value: 19, color: "var(--butter)" },
    { label: "Relleno", value: 18, color: "var(--sky)" },
    { label: "Tamaño + decoración", value: 5, color: "var(--blush)" },
  ],
};

// Tabla 4 + Tabla 10
export const TREATMENTS = [
  { id: "T1", code: "482", A: -1, B: -1, C: -1, votes: 0 },
  { id: "T2", code: "917", A: 1, B: -1, C: -1, votes: 7 },
  { id: "T3", code: "235", A: -1, B: 1, C: -1, votes: 5 },
  { id: "T4", code: "671", A: 1, B: 1, C: -1, votes: 2 },
  { id: "T5", code: "358", A: -1, B: -1, C: 1, votes: 5 },
  { id: "T6", code: "764", A: 1, B: -1, C: 1, votes: 3 },
  { id: "T7", code: "129", A: -1, B: 1, C: 1, votes: 0 },
  { id: "T8", code: "593", A: 1, B: 1, C: 1, votes: 1 },
];
export const CENTER = { id: "C", code: "846", votes: 1 };

export const FACTORS = [
  { key: "A", name: "Azúcares", low: "100 g morena + 25 g blanca", high: "200 g morena + 75 g blanca", icon: "sugar" },
  { key: "B", name: "Mantequilla", low: "200 g", high: "250 g", icon: "butter" },
  { key: "C", name: "Reposo en frío", low: "30 min", high: "90 min", icon: "snow" },
];

export const CHI = { value: 16.3, critical: 14.07, df: 7, p: 0.02, expected: 2.875, n: 23 };

// Tabla 12
export const FACTOR_CHI = [
  { name: "Mantequilla", a: "Baja", av: 15, b: "Alta", bv: 8, chi: 2.13 },
  { name: "Reposo", a: "30 min", av: 14, b: "90 min", bv: 9, chi: 1.09 },
  { name: "Azúcares", a: "Alto", av: 13, b: "Bajo", bv: 10, chi: 0.39 },
];

// Tabla 14
export const RATINGS = [
  { label: "Sabor", value: 4.7 },
  { label: "Dulzor", value: 4.6 },
  { label: "Gusto general", value: 4.6 },
  { label: "Suavidad del centro", value: 4.3 },
  { label: "Textura", value: 4.3 },
  { label: "Apariencia", value: 4.1 },
  { label: "Aroma", value: 4.1 },
  { label: "Sabor de la Nutella", value: 4.1 },
  { label: "Crocancia del borde", value: 3.8 },
];

// Tabla 15
export const IMPROVEMENTS = [
  { label: "¡Así está perfecta!", value: 9 },
  { label: "Más Nutella", value: 6 },
  { label: "Más grande", value: 4 },
  { label: "Más doradita", value: 4 },
  { label: "Más crujiente", value: 3 },
  { label: "Más suavecita", value: 3 },
  { label: "Menos dulce", value: 1 },
];

// Tabla 16
export const RAW_COSTS = [
  { label: "Nutella", value: 28500, pct: 50.0, color: "var(--tang)" },
  { label: "Chips de chocolate", value: 15820, pct: 27.8, color: "var(--blush)" },
  { label: "Mantequilla", value: 6640, pct: 11.6, color: "var(--butter)" },
  { label: "Harina, huevos, azúcares y otros", value: 6041, pct: 10.6, color: "var(--sky)" },
];

// Tabla 18
export const UNIT_COST = [
  { label: "Materias primas", value: 2192, pct: 69.8, color: "var(--tang)" },
  { label: "Mano de obra", value: 601, pct: 19.2, color: "var(--sky)" },
  { label: "Empaque", value: 300, pct: 9.6, color: "var(--butter)" },
  { label: "Energía", value: 46, pct: 1.5, color: "var(--blush)" },
];

// Tabla 19
export const PRICES = [
  { price: 3000, margin: -140, pct: -4.7, breakeven: null },
  { price: 3500, margin: 360, pct: 10.3, breakeven: 180 },
  { price: 4000, margin: 860, pct: 21.5, breakeven: 75 },
  { price: 4500, margin: 1360, pct: 30.2, breakeven: 48 },
];

// Tabla 20
export const ASK = {
  amount: 833000,
  equity: 15,
  uses: [
    { label: "Capital de trabajo · 8 lotes", value: 653000, color: "var(--tang)" },
    { label: "Utensilios para estandarizar", value: 130000, color: "var(--sky)" },
    { label: "Marca y etiquetas", value: 50000, color: "var(--butter)" },
  ],
  monthly: 178880,
  payback: 4.7,
  perMonth: 208,
};

export const money = (n) =>
  "$" + Math.round(n).toLocaleString("es-CO").replace(/,/g, ".");

// Cambien estos nombres por los de los jurados reales el día del pitch
export const SHARKS = ["Shark 1", "Shark 2", "Shark 3", "Shark 4"];
