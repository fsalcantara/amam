"use client";

import { useEffect, useState, useMemo } from 'react';
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
    quote: "Trabalhar na Amam é ter a certeza de que estamos levando qualidade para a mesa das pessoas. O ambiente é seguro e a empresa valoriza muito os motoristas."
  },
  {
    id: 2,
    name: "Ana Paula Silva",
    role: "Analista de RH",
    quote: "Ver o crescimento dos colaboradores e poder contribuir para o desenvolvimento profissional de cada um é o que me motiva todos os dias. A Amam é uma escola."
  },
  {
    id: 3,
    name: "Roberto Almeida",
    role: "Mestre Padeiro",
    quote: "Aqui temos liberdade para criar e inovar nas receitas, sempre mantendo a tradição. O respeito pelo processo artesanal em escala industrial é impressionante."
  },
  {
    id: 4,
    name: "Fernanda Costa",
    role: "Vendedora Externa",
    quote: "Sinto orgulho em representar uma marca tão forte no mercado. O suporte que a empresa dá para a equipe de vendas faz toda a diferença nos resultados."
  },
  {
    id: 5,
    name: "Ricardo Oliveira",
    role: "Gerente de Logística",
    quote: "Desafios diários e uma equipe unida. A dinâmica de distribuição exige precisão, e na Amam temos tecnologia e processos que nos ajudam a vencer."
  }
];

export default function WorkWithUsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ location: '' });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  // Carousel Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filters.location ? job.location.includes(filters.location) : true;
      
      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchTerm, filters]);

  // Extract unique locations for filter
  const locations = useMemo(() => {
    const locs = new Set(jobs.map(j => j.location).filter(Boolean));
    return Array.from(locs).map(l => ({ label: l, value: l }));
  }, [jobs]);

  return (
    <div className={styles.page}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <h1>Faça Parte do Nosso Time</h1>
            <p>Construa sua carreira em uma empresa sólida, que valoriza pessoas e busca excelência em tudo que faz.</p>
          </div>
        </Container>
      </section>

      {/* Search Box */}
      <Container>
        <div className={styles.searchBox}>
          <div className={styles.searchField}>
            <label>Local</label>
            <CustomSelect
              value={filters.location}
              onChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              options={[{ label: 'Todos', value: '' }, ...locations]}
              placeholder="Selecione um local"
              className={styles.inputSelect}
            />
          </div>
          <div className={styles.searchField}>
            <label>Qual vaga você procura?</label>
            <input 
              type="text" 
              placeholder="Nome da vaga ou cargo"
              className={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.searchButton}>
            Buscar vagas
          </button>
        </div>
      </Container>


      {/* Job List */}
      <section className={styles.jobsSection}>
        <Container>
          <h2 className={styles.sectionTitle}>
            Vagas em AMAM ALIMENTOS
            {searchTerm && <span style={{fontSize: '1rem', fontWeight: 400, marginLeft: '1rem', color: '#666'}}>Mostrando resultados para "{searchTerm}"</span>}
          </h2>
          
          <div className={styles.jobList}>
            {loading ? (
              <p>Carregando vagas...</p>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.jobInfo}>
                    <h3>{job.title}</h3>
                    <div className={styles.jobDetails}>
                      <div className={styles.jobDetail}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {job.location}
                      </div>
                      <div className={styles.tag}>Presencial</div>
                    </div>
                    <span className={styles.postedAt}>Postada há 2 dias</span>
                  </div>
                  <Link href={`/trabalhe-conosco/${job.id}`} className={styles.viewButton}>
                    Ver Vaga
                  </Link>
                </div>
              ))
            ) : (
              <p style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
                Nenhuma vaga encontrada com os filtros selecionados.
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Institutional Section */}
      <section className={styles.institutionalSection}>
        <Container>
          <div className={styles.institutionalContent}>
            <h2>Quem Somos</h2>
            <p>
              A Amam Alimentos é uma empresa sólida e renomada no mercado de Distribuição de Alimentos. 
              Com anos de experiência no ramo, a empresa se destaca pela qualidade dos produtos oferecidos e pelo 
              excelente atendimento aos clientes. Nossa missão é proporcionar alimentos de alta qualidade para as famílias brasileiras.
            </p>
            <p>
              Trabalhamos com marcas reconhecidas no mercado e buscamos sempre inovar em nosso portfólio.
              Temos como valores a ética, transparência, comprometimento e respeito, tanto com os clientes 
              quanto com os colaboradores. Buscamos constantemente a valorização da nossa equipe, 
              proporcionando um ambiente de trabalho colaborativo e motivador.
            </p>
            <p>
              Se você deseja fazer parte de uma empresa que preza pela excelência e pelo profissionalismo, 
              venha trabalhar conosco na Amam Alimentos e faça parte dessa história de sucesso.
            </p>
          </div>
        </Container>
      </section>

      {/* Media / Video Section */}
      <section className={styles.mediaSection}>
        <Container>
          <div className={styles.mediaGrid}>
            <div className={styles.videoContainer}>
               {/* Placeholder for Video */}
               <div style={{width: '100%', height: '100%', background: '#333'}}>
                  <Image 
                    src="/images/video-placeholder.jpg" 
                    alt="Vídeo institucional" 
                    width={600} 
                    height={400} 
                    style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7}}
                  /> 
               </div>
               <div className={styles.videoOverlay}>
                 <button className={styles.playButton} aria-label="Play Video">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M8 5v14l11-7z"/>
                   </svg>
                 </button>
               </div>
            </div>

            <div>
              <h2 style={{marginBottom: '2rem'}}>O que dizem sobre nossa empresa</h2>
              
              <div className={styles.testimonialWrapper}>
                {TESTIMONIALS.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={styles.testimonial}
                    style={{ 
                      display: index === activeTestimonial ? 'block' : 'none',
                      animation: 'fadeIn 0.5s ease-in-out'
                    }}
                  >
                    <div className={styles.testimonialHeader}>
                      <div style={{width: 50, height: 50, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 'bold'}}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className={styles.author}>
                        <h4>{testimonial.name}</h4>
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                    <p className={styles.quote}>
                      "{testimonial.quote}"
                    </p>
                  </div>
                ))}
                
                <div className={styles.dots}>
                  {TESTIMONIALS.map((_, index) => (
                    <button 
                      key={index}
                      className={`${styles.dot} ${index === activeTestimonial ? styles.activeDot : ''}`}
                      onClick={() => setActiveTestimonial(index)}
                      aria-label={`Ver depoimento ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className={styles.gallery}>
             <div style={{background: '#ddd', height: 250, borderRadius: 12}}></div>
             <div style={{background: '#ccc', height: 250, borderRadius: 12}}></div>
             <div style={{background: '#bbb', height: 250, borderRadius: 12}}></div>
             <div style={{background: '#aaa', height: 250, borderRadius: 12}}></div>
          </div>
        </Container>
      </section>

      {/* Talent Bank CTA */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <h2>Cadastre seu currículo no banco de talentos</h2>
            <p>
              Não encontrou a vaga desejada? Cadastre seu currículo em nosso banco de talentos 
              e aumente as suas chances de uma candidatura em nossos processos seletivos futuros.
            </p>
            <Link href="/trabalhe-conosco/banco-talentos" className={styles.ctaButton}>
              Cadastre seu currículo
            </Link>
          </div>
          <div className={styles.partners}>
            {/* Logos/Brand placeholder */}
            <span>solides</span>
          </div>
        </Container>
      </section>

    </div>
  );
}
