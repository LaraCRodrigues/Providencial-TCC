import React, { useState, useEffect, useRef } from "react";
import '../cssComponentes/navbarsite.css';

const Acessibilidade = ({ showacessibilidade, setShowacessibilidade }) => {
  const [fonteGrande, setFonteGrande] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [textoNegrito, setTextoNegrito] = useState(false);

  const fecharBalao = () => {
    setShowacessibilidade(false);
  };

  const alternarFonteGrande = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFonteGrande(!fonteGrande);
  };

  const alternarAltoContraste = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAltoContraste(!altoContraste);
  };

  const alternarTextoNegrito = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setTextoNegrito(!textoNegrito);
  };

  useEffect(() => {
    if (fonteGrande) {
      document.body.classList.add("fonte-grande");
    } else {
      document.body.classList.remove("fonte-grande");
    }

    if (altoContraste) {
      document.body.classList.add("alto-contraste");
    } else {
      document.body.classList.remove("alto-contraste");
    }

    if (textoNegrito) {
      document.body.classList.add("texto-negrito");
    } else {
      document.body.classList.remove("texto-negrito");
    }
  }, [fonteGrande, altoContraste, textoNegrito]);

  return (
    
    <div 
      id="balaoAcessibilidade" 
      className="balao-acessibilidade" 
      style={{ display: showacessibilidade ? "block" : "none" }} 
    >
      <button onClick={fecharBalao} id="btnFecharBalao" className="fechar-balao">
        <i className="bi bi-x-circle"></i>
      </button>
      <h4>Opções de Acessibilidade</h4>
      <ul>
        <li>
          <a href="#" className="fonte-grande" onClick={alternarFonteGrande}>Fonte Grande</a>
        </li>
        <li>
          <a href="#" className="alto-constraste" onClick={alternarAltoContraste}>Alto Contraste</a>
        </li>
        <li>
          <a href="#" className="texto-negrito" onClick={alternarTextoNegrito}>Texto em Negrito</a>
        </li>
      </ul>
    </div>
  );
};

export default Acessibilidade;
