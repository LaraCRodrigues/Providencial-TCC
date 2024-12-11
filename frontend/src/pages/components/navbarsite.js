import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BarraPesquisa from "./subcomponents/barrapesquisa";
import Carrinho from "./subcomponents/carrinho";
import Acessibilidade from "./subcomponents/Acessibilidade";
import Categorias from "./subcomponents/categorias";
import "./cssComponentes/navbarsite.css";
import "./cssComponentes/barrapesquisa.css";
import "./cssComponentes/carrinho.css";
import "./cssComponentes/MediaQueries.css";

const Navbar = () => {
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [showAcessibilidade, setShowAcessibilidade] = useState(false);
  const [fonteGrande, setFonteGrande] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [textoNegrito, setTextoNegrito] = useState(false);
  const categoriesRef = useRef(null);
  const [showCategories, setShowCategories] = useState(false);

  const toggleFontLarge = () => setFonteGrande(!fonteGrande);
  const toggleHighContrast = () => setAltoContraste(!altoContraste);
  const toggleTextBold = () => setTextoNegrito(!textoNegrito);

  const toggleCategoriesSidebar = () => {
    setShowCategories(!showCategories);
  };

  const toggleAcessibilidade = () => {
    setShowAcessibilidade(!showAcessibilidade);
  };

  const abrircarrinho = () => setShowCarrinho(!showCarrinho);

  return (
    <header id="cabecalho">
      {/* Navbar Principal */}
      <nav id="navbar2">
        <div className="container-2navbar">
          {/* Logo */}
          <Link to="/">
            <img src="Imagens/Logos Providencial/Providencial logo 2.png" alt="logo" />
          </Link>
          {/* Barra de Pesquisa */}
          <BarraPesquisa />

          {/* Botão de Acessibilidade */}


          <Acessibilidade
            showacessibilidade={showAcessibilidade}
            setShowacessibilidade={setShowAcessibilidade}
            toggleFontLarge={toggleFontLarge}
            toggleHighContrast={toggleHighContrast}
            toggleTextBold={toggleTextBold}
            isFontLarge={fonteGrande}
            isHighContrast={altoContraste}
            isTextBold={textoNegrito}
          />
         
          {/* Carrinho */}
          <Carrinho showSidebar={showCarrinho} toggleSidebar={abrircarrinho} />

          {/* Ícone carrinho */}
          <div className="icons-2navbar">
          <button
            id="btn-acessibilidade"
            onClick={(e) => {
              e.stopPropagation(); // Impede que o clique feche os elementos
              toggleAcessibilidade();
            }}
          >
            <i className="bi bi-universal-access-circle"></i>
          </button>
            <i className="bi bi-cart" id="abrirCarrinho" title="Carrinho" onClick={abrircarrinho}></i>
          </div>
        </div>
      </nav>

      {/* Navbar Secundária */}
      <nav id="navbar3">
        <div className="flex-links-cat">
          {/* Barra Lateral de Categorias */}
          <Categorias
            showCategories={showCategories}
            toggleCategoriesSidebar={toggleCategoriesSidebar}
            categoriesRef={categoriesRef}
          />

          {/* Links de Navegação */}
          <div className="center-links">
            <ul className="menu-hamburguer-elements">
              <li className="gap-links">
                <Link className="links-categoria" to="/">
                  Inicio
                </Link>
                <Link className="links-categoria" to="/ajuda">
                  Ajuda
                </Link>
                <Link className="links-categoria" to="/loja">
                  Loja
                </Link>
                <Link className="links-categoria" to="/contato">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Botão de Login */}
          <button className="btn-cadastrar-login">
            <i className="bi bi-person-fill"></i>
            <Link className="conta" to="/login">
              Fazer Login
            </Link>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
