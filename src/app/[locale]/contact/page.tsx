import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Cosmic Blueprint team.",
};

export default function ContactPage() {
  return <PlaceholderPage namespace="contact" />;
}
