import React from 'react';
import './cssComponentes/produtocardspesquisa.css';
const ProdutoCard = ({ imagem, marca, nome, preco, parcelas, link }) => {
  return (
    <div className="produto-card">
      <img src={imagem} alt={nome} className="produto-imagem" />
      <div className="produto-info">
        <h3 className="produto-nome">{nome}</h3>
        <p className="produto-marca">{marca}</p>
        <p className="produto-preco">{preco}</p>
        <p className="produto-parcelas">{parcelas}</p>
        <a href={link} className="produto-link">
          Comprar
        </a>
      </div>
    </div>
  );
};

export default ProdutoCard;
