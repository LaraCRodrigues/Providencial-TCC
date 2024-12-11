import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../componentes-pg-comple/paginaCp.css';

const ProdutoCard = ({ produto }) => {
  const navigate = useNavigate(); // Usar useNavigate

  const handleConferir = () => { 
    navigate('/comprar', { state: { produto } }); // Navegar para a página de compra
  };

  return (
    <div className="container-card">
      <div className="card" id="produto1">
        <img id="img-produto" src={produto.img} alt={produto.nome} className="produto-img" />
        <div className="separar-elementos">
          <h3 className="marca"><a href="#">{produto.marca}</a></h3>
          <p id="nome-produto-cat-pintura"><strong>{produto.nome}</strong></p>
          <span className="preco" id="preco-produto">{produto.preco}<sup>{produto.precoCentavos}</sup></span>
          <p className="parcelas" id="parcelas-produto">{produto.parcelas}</p>
          <button className="btn-conferir" onClick={handleConferir}>Conferir</button>
        </div>
      </div>
    </div>
  );
};

const Pintura = () => {
  const produtos = [
    {
      img: "Imagens/BD imagens/12117.png",
      nome: "Tinta Acrílica Branca Fosca 18L",
      marca: "Suvinil",
      preco: "R$180",
      precoCentavos: "00",
      parcelas: "em até 6x sem Juros"
    },
    {
      img: "Imagens/BD imagens/12118.png",
      nome: "Rolo de Pintura 23cm",
      marca: "Atlas",
      preco: "R$25",
      precoCentavos: "50",
      parcelas: "em até 2x sem Juros"
    },
    {
      img: "Imagens/BD imagens/12119.png",
      nome: "Pincel 12mm",
      marca: "Condor",
      preco: "R$10",
      precoCentavos: "00",
      parcelas: "em até 1x sem Juros"
    },
    {
      img: "Imagens/BD imagens/12120.png", // Corrigido para um novo produto
      nome: "Massa Corrida",
      marca: "Suvinil",
      preco: "R$69",
      precoCentavos: "00",
      parcelas: "em até 1x sem Juros"
    }
  ];

  return (
    <section className="produtos-sessao">
      <div className="container-bloco-title">
        <h2 className="subtitulos-produtos-apresentacao">
          <i className="bi bi-brush"> Pintura</i> 
        </h2>
      </div>

      <div className="produto-container">
        {produtos.map((produto, index) => (
          <ProdutoCard key={index} produto={produto} />
        ))}
      </div>
    </section>
  );
};

export default Pintura;