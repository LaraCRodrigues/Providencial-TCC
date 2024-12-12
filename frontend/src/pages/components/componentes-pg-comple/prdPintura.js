import React, { useEffect, useState } from 'react';
import '../componentes-pg-comple/paginaCp.css';

const ProdutoCard = ({ produto, onAddToCart }) => {
    return (
        <div className="container-card">
            <div className="card" id="produto1">
                <img id="img-produto" src={produto.img} alt={produto.nome} className="produto-img" />
                <div className="separar-elementos">
                    <h3 className="marca"><a href="#">{produto.marca}</a></h3>
                    <p id="nome-produto-cat-pintura"><strong>{produto.nome}</strong></p>
                    <span className="preco" id="preco-produto">{produto.preco}<sup>{produto.precoCentavos}</sup></span>
                    <p className="parcelas" id="parcelas-produto">{produto.parcelas}</p>
                    <button className="btn-conferir" onClick={() => onAddToCart(produto)}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}

const Pintura = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/produtos/getProduto') // URL completa para o backend
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao buscar os produtos');
                }
                return response.json();
            })
            .then(data => setProdutos(data))
            .catch(error => setError(error.message));
    }, []);

    const handleAddToCart = (produto) => {
        // Recupera os produtos do carrinho do localStorage
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Adiciona o produto ao carrinho
        carrinho.push({ ...produto, quantidade: 1 });
        
        // Atualiza o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // (Opcional) Mostrar uma mensagem para o usuário ou atualizar o estado
        alert('Produto adicionado ao carrinho!');
    };

    return (
        <section className="produtos-sessao">
            <div className="container-bloco-title">
                <h2 className="subtitulos-produtos-apresentacao">
                    <i className="bi bi-brush"> Pintura</i>
                </h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="produto-container">
                {produtos.map((produto, index) => (
                    <ProdutoCard key={index} produto={produto} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </section>
    );
}

export default Pintura;
