import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import './cssComponentes/navbarpagamento.css';

const PagamentoBloco = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const produtosNoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    setProdutos(produtosNoCarrinho);
  }, []);

  const calcularTotal = () => {
    return produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0).toFixed(2);
  };

  const handleComprar = () => {
    navigate("/processarPagamento", { state: { produtos } }); 
  };

  return (
    <section>
      <div className="container-pagamento">
        <div className="card-pagamento1">
          <div>
            <h3>Endereço da entrega:</h3>
            <h5 id="endereco-geral-da-entrega"> Rua a <span id="divisao">,</span> </h5>
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

        {/* Card Informações do Produto */}
        <div className="card-pagamento2">
          {produtos.map((produto, index) => (
            <div id="produto-adicionado" key={index}>
              <input
                className="imagem-produto-pag"
                type="image"
                src={produto.img}
                alt={`Imagem de ${produto.nome}`}
              />
              <div className="informacoes">
                <div>
                  <h4>Produto</h4>
                  <p id="nome-produto-pagamento">{produto.nome}</p>
                  <p id="descricao-pagamento">{produto.descricao || "Sem descrição disponível"}</p>
                </div>
                <div>
                  <h4>Quantidade</h4>
                  <p id="quantidade">{produto.quantidade || 1}</p>
                </div>
                <div>
                  <h4>Preço</h4>
                  <p id="preco-produto-pagamento">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card Método de Pagamento e Total */}
        <div className="card-pagamento3">
          <div id="container-metodos">
            <h4>Método de Pagamento</h4>
            <select id="metodo-pagamento">
              <option value="cartao-credito">Cartão de Crédito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">PIX</option>
              <option value="transferencia">Transferência Bancária</option>
            </select>
          </div>
          <div className="total">
            <span><i class="bi bi-coin"></i> Total a pagar</span>
            <p id="total-pagamento">R$ {calcularTotal()}</p>
          </div>
          <div>
            <span>
              <i className="bi bi-truck"></i> Frete
            </span>
            <p>R$ 00,00</p>
          </div>
          <button className="btn-comprar" onClick={handleComprar}>Comprar</button> 
        </div>
      </div>
    </section>
  );
};

export default PagamentoBloco;
