import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently (handles conflicts like 'p-4 p-6').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Currency = "USD" | "EUR" | "AED" | "GBP" | "INR";

/** Approximate exchange rates vs INR */
export const EXCHANGE_RATES: Record<Exclude<Currency, "INR">, number> = {
  USD: 0.012,
  AED: 0.044,
  GBP: 0.0095,
  EUR: 0.011,
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "$ USD",
  EUR: "€ EUR",
  AED: "AED",
  GBP: "£ GBP",
  INR: "₹ INR",
};

/**
 * Determine default currency for a language code.
 * Defaults to USD for English and most international travelers.
 */
export function getCurrencyForLanguage(langCode: string): Currency {
  switch (langCode.toLowerCase()) {
    case "ar":
      return "AED";
    case "fr":
    case "de":
    case "ro":
    case "pt":
      return "EUR";
    case "in":
      return "INR";
    case "en":
    default:
      return "USD";
  }
}

/**
 * Format a single price in the requested currency (default: USD).
 */
export function formatPrice(amountInr: number, currency: Currency = "USD"): string {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amountInr);
  }

  const rate = EXCHANGE_RATES[currency] ?? EXCHANGE_RATES.USD;
  const converted = Math.round(amountInr * rate);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(converted);
}

/**
 * Format a price in INR with comma separation (kept for backward compatibility).
 */
export function formatINR(amount: number): string {
  return formatPrice(amount, "INR");
}

/**
 * Format a price range string, e.g. "$3,840 – $5,760" (default: USD)
 */
export function formatPriceRange(min: number, max: number, currency: Currency = "USD"): string {
  if (currency === "INR") {
    return `${formatPrice(min, "INR")} – ${formatPrice(max, "INR")}`;
  }
  const rate = EXCHANGE_RATES[currency] ?? EXCHANGE_RATES.USD;
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return `${fmt.format(Math.round(min * rate))} – ${fmt.format(Math.round(max * rate))}`;
}

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
