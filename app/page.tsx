import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Neutral UI Kit
          </span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/demo"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
          >
            Open demo
          </Link>
          <Link
            href="http://localhost:6006"
            className="hidden sm:inline-flex rounded-md border px-4 py-2 text-sm hover:bg-muted/60 transition"
          >
            Storybook
          </Link>
          <Link
            href="https://github.com/maxkurylenko1"
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition"
            target="_blank"
          >
            GitHub
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 lg:py-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            React UI library playground
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            This project contains reusable components (button, input, dialog,
            dropdown, tooltip, table, pagination) and a demo page to preview
            them all together.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground font-medium hover:bg-primary/90 transition"
            >
              Go to Demo
            </Link>
            <Link
              href="http://localhost:6006"
              className="rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-muted/50 transition"
            >
              Open Storybook
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
