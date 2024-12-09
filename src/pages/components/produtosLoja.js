import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cssComponentes/produtosLoja.css'; // Certifique-se de importar seu CSS para estilização

const ProdutoCard = ({ imagem, marca, nome, preco, parcelas, link }) => (
  <div className="card">
    <img src={imagem} alt={nome} className="produto-img" />
    <div className="separar-elementos">
      <h3 className="marca"><a href="#">{marca}</a></h3>
      <p><strong>{nome}</strong></p>
      <span className="preco">{preco}</span>
      <p className="parcelas">{parcelas}</p>
      <button className="btn-conferir">
        <Link to={link}>Conferir</Link>
      </button>
    </div>
  </div>
);

// Função principal do componente
function Produtos() {
  const [lojaIndex, setLojaIndex] = useState(0);
  const [ferramentasIndex, setFerramentasIndex] = useState(0);
  const [pinturasIndex, setPinturasIndex] = useState(0);
  const [materiaisIndex, setMateriaisIndex] = useState(0);

  // Funções de controle dos slides
  const slidePrev = (setIndex, index, length) => {
    setIndex(index === 0 ? length - 1 : index - 1);
  };

  const slideNext = (setIndex, index, length) => {
    setIndex(index === length - 1 ? 0 : index + 1);
  };

  const produtos = [
    {
      id: 1,
      nome: 'Cimento Elástico Impermeabilizante Caixa D\'Água 4Kg',
      preco: 'R$200,90',
      marca: 'Elastment',
      imagem: 'Imagens/BD imagens/elastment_transit_mockup.webp',
      link: '/comprar',
    },
    {
      id: 2,
      nome: 'Tinta Branca Premium 18L',
      preco: 'R$350,00',
      marca: 'Supertintas',
      imagem: 'Imagens/BD imagens/tinta_branca.webp',
      link: '/comprar',
    },
    // Adicione mais produtos conforme necessário
  ];

  return (
    <section className="produtos-sessao">
      {/* Loja */}
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao"><i className="bi bi-box"></i> Loja</h2>
      </div>
      <div className="produto-carrossel">
        <div className="carrossel-wrapper">
          <button
            className="btn-antes-carrosel-produto"
            onClick={() => slidePrev(setLojaIndex, lojaIndex, produtos.length)}
          >
            &#10094;
          </button>
          <div className="produto-container">
            {/* Exibe o produto atual com base no índice */}
            <ProdutoCard
              imagem={produtos[lojaIndex].imagem}
              marca={produtos[lojaIndex].marca}
              nome={produtos[lojaIndex].nome}
              preco={produtos[lojaIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[lojaIndex].link}
            />
             <ProdutoCard
              imagem={produtos[lojaIndex].imagem}
              marca={produtos[lojaIndex].marca}
              nome={produtos[lojaIndex].nome}
              preco={produtos[lojaIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[lojaIndex].link}
            />
             <ProdutoCard
              imagem={produtos[lojaIndex].imagem}
              marca={produtos[lojaIndex].marca}
              nome={produtos[lojaIndex].nome}
              preco={produtos[lojaIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[lojaIndex].link}
            />
             <ProdutoCard
              imagem={produtos[lojaIndex].imagem}
              marca={produtos[lojaIndex].marca}
              nome={produtos[lojaIndex].nome}
              preco={produtos[lojaIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[lojaIndex].link}
            />
          </div>
          <button
            className="btn-proximo-carrosel-produto"
            onClick={() => slideNext(setLojaIndex, lojaIndex, produtos.length)}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Ferramentas */}
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao"><i className="bi bi-gear-wide"></i> Ferramentas</h2>
      </div>
      <div className="produto-carrossel">
        <div className="carrossel-wrapper">
          <button
            className="btn-antes-carrosel-produto"
            onClick={() => slidePrev(setFerramentasIndex, ferramentasIndex, produtos.length)}
          >
            &#10094;
          </button>
          <div className="produto-container">
            {/* Exibe o produto atual com base no índice */}
            <ProdutoCard
              imagem={produtos[ferramentasIndex].imagem}
              marca={produtos[ferramentasIndex].marca}
              nome={produtos[ferramentasIndex].nome}
              preco={produtos[ferramentasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[ferramentasIndex].link}
            />
              <ProdutoCard
              imagem={produtos[ferramentasIndex].imagem}
              marca={produtos[ferramentasIndex].marca}
              nome={produtos[ferramentasIndex].nome}
              preco={produtos[ferramentasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[ferramentasIndex].link}
            />
              <ProdutoCard
              imagem={produtos[ferramentasIndex].imagem}
              marca={produtos[ferramentasIndex].marca}
              nome={produtos[ferramentasIndex].nome}
              preco={produtos[ferramentasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[ferramentasIndex].link}
            />
              <ProdutoCard
              imagem={produtos[ferramentasIndex].imagem}
              marca={produtos[ferramentasIndex].marca}
              nome={produtos[ferramentasIndex].nome}
              preco={produtos[ferramentasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[ferramentasIndex].link}
            />
          </div>
          <button
            className="btn-proximo-carrosel-produto"
            onClick={() => slideNext(setFerramentasIndex, ferramentasIndex, produtos.length)}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Pintura */}
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao"><i className="bi bi-palette"></i> Pintura</h2>
      </div>
      <div className="produto-carrossel">
        <div className="carrossel-wrapper">
          <button
            className="btn-antes-carrosel-produto"
            onClick={() => slidePrev(setPinturasIndex, pinturasIndex, produtos.length)}
          >
            &#10094;
          </button>
          <div className="produto-container">
            {/* Exibe o produto atual com base no índice */}
            <ProdutoCard
              imagem={produtos[pinturasIndex].imagem}
              marca={produtos[pinturasIndex].marca}
              nome={produtos[pinturasIndex].nome}
              preco={produtos[pinturasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[pinturasIndex].link}
            />
              {/* Exibe o produto atual com base no índice */}
              <ProdutoCard
              imagem={produtos[pinturasIndex].imagem}
              marca={produtos[pinturasIndex].marca}
              nome={produtos[pinturasIndex].nome}
              preco={produtos[pinturasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[pinturasIndex].link}
            />
              {/* Exibe o produto atual com base no índice */}
              <ProdutoCard
              imagem={produtos[pinturasIndex].imagem}
              marca={produtos[pinturasIndex].marca}
              nome={produtos[pinturasIndex].nome}
              preco={produtos[pinturasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[pinturasIndex].link}
            />
              {/* Exibe o produto atual com base no índice */}
              <ProdutoCard
              imagem={produtos[pinturasIndex].imagem}
              marca={produtos[pinturasIndex].marca}
              nome={produtos[pinturasIndex].nome}
              preco={produtos[pinturasIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[pinturasIndex].link}
            />
          </div>
          <button
            className="btn-proximo-carrosel-produto"
            onClick={() => slideNext(setPinturasIndex, pinturasIndex, produtos.length)}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Materiais */}
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao"><i className="bi bi-archive"></i> Materiais</h2>
      </div>
      <div className="produto-carrossel">
        <div className="carrossel-wrapper">
          <button
            className="btn-antes-carrosel-produto"
            onClick={() => slidePrev(setMateriaisIndex, materiaisIndex, produtos.length)}
          >
            &#10094;
          </button>
          <div className="produto-container">
            {/* Exibe o produto atual com base no índice */}
            <ProdutoCard
              imagem={produtos[materiaisIndex].imagem}
              marca={produtos[materiaisIndex].marca}
              nome={produtos[materiaisIndex].nome}
              preco={produtos[materiaisIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[materiaisIndex].link}
            />
               <ProdutoCard
              imagem={produtos[materiaisIndex].imagem}
              marca={produtos[materiaisIndex].marca}
              nome={produtos[materiaisIndex].nome}
              preco={produtos[materiaisIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[materiaisIndex].link}
            />
               <ProdutoCard
              imagem={produtos[materiaisIndex].imagem}
              marca={produtos[materiaisIndex].marca}
              nome={produtos[materiaisIndex].nome}
              preco={produtos[materiaisIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[materiaisIndex].link}
            />
               <ProdutoCard
              imagem={produtos[materiaisIndex].imagem}
              marca={produtos[materiaisIndex].marca}
              nome={produtos[materiaisIndex].nome}
              preco={produtos[materiaisIndex].preco}
              parcelas="em 2x sem Juros"
              link={produtos[materiaisIndex].link}
            />
          </div>
          <button
            className="btn-proximo-carrosel-produto"
            onClick={() => slideNext(setMateriaisIndex, materiaisIndex, produtos.length)}
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}

export default Produtos;
