import React, { useState } from 'react';
import '../cssAdm/dashAdm.css';

const Dashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [modalAlterarVisible, setModalAlterarVisible] = useState(false);
  const [produtoExclusao, setProdutoExclusao] = useState(null);
  const [produtoParaAlterar, setProdutoParaAlterar] = useState(null);

  const abrirModalAdicionar = () => {
    setModalAdicionarVisible(true);
  };

  const fecharModalAdicionar = () => {
    setModalAdicionarVisible(false);
  };

  const abrirModalExcluir = (produto) => {
    setProdutoExclusao(produto);
    setModalExcluirVisible(true);
  };

  const fecharModalExcluir = () => {
    setProdutoExclusao(null);
    setModalExcluirVisible(false);
  };

  const abrirModalAlterar = (produto) => {
    setProdutoParaAlterar(produto); // Definir o produto que será alterado
    setModalAlterarVisible(true);
  };

  const fecharModalAlterar = () => {
    setProdutoParaAlterar(null);
    setModalAlterarVisible(false);
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
  
    const nome = e.target.nome.value;
    const descricao = e.target.descricao.value;
    const idCategoria = e.target.idCategoria.value;
    const preco = e.target.preco.value;
  
    const novoProduto = {
      nome,
      descricao,
      idCategoria,
      preco,
    };
  
    try {
      console.log("informações do produto: ", JSON.stringify(novoProduto));
  
      const response = await fetch('http://localhost:3001/produtos/adicionarProduto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
      });
  
      // Verifica se a resposta foi OK
      if (!response.ok) {
        // Caso a resposta não seja OK, lança um erro com o status HTTP
        throw new Error(`Erro ao adicionar produto! Status: ${response.status}`);
      }
  
      // Tenta pegar o corpo da resposta como JSON
      const data = await response.json();
  
      // Se o produto foi adicionado com sucesso
      setProdutos([...produtos, data.produto]);
      fecharModalAdicionar();
      alert('Produto adicionado com sucesso!');
      console.log("Resposta do servidor:", data);
      return data;
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro mais detalhada
      console.error("Erro:", error);
      alert(`Erro: ${error.message || 'Erro desconhecido!'}`);
    }
  };
  


// Função para excluir um produto
const excluirProduto = () => {
  if (produtoExclusao) {
    const novosProdutos = produtos.filter(produto => produto !== produtoExclusao);
    setProdutos(novosProdutos);
    fecharModalExcluir();
  }
};

// Função para alterar um produto
const alterarProduto = (e) => {
  e.preventDefault();
  if (produtoParaAlterar) {
    const nome = e.target.nomeAlterar.value;
    const descricao = e.target.descricaoAlterar.value;
    const idCategoria = e.target.idCategoriaAlterar.value;
    const preco = e.target.precoAlterar.value;

    // Atualizar o produto no estado
    const novosProdutos = produtos.map(produto =>
      produto === produtoParaAlterar ? {
        ...produto,
        nome,
        descricao,
        idCategoria,
        preco,
      } : produto
    );

    setProdutos(novosProdutos);
    fecharModalAlterar();
  }
};

// Filtrar os produtos com base no valor da pesquisa
const produtosFiltrados = produtos.filter(produto =>
  produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
);

return (
  <header>
    <div className="container-alinhamento-atalhos">
      <h2 className='titulo-adm'>Página Gerenciamento</h2>
      <h5>Gerenciamento do administrador</h5>

      <div className="pesquisa-container">
        <input
          type="text"
          id="input-pesquisa"
          placeholder="Pesquisar produtos por nome..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      <div className="container">
        <div className="barra-rolagem-table">
          <table id="productTable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Data de Cadastro</th>
                <th>Imagem</th>
                <th>Detalhes</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.dataCadastro}</td>
                  <td><img src={produto.imagem} alt={produto.nome} /></td>
                  <td>
                    <a href="#" onClick={() => { }}>
                      Ver Detalhes
                    </a>
                  </td>
                  <td>
                    <a href="#" onClick={() => abrirModalExcluir(produto)}>
                      <i className="bi bi-trash"></i>
                    </a>
                  </td>
                  <td>
                    <a href="#" onClick={() => abrirModalAlterar(produto)}>
                      <i className="bi bi-pencil-square"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container-btn-add-ex-alt">
        <button id="btn-adicionar" onClick={abrirModalAdicionar}>Adicionar</button>
      </div>

      {/* Modal para Adicionar Produto */}
      {modalAdicionarVisible && (
        <div id="modalAdicionar" className={`modal-add ${modalAdicionarVisible ? 'show' : ''}`}>
          <div className="conteudo-modal-add">
            <span className="fechar-model-add" onClick={fecharModalAdicionar}>&times;</span>
            <h2>Adicionar Produto</h2>
            <form id="formAdicionarProduto" onSubmit={adicionarProduto}>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" required />

              <label htmlFor="descricao">Descrição:</label>
              <textarea id="descricao" required></textarea>

              <label htmlFor="idCategoria">Id da Categoria:</label>
              <input type="number" id="idCategoria" required min="1" />

              <label htmlFor="preco">Preço:</label>
              <input type="number" id="preco" min="1" required />

              <button type="submit">Adicionar Produto</button>

            </form>
          </div>
        </div>
      )}

      {/* Modal para Excluir Produto */}
      {modalExcluirVisible && (
        <div id="modalExcluir" className="modal-excluir" style={{ display: 'block' }}>
          <div className="conteudo-modal-add">
            <span className="fechar-model" onClick={fecharModalExcluir}>&times;</span>
            <h2>Excluir Produto</h2>
            <p>Você tem certeza que deseja excluir o produto "{produtoExclusao ? produtoExclusao.nome : ''}"?</p>
            <button onClick={excluirProduto}>Confirmar Excluir</button>
            <button onClick={fecharModalExcluir}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal para Alterar Produto */}
      {modalAlterarVisible && produtoParaAlterar && (
        <div id="modalAlterar" className="modal-alterar" style={{ display: 'block' }}>
          <div className="conteudo-modal-add">
            <span className="fechar-model" onClick={fecharModalAlterar}>&times;</span>
            <h2>Alterar Produto</h2>
            <form id="formAlterarProduto" onSubmit={alterarProduto}>
              <label htmlFor="nomeAlterar">Nome:</label>
              <input
                type="text"
                id="nomeAlterar"
                defaultValue={produtoParaAlterar.nome}

              />

              <label htmlFor="descricaoAlterar">Descrição:</label>
              <textarea
                id="descricaoAlterar"
                defaultValue={produtoParaAlterar.descricao}

              ></textarea>

              <label htmlFor="idCategoriaAlterar">Id da Categoria:</label>
              <input
                type="number"
                id="idCategoriaAlterar"
                defaultValue={produtoParaAlterar.idCategoria}
              />

              <label htmlFor="precoAlterar">Preço:</label>
              <input
                type="number"
                id="precoAlterar"
                defaultValue={produtoParaAlterar.preco}
              />

              <button type="submit">Salvar Alterações</button>
              <button type="button" onClick={fecharModalAlterar}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  </header>
);
};

export default Dashboard;
