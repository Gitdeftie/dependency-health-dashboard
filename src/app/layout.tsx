import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dependency Health Dashboard',
  description: 'A powerful tool to analyze and visualize the health of your project dependencies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-200 bg-gray-50 dark:bg-black text-gray-900 dark:text-dracula-foreground`}>
        <ThemeProvider>
          <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-dracula-currentLine shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Dependency Health Dashboard</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 