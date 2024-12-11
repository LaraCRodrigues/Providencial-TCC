import React from 'react';
import '../componentes-pg-comple/paginaCp.css'

const ProdutoCard = ({ produto }) => {
    return (
        <div className="container-card">
            <div className="card" id="produto1">
                <img id="img-produto" src={produto.img} alt={produto.nome} className="produto-img" />
                <div className="separar-elementos">
                    <h3 className="marca"><a href="#">{produto.marca}</a></h3>
                    <p id="nome-produto-cat-construcao"><strong>{produto.nome}</strong></p>
                    <span className="preco" id="preco-produto">{produto.preco}<sup>{produto.precoCentavos}</sup></span>
                    <p className="parcelas" id="parcelas-produto">{produto.parcelas}</p>
                    <button className="btn-conferir"><a href="PgCompraProduto.html">Conferir</a></button>
                </div>
            </div>
        </div>
    );
}

const ProdutosSessao = () => {
    const produtos = [
        {
            img: "Imagens/BD imagens/12111.png", // Caminho da imagem do produto
            nome: "Cimento Portland CP II 40kg", // Nome do produto
            marca: "Votorantim", // Marca
            preco: "R$25", // Preço do produto
            precoCentavos: "99", // Centavos do preço
            parcelas: "em até 3x sem Juros" // Parcelamento
        },
        {
            img: "Imagens/BD imagens/12112.png", // Caminho da imagem do produto
            nome: "Areia Média 50kg", // Nome do produto
            marca: "Sifap", // Marca
            preco: "R$12", // Preço do produto
            precoCentavos: "80", // Centavos do preço
            parcelas: "em até 2x sem Juros" // Parcelamento
        },
        {
            img: "Imagens/BD imagens/12113.png", // Caminho da imagem do produto
            nome: "Tijolo de Barro 10x20x40cm", // Nome do produto
            marca: "Cerâmica Paulista", // Marca
            preco: "R$0,80", // Preço do produto
            precoCentavos: "50", // Centavos do preço
            parcelas: "em até 1x sem Juros" // Parcelamento
        },
        // Adicione mais objetos de produtos de materiais de construção conforme necessário
    ];

    return (
        <section className="produtos-sessao">
            <div className="container-bloco-title">
                <h2 className="subtitulos-produtos-apresentacao">
                    <i className="bi bi-house-door"> Materiais de Construção</i> 
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

export default ProdutosSessao;
