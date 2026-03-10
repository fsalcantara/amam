import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const AREA_LABELS: Record<string, string> = {
  admin: 'Administrativo',
  production: 'Produção',
  logistics: 'Logística',
  commercial: 'Comercial',
};

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, jobArea, jobDescription } = await request.json();

    if (!jobTitle || !jobArea) {
      return NextResponse.json(
        { error: 'jobTitle e jobArea são obrigatórios' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      // Fallback: return area-based default questions
      return NextResponse.json({ questions: getFallbackQuestions(jobArea) });
    }

    const openai = new OpenAI({ apiKey });
    const areaLabel = AREA_LABELS[jobArea] || jobArea;

    const prompt = `Você é um especialista em Recursos Humanos. Gere exatamente 10 perguntas de triagem para a seguinte vaga:

Cargo: ${jobTitle}
Área: ${areaLabel}
Descrição: ${jobDescription || 'Não informada'}

Requisitos:
- Cada pergunta deve ter exatamente 4 opções de resposta (A, B, C, D)
- As perguntas devem avaliar conhecimentos técnicos, comportamentais e adequação cultural
- Inclua perguntas de raciocínio lógico e resolução de problemas
- Marque qual é a resposta correta (0 = A, 1 = B, 2 = C, 3 = D)

Retorne APENAS um JSON válido contendo a estrutura:
{
  "questions": [
    {
      "text": "Texto da pergunta",
      "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "correctOptionIndex": 0
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const messageContent = response.choices[0]?.message.content;
    if (!messageContent) {
      console.error('Failed to parse OpenAI response');
      return NextResponse.json({ questions: getFallbackQuestions(jobArea) });
    }

    const parsed = JSON.parse(messageContent);
    const generatedQuestions = parsed.questions || parsed;

    const questions = generatedQuestions.map((q: any, i: number) => ({
      id: `q_${Date.now()}_${i}`,
      text: q.text || 'Pergunta',
      options: (q.options || []).slice(0, 4),
      correctOptionIndex: q.correctOptionIndex ?? 0,
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar perguntas. Usando banco de perguntas padrão.', questions: getFallbackQuestions('admin') },
      { status: 200 }
    );
  }
}

function getFallbackQuestions(area: string) {
  const baseQuestions = [
    {
      id: `fb_1`, text: 'Como você lida com prazos apertados?',
      options: ['Priorizo tarefas e organizo meu tempo', 'Peço para alguém fazer por mim', 'Ignoro o prazo', 'Reclamo com o gestor'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_2`, text: 'Qual é a importância do trabalho em equipe?',
      options: ['Fundamental para resultados melhores', 'Dispensável se eu for competente', 'Depende da situação', 'Prefiro trabalhar sozinho sempre'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_3`, text: 'Como você reage ao receber um feedback negativo?',
      options: ['Reflito e busco melhorar', 'Discordo e argumento imediatamente', 'Ignoro completamente', 'Fico desmotivado por dias'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_4`, text: 'O que mais te motiva no trabalho?',
      options: ['Crescimento profissional e desafios', 'Apenas o salário', 'Nada em particular', 'Horário flexível para sair cedo'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_5`, text: 'Se um colega não está fazendo sua parte, o que você faz?',
      options: ['Converso diretamente com ele para entender', 'Reclamo com o chefe imediatamente', 'Faço o trabalho dele sem falar nada', 'Ignoro e foco apenas no meu'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_6`, text: 'Qual a sua expectativa de crescimento profissional?',
      options: ['Busco oportunidades de aprendizado contínuo', 'Quero ser promovido em 3 meses', 'Não penso nisso', 'Quero apenas estabilidade'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_7`, text: 'Como você se mantém atualizado na sua área?',
      options: ['Cursos, leituras e eventos', 'Não busco atualização', 'Apenas quando a empresa exige', 'Assisto vídeos genéricos'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_8`, text: 'Qual é a sua maior qualidade profissional?',
      options: ['Comprometimento e responsabilidade', 'Ser pontual às vezes', 'Não sei dizer', 'Sou bom em fazer o mínimo'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_9`, text: 'Como você organiza suas tarefas diárias?',
      options: ['Uso listas e priorizo por urgência', 'Faço o que aparece primeiro', 'Não me organizo', 'Espero alguém me dizer o que fazer'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
    {
      id: `fb_10`, text: 'Por que você se candidatou a esta vaga?',
      options: ['Identificação com a empresa e a função', 'Preciso de qualquer emprego', 'Vi o anúncio e cliquei', 'Alguém me indicou sem saber do que se trata'] as [string, string, string, string],
      correctOptionIndex: 0,
    },
  ];

  return baseQuestions;
}
