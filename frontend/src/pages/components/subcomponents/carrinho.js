import React from "react";
import { useNavigate } from "react-router-dom";
import '../cssComponentes/carrinho.css';

const Carrinho = ({ showSidebar, toggleSidebar }) => {
  const navigate = useNavigate();

  // Obtém os produtos do carrinho do localStorage
  const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verificar se o carrinho não está vazio e se os dados estão corretos
  if (produtos.length === 0) {
    return <div>O carrinho está vazio.</div>;
  }

  // Função para finalizar a compra
  const handleFinalizarCompra = () => {
    navigate("/pagamento");
  };

  // Calcular o subtotal
  const subtotal = produtos.reduce((acc, produto) => {
    // Certifique-se de que preco e quantidade são números
    const preco = parseFloat(produto.preco);
    const quantidade = produto.quantidade ? parseInt(produto.quantidade) : 1; // Definir quantidade como 1 se não existir

    // Se qualquer valor for NaN, retorna 0 para evitar NaN no subtotal
    if (isNaN(preco) || isNaN(quantidade)) return acc;

    return acc + preco * quantidade;
  }, 0).toFixed(2);

  return (
    showSidebar && (
      <div className={`sidebar-carrinho ${showSidebar ? "show" : ""}`} id="carrinhoSidebar">
        <button id="botaoFecharSidebar" onClick={toggleSidebar} title="Fechar">
          <i className="bi bi-x"></i>
        </button>
        <h2>Carrinho de Compras</h2>
        <ul id="itensCarrinho">
          {/* Os itens do carrinho serão adicionados aqui dinamicamente */}
          {produtos.map((produto, index) => (
            <li key={index}>
              <p>{produto.nome}</p>
              <p>Quantidade: {produto.quantidade || 1}</p>
              <p>Preço: R$ {parseFloat(produto.preco).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="subtotal">
          <p>Subtotal: <span id="subtotalValor">R$ {subtotal}</span></p>
        </div>
        <button id="finalizarCompra" onClick={handleFinalizarCompra}>
          Finalizar Compra
        </button>
      </div>
    )
  );
};

export default Carrinho;
