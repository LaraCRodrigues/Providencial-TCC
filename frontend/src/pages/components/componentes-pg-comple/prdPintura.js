import React from 'react';
import '../componentes-pg-comple/paginaCp.css'

const ProdutoCard = ({ produto }) => {
    return (
        <div className="container-card">
            <div className="card" id="produto1">
                <img id="img-produto" src={produto.img} alt={produto.nome} className="produto-img" />
                <div className="separar-elementos">
                    <h3 className="marca"><a href="#">{produto.marca}</a></h3>
                    <p id="nome-produto-cat-pintura"><strong>{produto.nome}</strong></p>
                    <span className="preco" id="preco-produto">{produto.preco}<sup>{produto.precoCentavos}</sup></span>
                    <p className="parcelas" id="parcelas-produto">{produto.parcelas}</p>
                    <button className="btn-conferir"><a href="PgCompraProduto.html">Conferir</a></button>
                </div>
            </div>
        </div>
    );
}

const Pintura = () => {
    const produtos = [
        {
            img: "Imagens/BD imagens/12117.png", // Caminho da imagem do produto
            nome: "Tinta Acrílica Branca Fosca 18L", // Nome do produto
            marca: "Suvinil", // Marca do produto
            preco: "R$180", // Preço do produto
            precoCentavos: "00", // Centavos do preço
            parcelas: "em até 6x sem Juros" // Parcelamento
        },
        {
            img: "Imagens/BD imagens/12118.png", // Caminho da imagem do produto
            nome: "Rolo de Pintura 23cm", // Nome do produto
            marca: "Atlas", // Marca do produto
            preco: "R$25", // Preço do produto
            precoCentavos: "50", // Centavos do preço
            parcelas: "em até 2x sem Juros" // Parcelamento
        },
        {
            img: "Imagens/BD imagens/12119.png", // Caminho da imagem do produto
            nome: "Pincel 12mm", // Nome do produto
            marca: "Condor", // Marca do produto
            preco: "R$10", // Preço do produto
            precoCentavos: "00", // Centavos do preço
            parcelas: "em até 1x sem Juros" // Parcelamento
        },
        // Adicione mais objetos de produtos de pintura conforme necessário
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

            <div className="produto-container">
                {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
            </div>

            <div className="produto-container">
                {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
            </div>
        </section>
    );
}

export default Pintura;
