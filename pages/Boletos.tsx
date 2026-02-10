
import React, { useState } from 'react';
import { fetchBoletos } from '../services/api';
import { BoletosResponse, Payment } from '../types';

const Boletos: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BoletosResponse | null>(null);

  const formatCpf = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCpf(e.target.value));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCpf = cpf.replace(/\D/g, '');
    
    if (cleanCpf.length !== 11) {
      setError('Por favor, informe um CPF válido com 11 dígitos.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchBoletos(cleanCpf);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao consultar os boletos. Verifique o CPF e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const PaymentCard: React.FC<{ payment: Payment; type: 'pending' | 'paid' }> = ({ payment, type }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-800 text-lg">{payment.description}</h4>
            {type === 'pending' ? (
               <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700">A Pagar</span>
            ) : (
               <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Pago</span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Vencimento: <strong className="text-slate-700">{formatDate(payment.dueDate)}</strong>
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Valor: <strong className="text-slate-700">{formatCurrency(payment.value)}</strong>
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <a 
            href={payment.invoiceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${
              type === 'pending' 
              ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-sm' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {type === 'pending' ? 'Pagar / Ver Boleto' : 'Ver Comprovante'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Content */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Portal de Pagamentos</h1>
          <p className="text-slate-600">Acesse suas mensalidades e taxas escolares de forma rápida e segura.</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-slate-100">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Informe o CPF do Responsável Financeiro</label>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                maxLength={14}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
                loading 
                ? 'bg-slate-300 cursor-not-allowed text-white' 
                : 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-500/20'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Consultando...
                </span>
              ) : 'Consultar Boletos'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-start gap-3 text-sm animate-pulse">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results */}
        {data && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-900 rounded-2xl p-6 text-white mb-8 shadow-lg">
              <p className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-1">Responsável Localizado</p>
              <h2 className="text-2xl font-bold">{data.customer.name}</h2>
              <p className="text-blue-300 text-sm mt-1">CPF: {cpf}</p>
            </div>

            {/* Pending Section */}
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-6">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </span>
                Faturas em Aberto / Futuras
                <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-full">{data.pending.length}</span>
              </h3>
              
              {data.pending.length > 0 ? (
                data.pending.map(p => <PaymentCard key={p.id} payment={p} type="pending" />)
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
                  Nenhuma fatura pendente encontrada para os próximos 12 meses.
                </div>
              )}
            </div>

            {/* Paid Section */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-6">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </span>
                Histórico de Pagamentos (Últimos 12 Meses)
                <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-full">{data.paid.length}</span>
              </h3>
              
              {data.paid.length > 0 ? (
                data.paid.map(p => <PaymentCard key={p.id} payment={p} type="paid" />)
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
                  Nenhum histórico de pagamento localizado nos últimos 12 meses.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Support Footer */}
        <div className="mt-16 text-center text-slate-500 text-sm">
          <p>Dúvidas sobre seus boletos? Entre em contato com nossa secretaria financeira.</p>
          <p className="font-bold text-blue-700 mt-1">(00) 1234-5678 • financeiro@shalon.edu.br</p>
        </div>
      </div>
    </div>
  );
};

export default Boletos;
