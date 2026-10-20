import { ArrowIcon } from "@/components/arrow-icon";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Milestones | A little guidance for every new month",
  description:
    "Gentle, age-specific guidance for your baby's first year. A monthly email, seven days before each new month, for $1 a month. Coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header wrap">
          <Link className="brand" href="/" aria-label="Little Milestones home">
            <span aria-hidden="true">✳</span> little milestones
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link className="button small" href="/subscribe">
              Get started <ArrowIcon />
            </Link>
          </nav>
        </header>
        {children}
        <footer className="wrap footer">
          <Link className="brand" href="/">
            ✳ little milestones
          </Link>
          <p>A little guidance. A lot of growing.</p>
          <p>In development · No payments accepted yet</p>
        </footer>
      </body>
    </html>
  );
}
