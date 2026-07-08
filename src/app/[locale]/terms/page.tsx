import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Cosmic Blueprint.",
};

export default function TermsPage() {
  return <PlaceholderPage namespace="terms" />;
}
