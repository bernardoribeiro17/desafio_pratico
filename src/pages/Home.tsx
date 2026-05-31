import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 text-primary fw-bold">Lançamento Oficial</h1>
      <p className="lead mt-3">
        Conheça o nosso novo produto inovador, desenvolvido para oferecer
        tecnologia, qualidade e desempenho incomparáveis.
      </p>

      <a href="/produtos" className="btn btn-primary btn-lg mt-3">
        Ver Produtos
      </a>
      
      <div className="container mt-5">
        <h2 className="text-center mb-4">O que nossos clientes dizem</h2>

        <div className="row g-4" id="lista-depoimentos">
          {/* depoimentos carregados via script */}
        </div>
      </div>
    </div>
  );
};

export default Home;
