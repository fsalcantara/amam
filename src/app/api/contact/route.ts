import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { 
      formType, // 'contact' | 'job'
      name, 
      email, 
      phone, 
      city, 
      segment, 
      otherSegment, 
      businessName,
      subject: userSubject,
      message,
      jobId,
      cpf,
      linkedin
    } = data;

    // Configuração do Transporter (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true para 465, false para outros
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Configurado no .env.local
      },
    });

    let mailSubject = '';
    let mailBody = '';

    if (formType === 'job') {
      mailSubject = `Nova Candidatura: ${name} - Vaga ${jobId || 'Geral'}`;
      mailBody = `
        <h3>Nova candidatura recebida pelo site</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>LinkedIn:</strong> ${linkedin || 'Não informado'}</p>
        <br>
        <p>Esta candidatura foi gerada via portal Trabalhe Conosco.</p>
      `;
    } else {
      mailSubject = `Novo Contato Site: ${segment || 'Geral'} - ${businessName || name}`;
      mailBody = `
        <h3>Novo contato comercial recebido pelo site</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Cidade:</strong> ${city}</p>
        <p><strong>Segmento:</strong> ${segment} ${otherSegment ? `(${otherSegment})` : ''}</p>
        <p><strong>Empresa:</strong> ${businessName}</p>
        <p><strong>Assunto:</strong> ${userSubject || 'Nenhum'}</p>
        <p><strong>Mensagem:</strong> ${message || 'Sem mensagem adicional'}</p>
        <br>
        <p>Enviado via formulário de contato do site Amam Alimentos.</p>
      `;
    }

    // Envio do e-mail
    await transporter.sendMail({
      from: `"Site Amam Alimentos" <${process.env.SMTP_USER}>`,
      to: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'vendas@amamalimentos.com.br',
      subject: mailSubject,
      html: mailBody,
    });

    return NextResponse.json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, message: 'Ocorreu um erro ao enviar sua mensagem. Verifique se a senha do e-mail está configurada no servidor.' },
      { status: 500 }
    );
  }
}
