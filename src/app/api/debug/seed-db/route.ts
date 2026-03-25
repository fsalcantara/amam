import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/features/products/data/mock-data';
import { productService } from '@/features/products/services/productService';
import { jobService } from '@/features/jobs/services/jobService';
import db from '@/lib/db';

export async function GET() {
  try {
    // 1. Check if products table is empty
    const productResult = await db.get('SELECT COUNT(*) as count FROM products') as { count: number };
    if ((productResult?.count || 0) === 0) {
      for (const product of PRODUCTS) {
        await productService.createProduct(product);
      }
    }

    // 2. Check if jobs table is empty
    const jobResult = await db.get('SELECT COUNT(*) as count FROM jobs') as { count: number };
    if ((jobResult?.count || 0) === 0) {
      // Mock some initial jobs
      const initialJobs = [
        {
          title: 'Analista Financeiro',
          area: 'admin',
          location: 'Vitória da Conquista/BA',
          type: 'Presencial',
          description: 'Responsável por análise de fluxo de caixa e relatórios gerenciais.',
          requirements: ['Superior completo em Contabilidade ou Economia', 'Excel Avançado'],
          benefits: ['Vale Refeição', 'Plano de Saúde'],
          isActive: true
        },
        {
          title: 'Auxiliar de Padaria',
          area: 'production',
          location: 'Vitória da Conquista/BA',
          type: 'Presencial',
          description: 'Auxiliar na produção de pães e massas.',
          requirements: ['Ensino fundamental completo', 'Disponibilidade de horário'],
          benefits: ['Vale Transporte'],
          isActive: true
        }
      ];
      
      for (const job of initialJobs) {
        await jobService.createJob(job as any);
      }
    }

    // 3. Check if users table is empty
    const usersResult = await db.get('SELECT COUNT(*) as count FROM users') as { count: number };
    if ((usersResult?.count || 0) === 0) {
      const initialUsers = [
        { id: '1', username: 'vellum', password: 'Bibi2411*', name: 'Admin Vellum', role: 'ADMIN' },
        { id: '2', username: 'rh', password: 'rh', name: 'Recursos Humanos', role: 'HR' },
        { id: '3', username: 'marketing', password: 'marketing', name: 'Marketing Team', role: 'MARKETING' },
      ];

      for (const user of initialUsers) {
        await db.run(`
          INSERT INTO users (id, username, password, name, role, is_active)
          VALUES (?, ?, ?, ?, ?, 1)
        `, [user.id, user.username, user.password, user.name, user.role]);
      }
    }

    return NextResponse.json({ 
      message: 'Seed concluído com sucesso!', 
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ 
      error: 'Erro ao popular banco.', 
      details: error.message,
      hint: 'Verifique se as tabelas foram criadas via .sql ou se a conexão com o banco está correta.' 
    }, { status: 500 });
  }
}
