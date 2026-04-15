"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { jobService } from '@/features/jobs/services/jobService';
import { Job } from '@/features/jobs/types/job';
import { CustomSelect } from '@/features/admin/components/ui/CustomSelect';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "Motorista Entregador",
    avatar: "/images/careers/avatar-carlos.png",
    quote: "Trabalhar na Amam é ter a certeza de que estamos levando qualidade para a mesa das pessoas. O ambiente é seguro e a empresa valoriza muito os motoristas."
  },
  {
    id: 2,
    name: "Ana Paula Silva",
    role: "Analista de RH",
    avatar: "/images/careers/avatar-ana.png",
    quote: "Ver o crescimento dos colaboradores e poder contribuir para o desenvolvimento profissional de cada um é o que me motiva todos os dias. A Amam é uma escola."
  },
  {
    id: 3,
    name: "Roberto Almeida",
    role: "Mestre Padeiro",
    avatar: "/images/careers/avatar-roberto.png",
    quote: "Aqui temos liberdade para criar e inovar nas receitas, sempre mantendo a tradição. O respeito pelo processo artesanal em escala industrial é impressionante."
  },
  {
    id: 4,
    name: "Fernanda Costa",
    role: "Vendedora Externa",
    avatar: "/images/careers/avatar-fernanda.png",
    quote: "Sinto orgulho em representar uma marca tão forte no mercado. O suporte que a empresa dá para a equipe de vendas faz toda a diferença nos resultados."
  },
  {
    id: 5,
    name: "Ricardo Oliveira",
    role: "Gerente de Logística",
    avatar: "/images/careers/avatar-ricardo.png",
    quote: "Desafios diários e uma equipe unida. A dinâmica de distribuição exige precisão, e na Amam temos tecnologia e processos que nos ajudam a vencer."
  }
];

const CULTURE_POINTS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Ambiente Colaborativo",
    desc: "Uma equipe unida onde cada pessoa importa. Crescemos juntos, celebramos juntos."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Qualidade e Tradição",
    desc: "Décadas de história e comprometimento com padrões de excelência em cada produto."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: "Crescimento Profissional",
    desc: "Plano de carreira, capacitações e oportunidades para quem quer evoluir."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Valorização das Pessoas",
    desc: "Benefícios, reconhecimento e respeito. Aqui, pessoas vêm primeiro."
  }
];

const GALLERY_IMAGES = [
  { src: "/SITE/Empresa/Operador_desenformando_pao.png", alt: "Extração cuidadosa dos pães" },
  { src: "/SITE/Empresa/Paes_na_maquina.jpg", alt: "Produção em escala amam" },
  { src: "/SITE/Empresa/Funcionaria_guardando_paes.jpg", alt: "Organização e controle de qualidade" },
  { src: "/SITE/Empresa/Operador_mexendo_na_maquina.jpg", alt: "Monitoramento constante" },
  { src: "/SITE/Empresa/Operadora_mexendo_no_pao.jpg", alt: "Toque artesanal na indústria" },
  { src: "/SITE/Empresa/operador_retirando_paes_forno.jpg", alt: "Fornadas sempre fresquinhas" },
  { src: "/SITE/Empresa/Imagem10.jpg", alt: "Equipe dedicada AMAM" },
  { src: "/SITE/Empresa/Imagem11.jpg", alt: "Excelência em panificação" },
  { src: "/SITE/Empresa/Imagem12.jpg", alt: "Processo produtivo moderno" },
  { src: "/SITE/Empresa/Imagem13.jpg", alt: "Qualidade garantida" },
  { src: "/SITE/Empresa/Imagem14.jpg", alt: "Logística interna ágil" },
  { src: "/SITE/Empresa/Imagem15.jpg", alt: "Cuidado em cada detalhe" },
  { src: "/SITE/Empresa/Imagem16.jpg", alt: "Paixão pelo que fazemos" },
  { src: "/SITE/Empresa/Imagem17.jpg", alt: "Tecnologia a serviço do sabor" },
  { src: "/SITE/Empresa/Imagem18.jpg", alt: "Ambiente seguro e profissional" },
  { src: "/SITE/Empresa/Imagem19.jpg", alt: "Nosso pão de cada dia" },
  { src: "/SITE/Empresa/Imagem20.jpg", alt: "Sabor que atravessa gerações" },
  { src: "/SITE/Empresa/Imagem9.jpg", alt: "Foco no resultado" },
  { src: "/SITE/Empresa/fachada_amam.jpg", alt: "Nossa sede em Uberlândia" },
];

function getWorkType(job: Job): { label: string; type: 'presencial' | 'remoto' | 'hibrido' } {
  const desc = (job.description + ' ' + job.title).toLowerCase();
  if (desc.includes('remoto') || desc.includes('home office')) return { label: 'Remoto', type: 'remoto' };
  if (desc.includes('híbrido') || desc.includes('hibrido')) return { label: 'Híbrido', type: 'hibrido' };
  return { label: 'Presencial', type: 'presencial' };
}

function getPostedLabel(createdAt: string): string {
  // Turso returns "2026-04-14 21:03:39" (space instead of T) — normalize to ISO 8601
  const normalized = createdAt ? createdAt.replace(' ', 'T') : '';
  const created = new Date(normalized);
  if (!normalized || isNaN(created.getTime())) return 'Publicada recentemente';
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Publicada hoje';
  if (diffDays === 1) return 'Publicada há 1 dia';
  if (diffDays < 7) return `Publicada há ${diffDays} dias`;
  if (diffDays < 30) return `Publicada há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  if (diffDays < 365) return `Publicada há ${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) === 1 ? 'mês' : 'meses'}`;
  return `Publicada há mais de 1 ano`;
}

export default function WorkWithUsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ location: '' });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [pendingSearch, setPendingSearch] = useState('');
  const [pendingLocation, setPendingLocation] = useState('');
  const vagasRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getJobs();
        setJobs(data.filter(j => j.isActive));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Testimonial auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !filters.location || job.location.includes(filters.location);
      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchTerm, filters]);

  const locations = useMemo(() => {
    const locs = new Set(jobs.map(j => j.location).filter(Boolean));
    return Array.from(locs).map(l => ({ label: l, value: l }));
  }, [jobs]);

  const handleSearch = () => {
    setSearchTerm(pendingSearch);
    setFilters(prev => ({ ...prev, location: pendingLocation }));
    setIsSearching(true);
    vagasRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleHeroScroll = () => {
    vagasRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>

      {/* ── 1. HERO ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBg}>
            <Image
              src="/images/careers/trabalhe-conosco-main.png"
              alt="Nossa equipe AMAM"
              fill
              sizes="(max-width: 1200px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Faça parte do nosso time</h1>
            <p className={styles.heroSubtitle}>
              Construa sua carreira em uma empresa que valoriza pessoas, qualidade e inovação.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.heroBtn} onClick={handleHeroScroll}>
                Ver vagas abertas
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f5f5f5"/>
          </svg>
        </div>
      </section>

      {/* ── 2. SEARCH PANEL ───────────────────────────────────── */}
      <section className={styles.searchSection}>
        <Container>
          <div className={styles.searchPanel}>
            <div className={styles.searchPanelHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Encontre sua próxima oportunidade</span>
            </div>
            <div className={styles.searchFields}>
              <div className={styles.searchField}>
                <label>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Local
                </label>
                <CustomSelect
                  value={pendingLocation}
                  onChange={(value) => setPendingLocation(value)}
                  options={[{ label: 'Todos os locais', value: '' }, ...locations]}
                  placeholder="Selecione um local"
                  className={styles.inputSelect}
                />
              </div>
              <div className={styles.searchFieldDivider} />
              <div className={styles.searchField}>
                <label>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  Cargo ou palavra-chave
                </label>
                <input
                  type="text"
                  placeholder="Ex: Motorista, Vendedor, Padeiro..."
                  className={styles.searchInput}
                  value={pendingSearch}
                  onChange={(e) => setPendingSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button className={styles.searchBtn} onClick={handleSearch}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Buscar vagas
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. JOB LISTINGS ───────────────────────────────────── */}
      <section className={styles.jobsSection} ref={vagasRef} id="vagas">
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Vagas em Aberto
            </h2>
            <p className={styles.sectionSubtitle}>
              {isSearching && (searchTerm || filters.location)
                ? `Exibindo resultados para "${searchTerm || filters.location}"`
                : `${filteredJobs.length} oportunidade${filteredJobs.length !== 1 ? 's' : ''} disponíve${filteredJobs.length !== 1 ? 'is' : 'l'}`}
            </p>
          </div>

          <div className={styles.jobGrid}>
            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner} />
                <p>Carregando vagas...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map(job => {
                const workType = getWorkType(job);
                return (
                  <div key={job.id} className={styles.jobCard}>
                    <div className={styles.jobCardTop}>
                      <span className={`${styles.workTag} ${styles[`workTag_${workType.type}`]}`}>
                        {workType.label}
                      </span>
                      <span className={styles.jobDate}>{getPostedLabel(job.createdAt)}</span>
                    </div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobMetaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {job.location}
                      </span>
                      <span className={styles.jobMetaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        {({ admin: 'Administrativo', production: 'Produção', logistics: 'Logística', commercial: 'Comercial' } as Record<string,string>)[job.area] ?? job.area ?? 'Geral'}
                      </span>
                    </div>
                    <p className={styles.jobDesc}>
                      {job.description.slice(0, 120)}{job.description.length > 120 ? '...' : ''}
                    </p>
                    <Link href={`/trabalhe-conosco/${job.id}`} className={styles.jobApplyBtn}>
                      Ver vaga
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p>Nenhuma vaga encontrada com os filtros selecionados.</p>
                <button
                  className={styles.clearFiltersBtn}
                  onClick={() => { setSearchTerm(''); setPendingSearch(''); setFilters({ location: '' }); setPendingLocation(''); setIsSearching(false); }}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── 4. WHY WORK WITH US ───────────────────────────────── */}
      <section className={styles.cultureSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Por que trabalhar na AMAM?</h2>
            <p className={styles.sectionSubtitle}>Uma empresa onde valores fazem a diferença todos os dias.</p>
          </div>
          <div className={styles.cultureGrid}>
            {CULTURE_POINTS.map((point, i) => (
              <div key={i} className={styles.cultureCard}>
                <div className={styles.cultureIcon}>{point.icon}</div>
                <h3 className={styles.cultureTitle}>{point.title}</h3>
                <p className={styles.cultureDesc}>{point.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. ABOUT — TWO COLUMN ─────────────────────────────── */}
      <section className={styles.aboutSection}>
        <Container>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.aboutEyebrow}>Quem Somos</span>
              <h2 className={styles.aboutTitle}>Uma história construída com propósito</h2>
              <p>
                A Amam Alimentos é uma empresa sólida e renomada no mercado de Distribuição de Alimentos.
                Com anos de experiência no ramo, a empresa se destaca pela qualidade dos produtos
                oferecidos e pelo excelente atendimento aos clientes.
              </p>
              <p>
                Trabalhamos com marcas reconhecidas no mercado e buscamos sempre inovar em nosso portfólio.
                Temos como valores a ética, transparência, comprometimento e respeito, tanto com os clientes
                quanto com os colaboradores.
              </p>
              <p>
                Se você deseja fazer parte de uma empresa que preza pela excelência e pelo profissionalismo,
                venha trabalhar conosco e faça parte dessa história de sucesso.
              </p>
              <Link href="/sobre" className={styles.aboutLink}>
                Conheça mais sobre a AMAM
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className={styles.acronymImageWrapper}>
              <Image 
                src="/SITE/Empresa/amam-acronimo.png" 
                alt="Acrônimo AMAM: Atitude, Compromisso, Determinação, Metas"
                width={800}
                height={800}
                className={styles.acronymImage}
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. TALENT POOL CTA ────────────────────────────────── */}
      <section className={styles.talentCta}>
        <div className={styles.talentCtaBg} />
        <Container>
          <div className={styles.talentCtaContent}>
            <div className={styles.talentCtaIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <h2 className={styles.talentCtaTitle}>Cadastre seu currículo no nosso banco de talentos</h2>
            <p className={styles.talentCtaSubtitle}>
              Mesmo que não encontre uma vaga agora, queremos conhecer você.
              Faremos contato quando surgir uma oportunidade ideal para o seu perfil.
            </p>
            <Link href="/trabalhe-conosco/banco-talentos" className={styles.talentCtaBtn}>
              Cadastrar currículo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── 6. TESTIMONIALS CAROUSEL ──────────────────────────── */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsBg} />
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWhite}`}>O que dizem nossos colaboradores</h2>
            <p className={`${styles.sectionSubtitle} ${styles.sectionSubtitleWhite}`}>Histórias reais de quem faz a AMAM acontecer.</p>
          </div>
          <div className={styles.testimonialsCarousel}>
            {TESTIMONIALS.map((t, index) => (
              <div
                key={t.id}
                className={`${styles.testimonialCard} ${index === activeTestimonial ? styles.testimonialCardActive : ''}`}
                style={{ display: index === activeTestimonial ? 'flex' : 'none' }}
              >
                <div className={styles.testimonialQuoteIcon}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M8 28C8 22 11 17 17 14L16 12C9 15 4 21 4 28V36H12V28H8Z" fill="rgba(255,255,255,0.15)"/>
                    <path d="M24 28C24 22 27 17 33 14L32 12C25 15 20 21 20 28V36H28V28H24Z" fill="rgba(255,255,255,0.15)"/>
                  </svg>
                </div>
                <p className={styles.testimonialQuote}>{t.quote}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    <Image src={t.avatar} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <strong className={styles.testimonialName}>{t.name}</strong>
                    <span className={styles.testimonialRole}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.carouselDots}>
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselDot} ${index === activeTestimonial ? styles.carouselDotActive : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Ver depoimento ${index + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. GALLERY ────────────────────────────────────────── */}
      <section className={styles.gallerySection}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.aboutEyebrow}>Inside AMAM</span>
            <h2 className={styles.sectionTitle}>Nossa Empresa em Fotos</h2>
            <p className={styles.sectionSubtitle}>Conheça o ambiente onde você vai trabalhar.</p>
          </div>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
                <div 
                  key={i} 
                  className={styles.galleryItemMarquee}
                  style={{ '--delay': `${(i % 19) * 3 - 57}s` } as React.CSSProperties}
                >
                  <img src={img.src} alt={img.alt} />
                  <div className={styles.galleryOverlay}>
                    <span>{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>



      {/* ── 9. FOOTER WAVE (REMOVED: Handled by RootLayout) ── */}

    </div>
  );
}
