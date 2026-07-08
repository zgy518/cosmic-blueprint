import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NotFoundContent } from "@/components/layout/not-found-content";

export default async function NotFound() {
  let locale: string;
  let messages: Record<string, unknown>;

  try {
    locale = await getLocale();
    messages = await getMessages();
  } catch {
    locale = routing.defaultLocale;
    messages = (await import(`../../../messages/${locale}.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}
