"use client";

import { useEffect, useRef, useState } from "react";
import type { Paddle } from "@paddle/paddle-js";
import { clientToken, PADDLE_ENV } from "@/lib/paddle";

/**
 * Lazily initializes Paddle.js on first call to openCheckout().
 * Avoids loading the script until the user actually clicks a buy button.
 */
export function usePaddle() {
  const [error, setError] = useState<string | null>(null);
  const paddleRef = useRef<Paddle | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    return () => {
      paddleRef.current = null;
      loadingRef.current = false;
    };
  }, []);

  const getPaddle = async (): Promise<Paddle | null> => {
    if (paddleRef.current) return paddleRef.current;
    if (loadingRef.current) return null; // already loading, caller should retry

    loadingRef.current = true;
    try {
      const { initializePaddle } = await import("@paddle/paddle-js");
      const paddle = await initializePaddle({
        token: clientToken,
        environment: PADDLE_ENV,
        checkout: {
          settings: {
            displayMode: "overlay",
            theme: "dark",
            allowLogout: false,
          },
        },
      });
      if (paddle) {
        paddleRef.current = paddle;
        setError(null);
        return paddle;
      }
      setError("Paddle initialization returned null.");
      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load Paddle checkout.";
      setError(message);
      return null;
    } finally {
      loadingRef.current = false;
    }
  };

  const openCheckout = async (priceId: string) => {
    if (!priceId) {
      setError("No price ID configured.");
      return;
    }
    const paddle = await getPaddle();
    if (!paddle) {
      setError("Paddle is not available. Check your connection and try again.");
      return;
    }
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
    });
  };

  return { openCheckout, error };
}
