import React from 'react';
import './cssComponentes/cardnavegaveis.css';
import { Link } from 'react-router-dom';

const CardsNavegaveis = () => {
    return (
        <section id="section4">
            <div className="container-card-navegaveis">
                <div className="card1-pagina-Materiais">
                    <h4 className="titulo-card-navegavel">MATERIAIS</h4>
                    <img src="Imagens/BD imagens/Propaganda 4.jpg" alt="foto-representativa-do-site" />
                    <div className="alinhamento-botao-cards-navega">
                    <button className="botao-de-direcionamento">
                            <Link to ="/Ferramentas">Conferir</Link>
                            </button>
                    </div>
                </div>

                <div className="card2-pagina-ferramentas">
                    <h4 className="titulo-card-navegavel">FERRAMENTAS</h4>
                    <img src="Imagens/BD imagens/propaganda 3.jpg" alt="foto-representativa-do-site" />
                    <div className="alinhamento-botao-cards-navega">
                        <button className="botao-de-direcionamento">
                            <Link to ="/Materiais">Conferir</Link>
                            </button>
                    </div>
                </div>

                <div className="card3-navegacional">
                    <div className="centralizacao-conteudo-card-navegavel">
                        <h4 className="titulo-card-navegavel">NAVEGAVEIS</h4>
                        <ul>
                            <li><Link to="/">Início</Link></li>
                            <li><Link to="/ajuda">Ajuda</Link></li>
                            <li><Link to="/loja">Loja</Link></li>
                            <li><Link to="/conta">Sua Conta</Link></li>
                            <li><Link to="/contato">Contato</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardsNavegaveis;
