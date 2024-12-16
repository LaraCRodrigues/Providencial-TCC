import React, { useState } from 'react';

const PesquisaCategorias = () => {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const categorias = [
    'Ferramentas',
    'Pintura',
    'Materiais de Construção',
    'Elétrica',
    'Hidráulica',
    'Acabamento',
  ];

  const handlePesquisa = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <section className="pesquisa-categorias">
      <div className="container-pesquisa-categorias">
        <h2 className="titulo-pesquisa-categorias">Pesquise por Categorias</h2>
        <input
          type="text"
          placeholder="Digite a categoria..."
          value={termoPesquisa}
          onChange={handlePesquisa}
          className="input-pesquisa-categorias"
        />
      </div>

      <div className="lista-categorias">
        {categoriasFiltradas.length > 0 ? (
          categoriasFiltradas.map((categoria, index) => (
            <div key={index} className="categoria-item">
              {categoria}
            </div>
          ))
        ) : (
          <p className="mensagem-nenhum-resultado">Nenhuma categoria encontrada.</p>
        )}
      </div>
    </section>
  );
};

export default PesquisaCategorias;
