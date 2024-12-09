import React from 'react';
import './cssComponentes/footer.css'; // Importar o CSS específico para o rodapé
import { Link } from 'react-router-dom';

const FooterSite = () => {
    return (
        <>
            <div className="rodape-informativo">
                <div className="aligm-texto">
                    <div className="texto-container">
                        <i className="bi bi-clock"></i>
                        <div>
                            <h3 className="informacao-rodape">Horário de Funcionamento</h3>
                            <h5 className="informacao-rodape">De segunda-feira a sábado das 7h às 20h</h5>
                        </div>
                    </div>

                    <div className="texto-container">
                        <i className="bi bi-telephone"></i>
                        <div>
                            <h3 className="informacao-rodape">(71) 0000-0000</h3>
                        </div>
                    </div>

                    <div className="texto-container">
                        <i className="bi bi-envelope"></i>
                        <div>
                            <h3 className="informacao-rodape">emaildaloja@gmail.com</h3>
                        </div>
                    </div>
                </div>
            </div>

            <footer id="rodape">
                <div className="footer-content">
                    <div className="navegacao">
                        <h4>Navegue</h4>
                        <nav>
                            <ul className="links-de-direcionamento-footer">
                                <li><Link to="/">Início</Link></li>
                                <li><Link to="/PgProdutos">Loja</Link></li>
                                <li><Link to="/PgContato">Contato</Link></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="redes-sociais">
                        <h4>Redes sociais</h4>
                        <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                        <Link to="#"><i className="fab fa-instagram"></i></Link>
                    </div>

                    <div className="footer-links">
                        <ul>
                            <li><Link to="#">Termos e condições</Link></li>
                            <li><Link to="#">Trabalhe conosco</Link></li>
                            <li><Link to="#">Ofertas</Link></li>
                            <li><Link to="#">Acessibilidade</Link></li>
                            <li><Link to="#">Contato</Link></li>
                        </ul>
                    </div>

                    <p>&copy; 2023 Your Website</p>
                </div>
            </footer>
        </>
    );
};

export default FooterSite;
