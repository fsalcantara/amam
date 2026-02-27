import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/organisms/Header/Header";
import { Footer } from "@/components/organisms/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-family-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-family-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Amam Alimentos',
    default: 'Amam Alimentos | Tradição e Qualidade',
  },
  description: 'Amam Alimentos - Indústria alimentícia referência em pães, bolos e salgados. Qualidade e tradição para sua família.',
  keywords: ['amam', 'alimentos', 'pão', 'bolo', 'indústria alimentícia', 'bahia'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.amamalimentos.com.br',
    siteName: 'Amam Alimentos',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
