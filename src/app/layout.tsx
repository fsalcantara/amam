import type { Metadata } from "next";
import { Montserrat, Geist_Mono, Dancing_Script } from "next/font/google";
import { Preloader } from "@/components/organisms/Preloader/Preloader";
import { ConditionalLayout } from "@/components/organisms/ConditionalLayout/ConditionalLayout";
import { ToastProvider } from "@/components/atoms/Toast/ToastContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-family-sans",
  subsets: ["latin"],
  display: "swap",
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
  metadataBase: new URL('https://amamalimentos.com.br'),
  title: {
    template: '%s | Amam Alimentos',
    default: 'Amam Alimentos | Tradição e Qualidade',
  },
  description: 'Amam Alimentos - Indústria alimentícia com foco em excelência e nutrição. Aliando alta tecnologia à pureza do toque artesanal, levamos pães deliciosos à mesa das famílias.',
  keywords: ['amam', 'alimentos', 'pão', 'pão de forma', 'pão sem casca', 'indústria alimentícia', 'cuidado artesanal'],
  openGraph: {
    title: 'Amam Alimentos | Cuidado Artesanal',
    description: 'Levamos excelência, sabor e tradição para a sua mesa, todos os dias.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://amamalimentos.com.br',
    siteName: 'Amam Alimentos',
    images: [
      {
        url: '/SITE/LOGO/logo-color.png',
        width: 1200,
        height: 630,
        alt: 'Amam Alimentos Logo',
      },
    ],
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
        className={`${montserrat.variable} ${geistMono.variable} ${dancingScript.variable}`}
      >
        <ToastProvider>
          <Preloader />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
