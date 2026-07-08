/**
 * Paddle configuration.
 *
 * Price IDs are obtained from the Paddle sandbox dashboard:
 *   Catalog → Products → [product] → Price ID
 *
 * Sandbox mode is determined by the token prefix:
 *   - "test_" → sandbox (no real charges)
 *   - "pdl_"  → live/production
 */
const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";

export const PADDLE_ENV = clientToken.startsWith("test_") ? "sandbox" : "production";

export const PADDLE_PRICE_IDS = {
  /** AI Reading — one-time purchase */
  perRead: "pri_01kwzh9dgm4mbxfc2thhb17jgk",
  /** Premium — monthly subscription */
  premium: "pri_01kwzh208r8nbvhpf0p491712c",
} as const;

/** Returns true when Paddle is configured and ready for checkout. */
export function isPaddleReady(): boolean {
  return Boolean(clientToken) && Boolean(PADDLE_PRICE_IDS.perRead) && Boolean(PADDLE_PRICE_IDS.premium);
}

export { clientToken };
