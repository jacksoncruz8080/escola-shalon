
# Escola Presbiteriana Shalon - Portal Financeiro

Este projeto consiste em um frontend moderno em React e um backend Node.js para consulta de faturas integradas ao Asaas.

## Estrutura do Projeto

- **Frontend**: Single Page Application construída com React 18, Tailwind CSS e Lucide Icons.
- **Backend**: API REST em Node.js com Express para comunicação segura com o Asaas.

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou no ambiente do servidor) com as seguintes chaves:

```env
ASAAS_ACCESS_TOKEN=seu_token_aqui
ASAAS_BASE_URL=https://api-sandbox.asaas.com # Mude para https://api.asaas.com em produção
PORT=3001
```

## Como Rodar

### 1. Backend (Real)
Instale as dependências e rode o servidor:
```bash
npm install express axios cors dotenv
node server.js
```

### 2. Frontend
O frontend está configurado para o ambiente de preview. Para produção, aponte a URL da API no arquivo `services/api.ts` para o endereço do seu servidor Node.js.

```bash
npm install
npm run dev
```

## Regras de Negócio Implementadas

1. **Janela de Consulta**: O sistema calcula automaticamente 12 meses retroativos e 12 meses futuros a partir da data atual.
2. **Segurança**: O `access_token` do Asaas nunca é exposto ao navegador do usuário; as chamadas são feitas exclusivamente via servidor.
3. **UX**: Máscaras de CPF, feedback de loading, estados de erro amigáveis e listagem separada por status (Pagos vs. Pendentes).

## Publicação
- O **Frontend** pode ser hospedado em serviços como Vercel, Netlify ou GitHub Pages.
- O **Backend** pode ser hospedado em VPS, Heroku, Render ou AWS Lambda.
