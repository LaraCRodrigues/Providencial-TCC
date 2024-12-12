import './cssComponentes/navbarpagamento.css';
import React, { useState, useEffect } from "react";

const PagamentoBloco = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Recupera os produtos do localStorage
    const produtosNoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    setProdutos(produtosNoCarrinho);
  }, []);

  return (
    <section>
      <div className="container-pagamento">
        {/* Card Endereço, Nome e Telefone */}
        <div className="card-pagamento1">
          <div>
            <h3>Endereço da entrega:</h3>
            <h5 id="endereco-geral-da-entrega">
              Rua a <span id="divisao">,</span>
            </h5>
          </div>
          <div className="alinhamento">
            <h3>Nome do Usuário:</h3>
            <h5 id="nome-usuario">Alberto</h5>
          </div>
          <div className="alinhamento">
            <h3>Telefone:</h3>
            <h5 id="telefone">(00)-71993998237</h5>
          </div>
        </div>
      </div>

      {/* Card Informações do Produto */}
      <div className="container-pagamento">
        <div className="card-pagamento2">
          {produtos.map((produto, index) => (
            <div id="produto-adicionado" key={index}>
              <input
                className="imagem-produto-pag"
                type="image"
                src={produto.imagem}
                alt={`Imagem de ${produto.nome}`}
              />
              <div className="informacoes">
                <div>
                  <h4>Produto</h4>
                  <p id="nome-produto">{produto.nome}</p>
                  <p id="descricao">{produto.descricao || "Sem descrição disponível"}</p>
                </div>
                <div>
                  <h4>Quantidade</h4>
                  <p id="quantidade">{produto.quantidade || 1}</p>
                </div>
                <div>
                  <h4>Preço</h4>
                  <p id="preco-produto">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Método de Pagamento e Total */}
      <div className="container-pagamento">
        <div className="card-pagamento3">
          <div id="produto-adicionado">
            <h4>Método de Pagamento</h4>
            <select id="metodo-pagamento">
              <option value="cartao-credito">Cartão de Crédito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">PIX</option>
              <option value="transferencia">Transferência Bancária</option>
            </select>
          </div>
          <div className="total">
            <h4>Total a pagar</h4>
            <p id="total-compra">
              R${" "}
              {produtos
                .reduce((total, produto) => total + produto.preco * (produto.quantidade || 1), 0)
                .toFixed(2)}
            </p>
          </div>
          <div>
            <span>
              <i className="bi bi-truck"></i> Frete
            </span>
            <p>R$ 00,00</p>
          </div>
          <button className="btn-comprar">Comprar</button>
        </div>
      </div>
    </section>
  );
};

export default PagamentoBloco;
