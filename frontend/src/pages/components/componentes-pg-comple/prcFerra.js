import React from 'react';
import '../componentes-pg-comple/paginaCp.css'

const ProdutoCard = ({ produto }) => {
    return (
        <div className="container-card">
            <div className="card" id="produto1">
                <img id="img-produto" src={produto.img} alt={produto.nome} className="produto-img" />
                <div className="separar-elementos">
                    <h3 className="marca"><a href="#">{produto.marca}</a></h3>
                    <p id="nome-produto-cat-ferramentas"><strong>{produto.nome}</strong></p>
                    <span className="preco" id="preco-produto">{produto.preco}<sup>{produto.precoCentavos}</sup></span>
                    <p className="parcelas" id="parcelas-produto">{produto.parcelas}</p>
                    <button className="btn-conferir"><a href="PgCompraProduto.html">Conferir</a></button>
                </div>
            </div>
        </div>
    );
}

const Ferramentas = () => {
    const produtos = [
        {
            img: "Imagens/BD imagens/12114.png", // Caminho da imagem do produto
            nome: "Furadeira Elétrica 350W", // Nome do produto
            marca: "Vonder", // Marca do produto
            preco: "R$150", // Preço do produto
            precoCentavos: "00", // Centavos do preço
            parcelas: "em até 5x sem Juros" // Parcelamento
        },
        {
            img: "Imagens/BD imagens/12115.png", // Caminho da imagem do produto
            nome: "Chave de Fenda 6mm", // Nome do produto
            marca: "Gedore", // Marca do produto
            preco: "R$25", // Preço do produto
            precoCentavos: "50", // Centavos do preço
            parcelas: "em até 2x sem Juros" // Parcelamento
        },
        {
            img: "Imagens/BD imagens/12116.png", // Caminho da imagem do produto
            nome: "Serra Circular 7 1/4\"", // Nome do produto
            marca: "Makita", // Marca do produto
            preco: "R$400", // Preço do produto
            precoCentavos: "00", // Centavos do preço
            parcelas: "em até 6x sem Juros" // Parcelamento
        },
        // Adicione mais objetos de produtos de ferramentas conforme necessário
    ];

    return (
        <section className="produtos-sessao">
            <div className="container-bloco-title">
                <h2 className="subtitulos-produtos-apresentacao">
                    <i className="bi bi-tools"> Ferramentas</i> 
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

export default Ferramentas;
