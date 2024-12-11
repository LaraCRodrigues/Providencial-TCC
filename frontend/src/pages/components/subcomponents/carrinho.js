import React from "react";
import { Link } from "react-router-dom";
import '../cssComponentes/carrinho.css';
const Carrinho = ({ showSidebar, toggleSidebar }) => {
  return (
    showSidebar && (
      <div
        className={`sidebar-carrinho ${showSidebar ? "show" : ""}`}
        id="carrinhoSidebar"
      >        <button id="botaoFecharSidebar" onClick={toggleSidebar} title="Fechar">
          <i className="bi bi-x"></i>
        </button>
        <h2>Carrinho de Compras</h2>
        <ul id="itensCarrinho">
          {/* Os itens do carrinho serão adicionados aqui dinamicamente */}
        </ul>
        <div className="subtotal">
          <p>
            Subtotal: <span id="subtotalValor">R$ 0,00</span>
          </p>
        </div>
        <button id="finalizarCompra">
          <Link to="/pagamento">Finalizar Compra</Link>
        </button>
      </div>
    )
  );
};

export default Carrinho;
