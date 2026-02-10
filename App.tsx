
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Boletos from './pages/Boletos';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-blue-900 font-bold text-lg leading-tight uppercase tracking-tight">Presbiteriana</span>
                <span className="text-blue-700 font-medium text-sm leading-tight uppercase">Shalon</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${isHome ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}
            >
              Início
            </Link>
            <Link 
              to="/boletos" 
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Consultar Boletos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Presbiteriana Shalon</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Educação cristã de excelência, formando cidadãos preparados para o futuro com base em valores eternos.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Links Úteis</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Sobre a Escola</Link></li>
            <li><Link to="/boletos" className="hover:text-white transition-colors">Portal de Boletos</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Calendário Escolar</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Secretaria Online</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Av. Principal, 123 - Centro</li>
            <li>Telefone: (00) 1234-5678</li>
            <li>Email: contato@shalon.edu.br</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Escola Presbiteriana Shalon. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boletos" element={<Boletos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
