import React from 'react';
import './componentes-pg-comple/paginacao.css';
const Paginacao = () => {
  return (
    <div className="paginacao">
      <a href="?page=1" className="pagina ativa">1</a>
      <a href="?page=2" className="pagina">2</a>
      <a href="?page=3" className="pagina">3</a>
      <a href="?page=4" className="pagina">4</a>
      <a href="?page=5" className="pagina">5</a>
      <a href="?page=6" className="pagina">
        <i className="bi bi-arrow-right-short"></i>
      </a>
    </div>
  );
};

export default Paginacao;
