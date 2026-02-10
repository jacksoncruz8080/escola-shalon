
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/id/1/1600/900" 
            alt="Fundo decorativo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Educando para a <span className="text-blue-300">Vida</span> e para a <span className="text-yellow-400">Eternidade</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed font-light">
              Na Escola Presbiteriana Shalon, unimos a tradição de ensino de alta qualidade com os valores fundamentais da fé cristã, preparando seu filho para os desafios do futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/boletos" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 text-center px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Consultar Boletos
              </Link>
              <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white text-center px-8 py-4 rounded-full font-bold text-lg transition-all">
                Conheça Nossa Escola
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossos Diferenciais</h2>
            <div className="w-20 h-1 bg-blue-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ensino Presbiteriano</h3>
              <p className="text-slate-600 leading-relaxed">Currículo sólido fundamentado em uma cosmovisão bíblica, integrando fé e saber.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Segurança e Ética</h3>
              <p className="text-slate-600 leading-relaxed">Ambiente acolhedor e seguro, onde o caráter é tão importante quanto o desempenho acadêmico.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tecnologia no Ensino</h3>
              <p className="text-slate-600 leading-relaxed">Laboratórios modernos e ferramentas digitais que potencializam o aprendizado dinâmico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img 
                src="https://picsum.photos/id/2/800/600" 
                alt="Alunos na sala de aula" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Sobre a Presbiteriana Shalon</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Fundada sob os princípios da Igreja Presbiteriana, nossa instituição tem o compromisso de oferecer uma educação integral. Valorizamos a curiosidade intelectual aliada ao desenvolvimento espiritual.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                Nossa equipe de professores altamente qualificados trabalha não apenas o conteúdo acadêmico, mas também as competências socioemocionais necessárias para o mundo contemporâneo.
              </p>
              <button className="text-blue-700 font-bold flex items-center gap-2 group">
                Ler mais sobre nossa história
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para dar o próximo passo?</h2>
          <p className="text-xl mb-10 opacity-90">Junte-se à nossa comunidade escolar e proporcione o melhor ensino para o seu filho.</p>
          <div className="flex justify-center gap-4">
             <Link to="/boletos" className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Acesse o Financeiro
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
