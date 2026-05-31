import React from 'react';

const sampleProducts = [
  {
    id: 1,
    nome: 'Smartphone XPro',
    descricao: 'Tela AMOLED 6.5", 128GB, câmera 50MP.',
    preco: 2500,
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
  },
  {
    id: 2,
    nome: 'Notebook UltraTech',
    descricao: 'i7, 16GB RAM, SSD 512GB.',
    preco: 4500,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
  },
  {
    id: 3,
    nome: 'Fone Bluetooth Pro',
    descricao: 'Cancelamento de ruído ativo, bateria 30h.',
    preco: 350,
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600',
  },
];

const Produtos: React.FC = () => {
  return (
    <div>
      <h2 className="text-center mb-4">Nossos Produtos</h2>

      <div className="row g-4">
        {sampleProducts.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card h-100 shadow">
              <img src={p.img} className="card-img-top img-produto" />

              <div className="card-body">
                <h5>{p.nome}</h5>

                <p>{p.descricao}</p>

                <p className="fw-bold text-success">R$ {p.preco.toLocaleString('pt-BR')}</p>

                <label className="form-label">Quantidade</label>

                <input type="number" className="form-control qtd-produto" defaultValue={1} min={1} />

                <button
                  className="btn btn-success mt-3 w-100 btn-comprar"
                  data-nome={p.nome}
                  data-preco={String(p.preco)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carrinho */}
      <div className="container mt-5" id="carrinho">
        <h3 className="mb-4">Carrinho de Compras</h3>

        <ul className="list-group shadow-sm mb-3" id="lista-carrinho"></ul>

        <div className="alert alert-info d-flex align-items-center">
          <h5 className="m-0">Total: R$ <span id="total-carrinho">0,00</span></h5>

          <div className="ms-auto">
            <button id="btn-finalizar" className="btn btn-success btn-sm me-2">Finalizar Compra</button>

            <button id="btn-limpar" className="btn btn-danger btn-sm">Limpar Carrinho</button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div id="toastCarrinho" className="toast align-items-center text-bg-success border-0">
          <div className="d-flex">
            <div className="toast-body">Produto adicionado ao carrinho 🛒</div>

            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
