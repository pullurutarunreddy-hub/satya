import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Satya Community Chits. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="#"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
