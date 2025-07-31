// app/layout.tsx
import './tailwind.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RecCheck — Harm Minimisation App',
  description:
    'RecCheck helps educate and reduce harm by providing interaction checkers, regional alerts, and evidence-based info.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 font-sans">
        <header className="bg-black text-white py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <a href="/" className="text-xl font-bold tracking-tight">
              RecCheck
            </a>
            <nav className="space-x-6 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/#features" className="hover:underline">
                Features
              </a>
              <a href="/app" className="hover:underline">
                Launch App
              </a>
            </nav>
          </div>
        </header>

        <main className="mt-6">{children}</main>

        <footer className="text-center text-xs text-gray-500 py-10 border-t mt-20">
          <p>© 2025 RecCheck. Educational use only. Stay safe out there. ❤️</p>
        </footer>
      </body>
    </html>
  );
}
