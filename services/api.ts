import { BoletosResponse } from '../types';

const API_URL = (import.meta as any).env.VITE_API_URL || '';

export async function fetchBoletos(cpf: string): Promise<BoletosResponse> {
  const cleanCpf = cpf.replace(/\D/g, '');

  const response = await fetch(`${API_URL}/api/boletos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cpf: cleanCpf })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao buscar boletos');
  }

  return await response.json();
}
