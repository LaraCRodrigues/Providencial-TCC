import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation
import './cssComponentes/paginacompraproduto.css'; // Certifique-se de ter o arquivo CSS

const ComprarProduto = () => {
  const location = useLocation(); // Usar useLocation para acessar o estado
  const { produto } = location.state || {}; // Desestruturar o produto do estado

  // Estado para controlar a visibilidade do modal de frete
  const [isModalOpen, setModalOpen] = useState(false);
  
  // Função para abrir e fechar o modal
  const toggleModal = () => setModalOpen(!isModalOpen);

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
        <img id="produto-da-loja" src={produto?.img} alt={produto?.nome} />

        {/* Bloco de informações e botões juntos */}
        <div className="container-do-produto">
          <h3 id="nome-produto"><strong>{produto?.nome}</strong></h3>
          <span className="selo-produto">Compra 100% segura</span>
          <span id="preco-produto">{produto?.preco} <sup>{produto?.precoCentavos}</sup></span>
          <h4><strong>Informações do produto</strong></h4>
          <h5>Marca <a id="marca-produto" href="#">{produto?.marca}</a></h5>
          <h5>Modelo <a id="modelo-produto" href="#">Modelo Desconhecido</a></h5> {/* Você pode adicionar um campo de modelo no objeto produto */}
          <h4 id="descricao"><strong>Descrição do produto</strong></h4>
          <h6>Embalagem: <br /> Detalhes do produto aqui...</h6>

          {/* Botões movidos para dentro do container do produto */}
          <div className="botoes">
            <button id="btn-sacola"><i className="bi bi-handbag"></i></button>
            <button id="btn-comprar"><a href="/pagamento">Comprar</a></button>
            <button id="btn-frete" onClick={toggleModal}><i className="bi bi-truck"></i> Calcular Frete por região</button>
          </div>
        </div>
      </div>

      {/* Modal de cálculo de frete */}
      {isModalOpen && (
        <div id="modal-calcular-frete" className="modal">
          <div className="modal-content">
            <span id="fechar-modal-calcular-frete" className="close" onClick={toggleModal}>&times;</span>
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