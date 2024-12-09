import React, { useRef } from 'react';
import '../cssComponentes/barrapesquisa.css';

const BarraPesquisa = () => {
  const inputRef = useRef(null);

  const pesquisarProduto = () => {
    console.log('Valor digitado:', inputRef.current?.value);
  };

  return (
    <div className="barra-pesquisa-produtos">
      <input
        type="text"
        ref={inputRef}
        placeholder="Digite o nome do produto..."
        id="pesquisa-input"
      />
      <button
        className="botao-buscar-produtos"
        onClick={pesquisarProduto}
        aria-label="Buscar produto"
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};

export default BarraPesquisa;
