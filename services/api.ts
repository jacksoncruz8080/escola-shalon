
import { BoletosResponse } from '../types';

export async function fetchBoletos(cpf: string): Promise<BoletosResponse> {
  const cleanCpf = cpf.replace(/\D/g, '');
  
  // Chamada real para o seu servidor Node.js local
  try {
    const response = await fetch('http://localhost:3001/api/boletos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ cpf: cleanCpf })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao buscar boletos');
    }

    return await response.json();
  } catch (err: any) {
    // Se o servidor local não estiver rodando, você pode querer manter o mock para testes
    // Mas aqui lançamos o erro real para o usuário saber que precisa ligar o backend
    console.error("Erro na requisição:", err);
    throw err;
  }
}
