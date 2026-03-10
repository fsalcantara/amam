import { Hero } from "@/components/organisms/Hero/Hero";
import { ProductsPreview } from "@/components/organisms/ProductsPreview/ProductsPreview";
import { InstitutionalTeaser } from "@/components/organisms/InstitutionalTeaser/InstitutionalTeaser";
import { WhatsHappeningPreview } from "@/components/organisms/WhatsHappeningPreview/WhatsHappeningPreview";
import { SectionDivider } from "@/components/atoms/SectionDivider/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero 
        headline="Sabor e Qualidade em Cada Detalhe"
        subheadline="Descubra a excelência dos produtos Amam Alimentos. Tradição que alimenta famílias com confiança."
        ctaText="Conheça Nossos Produtos"
        ctaLink="/produtos"
      />
      
      {/* Hero (dark) → Products (white) — no wave needed, hero has its own bottom edge */}

      <ProductsPreview />
      
      <SectionDivider variant="white-to-red" />
      
      <InstitutionalTeaser />
      
      <WhatsHappeningPreview />
    </>
  );
}
