import React, { useEffect, useState } from 'react';
import '../componentes-pg-comple/paginaCp.css';


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
                    <button className="btn-conferir"><a href="/comprar">Conferir</a></button>
                </div>
            </div>
        </div>
    );
}


const Pintura = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/produtos/getProduto') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao buscar os produtos');
                }
                return response.json();
            })
            .then(data => setProdutos(data))
            .catch(error => setError(error.message));
    }, []);

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
}


export default Pintura;







