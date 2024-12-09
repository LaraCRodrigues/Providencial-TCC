import React, { useState } from 'react';
import '../cssComponentes/paginacompraproduto.css'; // Certifique-se de que os estilos estejam configurados corretamente

const ProdutosRelacionados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const produtos = [
    {
      id: 1,
      imagem: 'Imagens/BD imagens/elastment_transit_mockup.webp',
      marca: 'Elastment',
      nome: 'Cimento Elástico Impermeabilizante Caixa D\'Água 4Kg',
      preco: 'R$200,90',
      parcelas: 'em 2x sem Juros',
    },
    {
      id: 2,
      imagem: 'Imagens/BD imagens/elastment_transit_mockup.webp',
      marca: 'Elastment',
      nome: 'Cimento Elástico Impermeabilizante Caixa D\'Água 4Kg',
      preco: 'R$200,90',
      parcelas: 'em 2x sem Juros',
    },
    {
      id: 3,
      imagem: 'Imagens/BD imagens/elastment_transit_mockup.webp',
      marca: 'Elastment',
      nome: 'Cimento Elástico Impermeabilizante Caixa D\'Água 4Kg',
      preco: 'R$200,90',
      parcelas: 'em 2x sem Juros',
    },
    {
      id: 4,
      imagem: 'Imagens/BD imagens/elastment_transit_mockup.webp',
      marca: 'Elastment',
      nome: 'Cimento Elástico Impermeabilizante Caixa D\'Água 4Kg',
      preco: 'R$200,90',
      parcelas: 'em 2x sem Juros',
    },
  ];

  // Funções para navegar no carrossel
  const slidePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? produtos.length - 1 : prevIndex - 1));
  };

  const slideNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === produtos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="sessao-produtos-relacionados">
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao">
          <i className="bi bi-archive"></i> Produtos Relacionados
        </h2>
      </div>

      <div className="produto-carrossel">
        <button className="btn-antes-carrosel-produto" onClick={slidePrev}>
          &#10094;
        </button>
        <div className="produto-container" id="loja-carousel">
          <div className="container-card">
            {produtos.map((produto, index) => (
              <div
                key={produto.id}
                className={`card ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={produto.imagem} alt={`Produto ${produto.id}`} className="produto-img" />
                <div className="separar-elementos">
                  <h3 className="marca">
                    <a href="#">{produto.marca}</a>
                  </h3>
                  <p><strong>{produto.nome}</strong></p>
                  <span className="preco">{produto.preco}</span>
                  <p className="parcelas">{produto.parcelas}</p>
                  <button className="btn-conferir">
                    <a href="PgCompraProduto.html">Conferir</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-proximo-carrosel-produto" onClick={slideNext}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default ProdutosRelacionados;
