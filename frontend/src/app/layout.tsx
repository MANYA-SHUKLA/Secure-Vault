import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secure Vault - Password Manager',
  description: 'A secure password manager with client-side encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme ? theme === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 overflow-x-hidden`}>
        {/* Global decorative background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Soft gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900" />
          {/* Subtle texture (online image) */}
          <div
            className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
          />
          {/* Animated blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-70 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="w-full flex justify-end p-4">
          <ThemeToggle />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}