import { Job } from '../types/job';

let MOCKED_JOBS: Job[] = [
  {
    id: '1',
    title: 'Analista Financeiro',
    area: 'admin',
    description: 'Responsável por análise de fluxo de caixa e relatórios gerenciais.',
    requirements: ['Superior completo em Contabilidade ou Economia', 'Excel Avançado'],
    location: 'Vitória da Conquista/BA',
    isActive: true,
    createdAt: new Date().toISOString(),
    screeningQuestions: [
      {
        id: 'sq_1',
        text: 'Qual ferramenta é mais utilizada para análise de fluxo de caixa?',
        options: ['Excel com macros e tabelas dinâmicas', 'Microsoft Word', 'PowerPoint', 'Paint'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_2',
        text: 'O que é DRE?',
        options: ['Demonstração do Resultado do Exercício', 'Dados de Receita Empresarial', 'Distribuição de Renda Econômica', 'Documento de Registro Externo'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_3',
        text: 'Como você prioriza tarefas com prazos conflitantes?',
        options: ['Avalio urgência e importância de cada uma', 'Faço todas ao mesmo tempo', 'Ignoro a menos urgente', 'Peço para alguém decidir por mim'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_4',
        text: 'Qual é a principal diferença entre regime de caixa e regime de competência?',
        options: ['Regime de competência registra no fato gerador; caixa no pagamento/recebimento', 'Caixa é apenas para empresas pequenas', 'Competência se refere à habilidade do contador', 'Não há diferença prática'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_5',
        text: 'Como você lida com divergências nos dados financeiros de um relatório?',
        options: ['Investigo a causa raiz e corrijo a divergência', 'Ajusto o valor para fechar a conta', 'Ignoro se a diferença for pequena', 'Peço para refazerem tudo sem analisar'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_6',
        text: 'O que representa o capital de giro de uma empresa?',
        options: ['Recursos necessários para manter as operações do dia a dia', 'O lucro líquido do mês', 'O valor total das dívidas da empresa', 'O valor dos imóveis da empresa'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_7',
        text: 'Qual índice é frequentemente utilizado para medir a capacidade de pagamento a curto prazo?',
        options: ['Liquidez Corrente', 'Retorno sobre o Investimento (ROI)', 'Margem Bruta', 'Endividamento Geral'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_8',
        text: 'Na sua visão, qual a importância da conciliação bancária?',
        options: ['Garantir que os saldos bancários correspondam aos registros internos', 'Apenas para cumprir exigências da auditoria', 'Evitar cobranças de tarifas bancárias', 'Aumentar os rendimentos das aplicações'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_9',
        text: 'O que significa o indicador ROI (Return on Investment)?',
        options: ['Relação entre o retorno obtido e o investimento realizado', 'Regra Operacional Interna', 'Registro Orçamentário de Impostos', 'Referência de Obrigação Indireta'],
        correctOptionIndex: 0,
      },
      {
        id: 'sq_10',
        text: 'Como você garante precisão no desenvolvimento de planilhas financeiras complexas?',
        options: ['Uso validações, testes em fórmulas e reconcilio totais', 'Faço tudo correndo para entregar logo', 'Uso apenas soma e subtração básicas', 'Confio puramente na minha memória'],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: '2',
    title: 'Auxiliar de Padaria',
    area: 'production',
    description: 'Auxiliar na produção de pães e massas.',
    requirements: ['Ensino fundamental completo', 'Disponibilidade de horário'],
    location: 'Vitória da Conquista/BA',
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];

export const jobService = {
  getJobs: async (): Promise<Job[]> => {
    const res = await fetch('/api/jobs');
    if (!res.ok) throw new Error('Falha ao buscar vagas');
    return res.json();
  },

  getJobById: async (id: string): Promise<Job | undefined> => {
    const res = await fetch(`/api/jobs/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error('Falha ao buscar vaga');
    return res.json();
  },

  createJob: async (job: Omit<Job, 'id' | 'createdAt'>): Promise<Job> => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(err.error || 'Falha ao criar vaga');
    }
    return res.json();
  },

  updateJob: async (id: string, updates: Partial<Job>): Promise<Job | null> => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) return null;
    return { id, ...updates } as Job;
  },

  deleteJob: async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    return res.ok;
  }
};
