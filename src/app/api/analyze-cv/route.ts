import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Polyfixes for older pdfjs-dist used by pdf-parse on Node environments without DOM.
if (typeof global !== 'undefined') {
  if (typeof (global as any).DOMMatrix === 'undefined') {
    (global as any).DOMMatrix = class DOMMatrix {};
  }
  if (typeof (global as any).ImageData === 'undefined') {
    (global as any).ImageData = class ImageData {};
  }
  if (typeof (global as any).Path2D === 'undefined') {
    (global as any).Path2D = class Path2D {};
  }
}

// require pdf-parse directly
const pdfParse = require('pdf-parse');

export async function POST(request: NextRequest) {
  try {
    const { cvBase64, jobTitle, jobDescription, candidateName } = await request.json();

    if (!cvBase64 || !jobTitle) {
      return NextResponse.json(
        { error: 'Parâmetros cvBase64 e jobTitle são obrigatórios' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      // Retorna uma avaliação simulada se não houver chave
      return NextResponse.json({ 
        score: 85, 
        evaluation: `O currículo de ${candidateName || 'candidato'} indica uma boa experiência geral. Possui algumas competências alinhadas com a vaga de ${jobTitle}, mas faltam alguns detalhes sobre resultados alcançados. Simulação de avaliação por falta de API_KEY da OpenAI válida.`,
        recommendation: 'Bom candidato para entrevista.'
      });
    }

    const openai = new OpenAI({ apiKey });

    // Parse data URL: data:application/pdf;base64,.....
    const mimeTypeMatch = cvBase64.match(/^data:(.*?);base64,/);
    let mimeType = 'application/pdf';
    let base64Data = cvBase64;
    
    if (mimeTypeMatch) {
        mimeType = mimeTypeMatch[1];
        base64Data = cvBase64.replace(/^data:.*?;base64,/, '');
    }

    // A OpenAI na sua API de Chat base não lê PDF em base64 nativamente como imagem.
    // Usamos pdf-parse sob ambiente puramente Node com Polyfills de tela
    let cvText = "";
    
    if (mimeType === 'application/pdf') {
       try {
          const buffer = Buffer.from(base64Data, 'base64');
          const pdfData = await pdfParse(buffer);
          cvText = pdfData.text;
       } catch (err) {
          console.error("Falha ao extrair texto do PDF via pdf-parse", err);
          return NextResponse.json({ 
             score: 40,
             evaluation: "⚠️ Não foi possível ler o texto deste PDF. O arquivo pode estar codificado de forma corrompida, protegido por senha, ou ser apenas uma foto/scan colada numa página de PDF. Recomendamos pedir ao candidato que envie o currículo em PDF via 'Salvar como Texto'.",
             recommendation: "Rever manualmente"
          });
       }
    } else {
        return NextResponse.json({ 
          score: 50,
          evaluation: "⚠️ O formato de arquivo enviado não é suportado pelo nosso leitor no momento. Certifique-se de que é um PDF contendo texto.",
          recommendation: "Rever manualmente"
        });
    }

    if (!cvText || cvText.trim().length <= 50) {
        return NextResponse.json({ 
             score: 30,
             evaluation: "⚠️ O currículo parece estar vazio ou possui apenas imagens (curriculo criado em photoshop/canva exportado travado). O motor de IA precisa de texto legível para realizar a extração dos dados.",
             recommendation: "Rever manualmente"
          });
    }

    const prompt = `Você é um analista de Recursos Humanos sênior. Avalie o currículo extraído para a seguinte vaga:

Cargo: ${jobTitle}
Descrição/Requisitos da Vaga: ${jobDescription || 'Não informada'}
Nome do Candidato: ${candidateName || 'Não informado'}

Conteúdo extraído do Currículo:
"""
${cvText.substring(0, 15000)}
"""

Instruções da Avaliação:
1. Leia o conteúdo do currículo.
2. Compare a experiência e conhecimentos apresentados com os requisitos da vaga.
3. Atribua uma nota de 0 a 100 baseada na aderência à vaga.
4. Escreva uma breve avaliação justificando os pontos fortes e fracos encontrados no currículo.
5. Dê uma recomendação se deve ou não prosseguir para entrevista.

Retorne APENAS um JSON válido contendo:
{
  "score": 90,
  "evaluation": "Justificativa da nota. Pontos fortes e pontos fracos encontrados no currículo...",
  "recommendation": "Contratar / Entrevistar / Reprovar / Avaliar com cautela"
}`;

    try {
      const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.2
      });

      const messageContent = response.choices[0]?.message.content;
      if (!messageContent) {
          throw new Error("Resposta da IA veio vazia.");
      }

      const parsed = JSON.parse(messageContent);

      return NextResponse.json({ 
         score: parsed.score || 0,
         evaluation: parsed.evaluation || "Sem avaliação disponível.",
         recommendation: parsed.recommendation || "Rever"
      });

    } catch (apiError: any) {
        const errorMsg = apiError.message || String(apiError);
        
        if (errorMsg.includes('429') || errorMsg.includes('Too Many Requests') || errorMsg.includes('quota')) {
             return NextResponse.json({ 
                score: 50,
                evaluation: "⏳ A inteligência artificial (OpenAI) atingiu o limite de requisições ou estourou a cota da sua conta neste instante. Por favor, cheque seu saldo ou aguarde alguns minutos.",
                recommendation: "Tentar novamente mais tarde"
             });
        }
        
        throw apiError;
    }

  } catch (error: any) {
    console.error('Error analyzing CV:', error);
    return NextResponse.json(
      { error: 'Erro ao analisar currículo.', details: error.message || String(error) },
      { status: 500 }
    );
  }
}
