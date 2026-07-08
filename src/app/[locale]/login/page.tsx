import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Cosmic Blueprint to access your readings and favorites.",
};

export default function LoginPage() {
  return <PlaceholderPage namespace="login" />;
}
