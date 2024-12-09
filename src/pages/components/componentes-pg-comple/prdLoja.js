import React from 'react';
import '../componentes-pg-comple/paginaCp.css'
const ProdutoCard = ({ produto }) => {
    return (
        <div className="container-card">
            <div className="card" id="produto1">
                <img id="img-produto" src={produto.img} alt={produto.nome} className="produto-img" />
                <div className="separar-elementos">
                    <h3 className="marca"><a href="#">{produto.marca}</a></h3>
                    <p id="nome-produto-cat-eletrica"><strong>{produto.nome}</strong></p>
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
            img: "Imagens/BD imagens/12111.png",
            nome: "ADAPTADOR 2P+T UNIVERSAL 10A 250V~ BR ILUMI",
            marca: "Ilumi",
            preco: "R$12",
            precoCentavos: "50",
            parcelas: "em 2x sem Juros"
        },
        // Adicione mais objetos de produtos aqui, se necessário
    ];

    return (
        <section className="produtos-sessao">
            <div className="container-bloco-title">
            <h2 className="subtitulos-produtos-apresentacao"><i className="bi bi-box"></i> Loja</h2>
            </div>

            <div className="produto-container">
                {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 
                
            </div>
            <div className="produto-container">
                {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 
                
            </div>
            <div className="produto-container">
                {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} />
                ))}
                 
                
            </div>
            
        </section>
    );
}

export default ProdutosSessao;
