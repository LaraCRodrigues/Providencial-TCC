import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 // Certifique-se de importar seu CSS para estilização

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
function ProdutosRelacionados() {
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
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao"><i className="bi bi-box"></i> Produtos relacionados</h2>
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
    </section>
  );
}

export default ProdutosRelacionados;
