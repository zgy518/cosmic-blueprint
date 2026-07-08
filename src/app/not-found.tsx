import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-[70vh] place-items-center px-4 py-16">
          <GlassCard interactive={false} className="max-w-xl p-8 text-center">
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary/10 text-3xl text-primary">☯</div>
            <h1 className="text-2xl font-semibold text-foreground">Page Not Found</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Back to Home</Link>
            </Button>
          </GlassCard>
        </main>
      </body>
    </html>
  );
}
