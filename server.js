
/**
 * BACKEND - NODE.JS + EXPRESS (Versão ES Modules)
 */
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Variáveis de ambiente
const ASAAS_ACCESS_TOKEN = process.env.ASAAS_ACCESS_TOKEN;
const ASAAS_BASE_URL = process.env.ASAAS_BASE_URL || 'https://api-sandbox.asaas.com';

if (!ASAAS_ACCESS_TOKEN) {
  console.error("ERRO: ASAAS_ACCESS_TOKEN não definido no arquivo .env");
}

const asaasApi = axios.create({
  baseURL: ASAAS_BASE_URL,
  headers: {
    'access_token': ASAAS_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
});

const formatDate = (date) => date.toISOString().split('T')[0];

app.post('/api/boletos', async (req, res) => {
  try {
    const { cpf } = req.body;

    if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return res.status(400).json({ error: 'CPF inválido. Forneça apenas os 11 números.' });
    }

    // 1. Buscar Customer
    const customerSearch = await asaasApi.get(`/v3/customers?cpfCnpj=${cpf}`);
    if (customerSearch.data.totalCount === 0) {
      return res.status(404).json({ error: 'Nenhum responsável financeiro encontrado para este CPF.' });
    }

    const customer = customerSearch.data.data[0];
    const customerId = customer.id;

    // 2. Calcular intervalo de datas
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 12, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 13, 0);

    // 3. Buscar pagamentos
    const paymentsRes = await asaasApi.get('/v3/payments', {
      params: {
        customer: customerId,
        'dueDate[ge]': formatDate(startDate),
        'dueDate[le]': formatDate(endDate),
        limit: 100
      }
    });

    const allPayments = paymentsRes.data.data;

    // 4. Separar e ordenar
    const paid = allPayments
      .filter(p => ['RECEIVED', 'CONFIRMED'].includes(p.status))
      .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

    const pending = allPayments
      .filter(p => !['RECEIVED', 'CONFIRMED'].includes(p.status))
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return res.json({
      customer: {
        id: customer.id,
        name: customer.name,
        cpfCnpj: customer.cpfCnpj
      },
      pending,
      paid
    });

  } catch (error) {
    console.error('Erro Asaas:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    res.status(status).json({ error: 'Erro ao consultar boletos no Asaas.' });
  }
});

app.get('/api/ping', async (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Shalon Rodando!`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/api/boletos`);
  console.log(`🔑 Base URL: ${ASAAS_BASE_URL}\n`);
});
