import './styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white font-sans">
        {/* 🔥 Subtle animated smoke background */}
        <div className="smoke-overlay" />

        {/* 🔲 Main content */}
        {children}
      </body>
    </html>
  );
}

