import React from 'react';
import './cssComponentes/cardsseguranca.css'; // Certifique-se de criar e importar o CSS específico para esse componente

const CardsSeguranca = () => {
    return (
        <section id="section5">
            <div className="container-cards-seguranca">
                <div className="card-seguranca">
                    <i className="bi bi-shield-check"></i>
                    <h5>100% de segurança em sua compra</h5>
                    <br />
                    <p>Garantimos que sua compra seja realizada devidamente e caso não, realizaremos reembolso</p>
                </div>

                <div className="card-seguranca">
                    <i className="bi bi-credit-card-2-back-fill"></i>
                    <h5>Escolha o Método de Pagamento</h5>
                    <br />
                    <p>Possuímos vários métodos, entre eles pix, cartões de crédito e débito, boletos e transferência bancária.</p>
                </div>

                <div className="card-seguranca">
                    <i className="bi bi-car-front-fill"></i>
                    <h5>Realizamos sua entrega</h5>
                    <br />
                    <p>Garantimos que sua compra seja realizada devidamente e caso não, realizaremos reembolso</p>
                </div>

                <div className="card-seguranca">
                    <i className="bi bi-cloud-download"></i>
                    <h5>Reembolso imediato</h5>
                    <br />
                    <p>Caso ocorra qualquer dificuldade na compra ou ao adquirir algum produto na loja será feito um reembolso em 48h</p>
                </div>
            </div>
        </section>
    );
};

export default CardsSeguranca;
