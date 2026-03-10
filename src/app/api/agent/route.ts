import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    // Inicialização atrasada (lazy) para evitar erro de build na Vercel se a key nao existir
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn("OPENAI_API_KEY não configurada no servidor.");
      return NextResponse.json({ error: 'IA temporariamente indisponível' }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey });
    
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Formato de mensagens inválido' }, { status: 400 });
    }

    const systemPrompt = `Você é a Ana, a assistente virtual oficial e simpática da Amam Alimentos.
Sua missão é ajudar os clientes e usuários que navegam no site da Amam.

Sobre a Amam Alimentos:
- É uma indústria alimentícia de referência na fabricação de pães.
- Possui forte tradição, qualidade e higiene em seus processos.
- Fica localizada na Bahia.

Diretrizes de Atendimento:
1. COMPRAS / PEDIDOS: Se o cliente quiser fazer um pedido, comprar no atacado (para supermercados, padarias, lanchonetes) ou como consumidor final, informe com muito entusiasmo que nossos consultores de venda estão prontos para atendê-lo! Oriente o cliente a entrar em contato diretamente pelo WhatsApp Comercial da central: (71) 9999-9999 (número ilustrativo) ou visitar a página "Contato" no menu do site.
2. VAGAS DE EMPREGO: Se a pessoa perguntar sobre empregos, enviar currículo ou trabalhar na Amam, seja acolhedora e instrua a acessar a aba "Trabalhe Conosco" no menu principal do site, onde ela poderá ver as vagas abertas e cadastrar o currículo pelo nosso portal de Inteligência Artificial.
3. DÚVIDAS GERAIS: Responda de forma curta, clara e profissional. Não invente produtos que não sejam pães.
4. TOM DE VOZ: Seja sempre muito educada, use emojis de forma moderada para transmitir leveza, e seja concisa (evite textos gigantes).

Responda sempre em Português do Brasil de forma humanizada.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        // Limita o histórico das últimas 10 mensagens para não gastar muitos tokens
        ...messages.slice(-10)
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const reply = response.choices[0]?.message;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Agent route error:', error);
    return NextResponse.json({ error: 'Erro ao processar mensagem com a IA' }, { status: 500 });
  }
}
