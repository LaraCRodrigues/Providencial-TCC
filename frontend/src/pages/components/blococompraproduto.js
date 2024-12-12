import React, { useState } from 'react';
import './cssComponentes/paginacompraproduto.css'; // Certifique-se de ter o arquivo CSS

const ComprarProduto = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  // Função para adicionar produtos ao carrinho
  const adicionarAoCarrinho = (produto) => {
    // Verifica se o preço é um número válido
    if (isNaN(produto.preco)) {
      console.error("Preço inválido");
      return;
    }

    // Se o preço for válido, adicionar o produto ao carrinho
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = [...prevCarrinho, produto];
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); // Armazenar no localStorage
      return novoCarrinho;
    });
    setMostrarCarrinho(true); // Abre o carrinho automaticamente após adicionar
  };

  // Alternar exibição do carrinho
  const toggleCarrinho = () => {
    setMostrarCarrinho(!mostrarCarrinho);
  };

  return (
    <section id="sessao-exibicao-produto">
      <div id="container-produto-da-loja">
        {/* Lado esquerdo com imagens pequenas do produto */}
        <div id="imagens-laterais">
          <img src="Imagens/BD imagens/thumbnail1.webp" alt="Produto thumbnail 1" />
          <img src="Imagens/BD imagens/thumbnail2.webp" alt="Produto thumbnail 2" />
          <img src="Imagens/BD imagens/thumbnail3.webp" alt="Produto thumbnail 3" />
        </div>

        {/* Imagem principal do produto */}
        <img id="produto-da-loja" src="Imagens/BD imagens/elastment_transit_mockup.webp" alt="produto-da-loja" />

        {/* Bloco de informações e botões */}
        <div className="container-do-produto">
          <h3 id="nome-produto"><strong>Nova Aguarrás Mineral Eucatex 900ml</strong></h3>
          <span className="selo-produto">Compra 100% segura</span>
          <span id="preco-produto">R$ 34,09</span>
          <h4><strong>Informações do produto</strong></h4>
          <h5>Marca <a id="marca-produto" href="#">Eucatex</a></h5>
          <h5>Modelo <a id="modelo-produto" href="#">Mineral</a></h5>
          <h4 id="descricao"><strong>Descrição do produto</strong></h4>
          <h6>Embalagem: <br /> Detalhes do produto aqui...</h6>

          <div className="botoes">
            <button
              id="btn-sacola"
              onClick={() =>
                adicionarAoCarrinho({
                  id: 1,
                  nome: "Nova Aguarrás Mineral Eucatex 900ml",
                  imagem: "Imagens/BD imagens/elastment_transit_mockup.webp",
                  preco: 34.09,
                  quantidade: 1 // Certifique-se de definir a quantidade
                })
              }
            >
              <i className="bi bi-handbag"></i> Adicionar ao Carrinho
            </button>
            <button id="btn-comprar"><a href="/pagamento">Comprar</a></button>
            <button id="btn-frete" onClick={toggleModal}>
              <i className="bi bi-truck"></i> Calcular Frete por região
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar do Carrinho */}
      {mostrarCarrinho && (
        <div className="sidebar-carrinho show">
          <button id="botaoFecharSidebar" onClick={toggleCarrinho}>
            <i className="bi bi-x"></i>
          </button>
          <h2>Carrinho de Compras</h2>
          <ul id="itensCarrinho">
            {carrinho.length > 0 ? (
              carrinho.map((produto) => (
                <li key={produto.id} className="item-carrinho">
                  <img src={produto.imagem} alt={produto.nome} className="imagem-produto" />
                  <div className="detalhes-produto">
                    <p>{produto.nome}</p>
                    <p>R$ {produto.preco.toFixed(2)}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>Seu carrinho está vazio.</p>
            )}
          </ul>
          <div className="subtotal">
            <p>
              Subtotal:{" "}
              <span id="subtotalValor">
                R$ {carrinho.reduce((total, produto) => total + produto.preco, 0).toFixed(2)}
              </span>
            </p>
          </div>
          <button id="finalizarCompra">
            <a href="/pagamento">
              Finalizar Compra
            </a>
          </button>
        </div>
      )}

      {/* Modal de cálculo de frete */}
      {isModalOpen && (
        <div id="modal-calcular-frete" className="modal">
          <div className="modal-content">
            <span id="fechar-modal-calcular-frete" className="close" onClick={toggleModal}>
              &times;
            </span>
            <h3>Simular frete do produto:</h3>
            <form id="form-calc-frete">
              <label htmlFor="cep">CEP:</label>
              <input type="text" id="cep" placeholder="00000-000" required />
              <button type="button" id="btn-confirmar-frete">Calcular Frete</button>
            </form>
            <div id="resultado-frete"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ComprarProduto;
