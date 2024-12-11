import React from 'react';
import './navbar.css'; 
import logo from '../Imagens/Logos Providencial/Providencial logo 2.png';
const Navbarlgo = () => {
    return (
        <nav className="navbar">
            <a href="/">
                <img src={logo} alt="Logo da Providencial" />
            </a>
            <a href="/" className="link-sair-login">
                <i className="bi bi-box-arrow-left"></i> Sair
            </a>
        </nav>
    );
};


export default Navbarlgo;
