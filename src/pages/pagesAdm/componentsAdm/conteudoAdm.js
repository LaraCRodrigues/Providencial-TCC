import React from 'react';

const AtalhosAdm = () => {
  return (
    <header>
      <div>
        <div className="content">
          <div className="cards-atalhos-adm">
            <h2 className='titulo-adm'> Página Inicial</h2>
            <h5>Página inicial do sistema de Gerenciamento do administrador</h5>
            <div className="container-img-prop">
              {/* <img 
                src="Imagens/BD imagens/Propaganda Dashboard.png" 
                alt="propaganda-providencial" 
              /> */}
             
            </div>
          </div>

          <div className="cards-atalhos-adm2">
            <h3><i className="bi bi-gear-fill"></i> Configuração</h3>
            <h5>Configurar sistema</h5>
            <ul className="btn-link-conferir">
              <li className="link-conferir">
                <a href="/gerenConfig">Conferir <i className="bi bi-arrow-right-short"></i></a>
              </li>
            </ul>
          </div>
          <div className="card-atalho-gerenciamento">
                <h3>
                  <i className="bi bi-archive-fill"></i> Gerenciamento
                </h3>
                <h5>Aba de gerenciamento de estoque da loja</h5>
                <ul className="btn-link-conferir-gerenc">
                  <li>
                    <a href="/gerenDash">Conferir <i className="bi bi-arrow-right-short"></i></a>
                  </li>
                </ul>
              </div>
        </div>
      </div>
    </header>
  );
};

export default AtalhosAdm;
