import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Contato from './pages/Contato';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TechStore
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/produtos">
                Produtos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contato">
                Contato
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center">
              <button
                id="theme-light-button"
                type="button"
                className="btn btn-sm btn-theme-light ms-3"
              >
                Claro
              </button>
              <button
                id="theme-dark-button"
                type="button"
                className="btn btn-sm btn-theme-dark ms-2"
              >
                Escuro
              </button>
              <button
                id="theme-switcher"
                type="button"
                className="btn btn-sm btn-theme-toggle ms-2"
              >
                🎨 Tema: Azul/Laranja
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/produtos">
                Carrinho 🛒
                <span className="badge bg-danger" id="contador-carrinho">0</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
