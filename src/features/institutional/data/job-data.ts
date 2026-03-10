export interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface JobArea {
  id: string;
  title: string;
  description: string;
  vacancies: Vacancy[];
}

export const JOB_DATA: JobArea[] = [
  {
    id: 'admin',
    title: 'Administrativo',
    description: 'Faça parte do time que mantém nossa organização funcionando com excelência.',
    vacancies: [
      {
        id: 'fin-analyst',
        title: 'Analista Financeiro',
        location: 'São Bernardo do Campo - SP',
        type: 'Presencial',
        description: 'Responsável pleo controle de fluxo de caixa, conciliação bancária e relatórios gerenciais.',
        requirements: ['Superior completo em Contabilidade ou Economia', 'Excel Avançado', 'Experiência de 3 anos']
      },
      {
        id: 'hr-assist',
        title: 'Assistente de RH',
        location: 'São Bernardo do Campo - SP',
        type: 'Presencial',
        description: 'Apoio nos processos de recrutamento e seleção, admissão e benefícios.',
        requirements: ['Superior cursando em RH ou Psicologia', 'Boa comunicação', 'Proatividade']
      }
    ]
  },
  {
    id: 'production',
    title: 'Produção',
    description: 'Coloque a mão na massa e ajude a produzir nossos deliciosos produtos.',
    vacancies: [
      {
        id: 'baker',
        title: 'Padeiro',
        location: 'São Bernardo do Campo - SP',
        type: 'Presencial',
        description: 'Produção de pães diversos, seguindo fichas técnicas e padrões de qualidade.',
        requirements: ['Experiência comprovada em padaria', 'Disponibilidade de horário']
      },
       {
        id: 'conf-sup',
        title: 'Confeiteiro',
        location: 'São Bernardo do Campo - SP',
        type: 'Presencial',
        description: 'Elaboração de bolos, com foco em acabamento e sabor.',
        requirements: ['Experiência em confeitaria', 'Criatividade']
      }
    ]
  },
  {
    id: 'logistics',
    title: 'Logística',
    description: 'Garanta que nossos produtos cheguem frescos aos nossos clientes.',
    vacancies: [
      {
        id: 'driver',
        title: 'Motorista Entregador',
        location: 'São Bernardo do Campo - SP',
        type: 'Presencial',
        description: 'Realizar entregas de produtos em diversos pontos de venda na região.',
        requirements: ['CNH Categoria C ou D', 'Experiência com entregas', 'Conhecimento da região']
      }
    ]
  },
  {
    id: 'commercial',
    title: 'Comercial',
    description: 'Leve a marca Amam para novos mercados e fortaleça nosso relacionamento.',
    vacancies: [
      {
        id: 'sales-ext',
        title: 'Vendedor Externo',
        location: 'Grande SP',
        type: 'Híbrido',
        description: 'Prospecção de novos clientes e gestão da carteira ativa.',
        requirements: ['Experiência em vendas de alimentos', 'Veículo próprio', 'Negociação']
      }
    ]
  }
];

export const getJobAreaById = (id: string) => JOB_DATA.find(area => area.id === id);
