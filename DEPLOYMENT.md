# Guia de Migração AMAM Alimentos para HostGator

Este guia detalha como levar o site do seu ambiente local para a hospedagem da HostGator (cPanel).

## 1. Banco de Dados (MySQL)
Como o site local usa SQLite e a HostGator usa MySQL, preparei uma migração:

1. Acesse o **cPanel** da sua HostGator.
2. Crie um novo banco de dados chamado `amam_db` (ou o nome que preferir).
3. Crie um usuário para este banco e dê todas as permissões.
4. Abra o **phpMyAdmin**.
5. Selecione o banco `amam_db` e clique em **Importar**.
6. Escolha o arquivo `amam_migration.sql` que gerei na raiz do seu projeto local e execute.

## 2. Preparação do Site (Next.js)
No seu computador local:
1. No terminal, execute: `npm run build`
2. Isso gerará a pasta `.next` com o site otimizado.

## 3. Upload dos Arquivos
Via Gerenciador de Arquivos do cPanel ou FTP:
1. Envie todos os arquivos do projeto (EXCETO `node_modules`, `.git` e `.next/cache`).
2. **Importante:** Certifique-se de que os arquivos `.next`, `public`, `package.json`, `next.config.ts`, etc. foram enviados.

## 4. Configuração no cPanel (Node.js App)
1. No cPanel, procure por **"Setup Node.js App"**.
2. Clique em **Create Application**.
3. **Application root**: O diretório onde você colocou os arquivos (ex: `public_html/amam`).
4. **Application URL**: O seu domínio.
5. **Application startup file**: Coloque `node_modules/next/dist/bin/next` e mude para `start` ou crie um arquivo `server.js` na raiz (se preferir controle customizado).
    *   *Dica:* Frequentemente na HostGator é mais simples configurar um script no `package.json` para o `next start`.
6. Adicione as seguintes **Environment Variables** na interface do cPanel:
    - `NODE_ENV`: `production`
    - `DB_HOST`: `localhost` (geralmente é localhost na HostGator)
    - `DB_USER`: (o usuário do banco que você criou)
    - `DB_PASSWORD`: (a senha do banco)
    - `DB_NAME`: `hg54b821_amam_db`
    - `SMTP_HOST`: `mail.amamalimentos.com.br`
    - `SMTP_PORT`: `465`
    - `SMTP_USER`: `forms-site@amamalimentos.com.br`
    - `SMTP_PASS`: `x0m-pX-b$dJK`
    - `NEXT_PUBLIC_RECIPIENT_EMAIL`: `vendas@amamalimentos.com.br`

## 5. Finalização
Depois de configurar tudo, clique em **Run JS Install** (se disponível) ou apenas reinicie a aplicação no botão **Restart**.

---
**Dúvidas?** Estou à disposição para ajudar em qualquer etapa do processo.
