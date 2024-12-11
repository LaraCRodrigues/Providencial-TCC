import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Categorias = ({ showCategories, toggleCategoriesSidebar, categoriesRef }) => {
  useEffect(() => {
    const ClicarforaCategorias = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target) && // Clique fora da barra lateral
        !event.target.closest('#btn-categorias') // Clique fora do botão de categorias
      ) {
        if (showCategories) {
          toggleCategoriesSidebar(); // Fecha a barra lateral de categorias
        }
      }
    };

    // Adiciona o ouvinte de evento de clique
    document.addEventListener("click", ClicarforaCategorias);

    // Remove o ouvinte ao desmontar o componente
    return () => {
      document.removeEventListener("click", ClicarforaCategorias);
    };
  }, [categoriesRef, toggleCategoriesSidebar, showCategories]);

  return (
    <div>
      <div className="flex-hrcategorias">
        <div
          className="menu-h"
          id="btn-categorias"
          onClick={toggleCategoriesSidebar}
        >
          <i className="bi bi-list"></i>
          <span className="links-categoria">Categorias</span>
        </div>
        <hr className="separator" />
      </div>

      <div
        id="barra-lateral-categorias"
        ref={categoriesRef}
        className={`barra-lateral-categorias ${showCategories ? "show" : ""}`}
      >
        <ul className="links-categorias-inter">
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <Link to="/minha-conta">
              <i className="bi bi-person-fill"></i> Minha conta
            </Link>
            <ul className="subcategorias">
              <li>
                <Link to="/meus-pedidos">Meus pedidos</Link>
              </li>
              <li>
                <Link to="/favoritos">Favoritos</Link>
              </li>
              <li>
                <Link to="/ajuda">Ajuda</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/categorias">Selecionar Categorias</Link>
            <ul className="subcategorias">
              <li>
                <Link to="/ferramentas">
                  <i className="bi bi-gear-fill"></i> Ferramentas
                </Link>
              </li>
              <li>
                <Link to="/pintura">
                  <i className="bi bi-palette-fill"></i> Pintura
                </Link>
              </li>
              <li>
                <Link to="/construcao">
                  <i className="bi bi-bricks"></i> Construção
                </Link>
              </li>
              <li>
                <Link to="/eletrica">
                  <i className="bi bi-plug-fill"></i> Elétrica
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categorias;
