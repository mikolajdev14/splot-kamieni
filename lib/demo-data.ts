export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
};

export type JewelryConfig = {
  style: string;
  stone: string;
  hardware: string;
  size: string;
  charm: string;
  intention: string;
  customIntention: string;
  dedication: string;
  packaging: string;
  price: number;
};

export type DemoOrder = JewelryConfig & {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  product: string;
  image: string;
  delivery: string;
  payment: string;
  dueDate: string;
  createdAt: string;
  status: string;
  total: number;
  note?: string;
};

export const PRODUCTS: Product[] = [
  { id: "intencja", name: "Bransoletka z intencją", description: "Kamienie dobrane do tego, czego dziś najbardziej potrzebujesz.", price: 129, image: "/jewelry/amethyst-bracelet.webp", tag: "Bestseller" },
  { id: "urodzeniowa", name: "Bransoletka urodzeniowa", description: "Osobista kompozycja z kamieniem Twojego miesiąca.", price: 139, image: "/jewelry/hero-bracelet.webp", tag: "Osobista" },
  { id: "naszyjnik", name: "Naszyjnik z kamieniem", description: "Delikatny talizman oparty na naturalnym, niepowtarzalnym kamieniu.", price: 169, image: "/jewelry/aquamarine-necklace.webp", tag: "Nowość" },
  { id: "prezent", name: "Zestaw prezentowy", description: "Dwie bransoletki, opakowanie i miejsce na Twoją dedykację.", price: 229, image: "/jewelry/gift-set.webp", tag: "Na prezent" },
];

export const STONES = [
  { name: "Ametyst", meaning: "spokój i równowaga", color: "bg-violet-400", extra: 0 },
  { name: "Kwarc różowy", meaning: "miłość i bliskość", color: "bg-rose-200", extra: 0 },
  { name: "Turmalin czarny", meaning: "ochrona", color: "bg-neutral-800", extra: 0 },
  { name: "Kamień księżycowy", meaning: "intuicja", color: "bg-slate-200", extra: 15 },
  { name: "Cytryn", meaning: "energia i pewność siebie", color: "bg-amber-300", extra: 15 },
  { name: "Akwamaryn", meaning: "harmonia i komunikacja", color: "bg-cyan-200", extra: 15 },
];

export const BASE_PRICE = 129;
export const CART_KEY = "lunaria-atelier-cart";
export const ORDERS_KEY = "lunaria-atelier-orders";

export const MOCK_ORDERS: DemoOrder[] = [
  ["LA-2026-0041", "Anna Kowalska", "Bransoletka z intencją", "Ametyst", 159, "W realizacji", "24 lip"],
  ["LA-2026-0040", "Julia Nowak", "Zestaw prezentowy", "Kwarc różowy", 241, "Gotowe do wysyłki", "22 lip"],
  ["LA-2026-0039", "Marta Wiśniewska", "Naszyjnik z kamieniem", "Akwamaryn", 184, "Opłacone", "26 lip"],
  ["LA-2026-0038", "Zofia Wójcik", "Bransoletka urodzeniowa", "Cytryn", 164, "Wymaga kontaktu", "28 lip"],
  ["LA-2026-0037", "Aleksandra Kamińska", "Bransoletka z intencją", "Turmalin czarny", 151, "Wysłane", "18 lip"],
  ["LA-2026-0036", "Natalia Zielińska", "Zestaw prezentowy", "Kamień księżycowy", 256, "Nowe", "30 lip"],
  ["LA-2026-0035", "Emilia Lewandowska", "Bransoletka z intencją", "Kwarc różowy", 139, "W realizacji", "25 lip"],
  ["LA-2026-0034", "Karolina Mazur", "Naszyjnik z kamieniem", "Ametyst", 179, "Opłacone", "27 lip"],
].map(([id, customer, product, stone, total, status, dueDate]) => ({
  id: String(id), customer: String(customer), product: String(product), stone: String(stone), total: Number(total), status: String(status), dueDate: String(dueDate),
  email: `${String(customer).split(" ")[0].toLowerCase()}@example.pl`, phone: "+48 500 200 300", address: "ul. Kwiatowa 8, 00-001 Warszawa",
  image: product === "Naszyjnik z kamieniem" ? "/jewelry/aquamarine-necklace.webp" : product === "Zestaw prezentowy" ? "/jewelry/gift-set.webp" : "/jewelry/amethyst-bracelet.webp",
  delivery: "Paczkomat", payment: "BLIK", createdAt: "20 lip 2026", style: "Klasyczna", hardware: "Złoty", size: "M · 16–17 cm", charm: "Księżyc", intention: "Spokój", customIntention: "", dedication: "Dla Ciebie, z czułością", packaging: "Prezentowe", price: Number(total),
}));

export const formatPrice = (value: number) => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(value);
