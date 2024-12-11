import React, { useState } from "react";
import Acessibilidade from "./subcomponents/Acessibilidade"; // Certifique-se de ajustar o caminho do componente

const NavbarPagamento = () => {
  const [showacessibilidade, setShowacessibilidade] = useState(false);

  const toggleBalao = () => {
    setShowacessibilidade(!showacessibilidade);
  };

  return (
    <header>
      <nav id="navbar-pagamento">
        <div className="container-2navbar">
          <a href="PgPrincipal.html">
            <img
              src="Imagens/Logos Providencial/Providencial logo 2.png"
              alt="logo-da-empresa"
            />
          </a>
          <h4>Aba de pagamento</h4>
          <button id="btn-acessibilidade" onClick={toggleBalao}>
            <i className="bi bi-universal-access-circle"></i>
          </button>
          <Acessibilidade
            showacessibilidade={showacessibilidade}
            setShowacessibilidade={setShowacessibilidade}
          />
          <a href="PgPrincipal.html" className="link-sair">
            <i className="bi bi-box-arrow-left"></i> Sair
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavbarPagamento;
