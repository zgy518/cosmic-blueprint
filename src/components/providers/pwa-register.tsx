"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/site";

export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(withBasePath("/sw.js")).catch(() => {
        // PWA registration is progressive enhancement; the app still works without it.
      });
    }
  }, []);

  return null;
}
