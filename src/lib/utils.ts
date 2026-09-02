import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently (handles conflicts like 'p-4 p-6').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in INR with comma separation.
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a price range string, e.g. "₹3,50,000 – ₹5,00,000"
 */
export function formatPriceRange(min: number, max: number, currency: Currency = "INR"): string {
  if (currency === "INR") {
    return `${formatINR(min)} – ${formatINR(max)}`;
  }
  const rate = EXCHANGE_RATES[currency];
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return `${fmt.format(Math.round(min * rate))} – ${fmt.format(Math.round(max * rate))}`;
}

export type Currency = "INR" | "USD" | "AED" | "GBP" | "EUR";

/** Approximate exchange rates vs INR — update periodically or pull from API */
export const EXCHANGE_RATES: Record<Exclude<Currency, "INR">, number> = {
  USD: 0.012,
  AED: 0.044,
  GBP: 0.0095,
  EUR: 0.011,
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  INR: "₹ INR",
  USD: "$ USD",
  AED: "AED",
  GBP: "£ GBP",
  EUR: "€ EUR",
};

/**
 * Slugify a string for URL usage.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a given length.
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "…";
}
