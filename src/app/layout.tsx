import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import { Preloader } from "@/components/organisms/Preloader/Preloader";
import { ConditionalLayout } from "@/components/organisms/ConditionalLayout/ConditionalLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-family-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-family-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-family-script",
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
  icons: {
    icon: '/favicon.png',
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
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable}`}
      >
        <Preloader />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
