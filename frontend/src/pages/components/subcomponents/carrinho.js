import React from "react";
import { useNavigate } from "react-router-dom";
import '../cssComponentes/carrinho.css';

const Carrinho = ({ showSidebar, toggleSidebar }) => {
  const navigate = useNavigate();

  const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (produtos.length === 0) {
    return <div>O carrinho está vazio.</div>;
  }

  // Função para finalizar a compra
  const handleFinalizarCompra = () => {
    navigate("/pagamento");
  };

  const subtotal = produtos.reduce((acc, produto) => {
    const preco = parseFloat(produto.preco);
    const quantidade = produto.quantidade ? parseInt(produto.quantidade) : 1;

    if (isNaN(preco) || isNaN(quantidade)) return acc;

    return acc + preco * quantidade;
  }, 0).toFixed(2);

  return (
    showSidebar && (
      <div className={`sidebar-carrinho ${showSidebar ? "show" : ""}`} id="carrinhoSidebar">
        <button id="botaoFecharSidebar" className="btn-fechar-carrinho" onClick={toggleSidebar} title="Fechar">
          <i className="bi bi-x"></i>
        </button>
        <h2>Carrinho de Compras</h2>
        <ul id="itensCarrinho">
          {produtos.map((produto, index) => (
            <li key={index} className="item-carrinho">
              
              <div className="detalhes-produto">
                <p>{produto.nome}</p>
                <img
                src={produto.imagem}
                alt={`Imagem de ${produto.nome}`}
                className="imagem-produto-carrinho"
              />
                <p>Quantidade: {produto.quantidade || 1}</p>
                <p>Preço: R$ {parseFloat(produto.preco).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="subtotal">
          <p>Subtotal: <span id="subtotalValor">R$ {subtotal}</span></p>
        </div>
        <button id="finalizarCompra" onClick={handleFinalizarCompra}>
        <i class="bi bi-cart4"></i>   Finalizar Compra
        </button>
      </div>
    )
  );
};

export default Carrinho;
