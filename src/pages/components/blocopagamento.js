import React from "react";
const PagamentoBloco = () => {
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

        {/* Card Informações do Produto */}
        <div className="card-pagamento2">
          <div id="produto-adicionado">
            <input
              className="imagem-produto-pag"
              type="image"
              src="Imagens/produto.jpg"
              alt="Imagem do Produto"
            />
            <div className="informacoes">
              <div>
                <h4>Produto</h4>
                <p id="nome-produto">Cimento</p>
                <p id="descricao">Descrição breve do produto.</p>
              </div>
              <div>
                <h4>Quantidade</h4>
                <p id="quantidade">0</p>
              </div>
              <div>
                <h4>Preço</h4>
                <p id="preco-produto">Preço: R$ 00,00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Método de Pagamento e Total */}
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
            <p id="total-compra">R$ 00,00</p>
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
