"use client";

import { usePathname } from 'next/navigation';
import { Header } from "@/components/organisms/Header/Header";
import { Footer } from "@/components/organisms/Footer/Footer";
import { SectionDivider } from "@/components/atoms/SectionDivider/SectionDivider";
import { VirtualAgent } from "@/components/organisms/VirtualAgent/VirtualAgent";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <main style={{ flex: 1 }}>
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <div style={{ marginTop: '0rem' }}>
        <SectionDivider variant="white-to-red" />
        <Footer />
      </div>
      <VirtualAgent />
    </>
  );
}
