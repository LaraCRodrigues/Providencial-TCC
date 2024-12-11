import React, { useState } from 'react';
import '../cssAdm/estoque.css'; // Certifique-se de ter este CSS ou ajuste conforme necessário.

const Estoque = () => {
  // Estado para armazenar os produtos
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Produto 1', quantidade: 10, preco: 20 },
    { id: 2, nome: 'Produto 2', quantidade: 5, preco: 50 },
  ]);

  // Estado para armazenar os dados do novo produto
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    quantidade: '',
    preco: '',
  });

  // Estado para controlar a visibilidade dos modais
  const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
  const [modalAlterarVisible, setModalAlterarVisible] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  // Função para adicionar um novo produto
  const adicionarProduto = (e) => {
    e.preventDefault();
    const novoProdutoAdicionado = {
      id: produtos.length + 1,
      nome: novoProduto.nome,
      quantidade: parseInt(novoProduto.quantidade),
      preco: parseFloat(novoProduto.preco),
    };
    setProdutos([...produtos, novoProdutoAdicionado]);
    setNovoProduto({ nome: '', quantidade: '', preco: '' });
    setModalAdicionarVisible(false);
  };

  // Função para editar um produto
  const editarProduto = (produto) => {
    setProdutoEditando(produto);
    setModalAlterarVisible(true);
  };

  // Função para salvar as alterações de um produto
  const salvarAlteracao = (e) => {
    e.preventDefault();
    setProdutos(
      produtos.map((produto) =>
        produto.id === produtoEditando.id
          ? produtoEditando
          : produto
      )
    );
    setProdutoEditando(null);
    setModalAlterarVisible(false);
  };

  // Função para excluir um produto
  const excluirProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  return (
    <div className="estoque-container">
      <h2>Gerenciamento de Estoque</h2>

      {/* Tabela de Produtos */}
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th className="coluna-nome">Nome</th>
            <th className="coluna-quantidade">Quantidade</th>
            <th className="coluna-preco">Preço</th>
            <th className="coluna-opcoes">Opções</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td className="coluna-nome">{produto.nome}</td>
              <td className="coluna-quantidade">{produto.quantidade}</td>
              <td className="coluna-preco">{produto.preco}</td>
              <td className="coluna-opcoes">
                <button
                  className="btn-editar"
                  onClick={() => editarProduto(produto)}
                >
                  Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirProduto(produto.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão para adicionar novo produto */}
      <button
        className="btn-adicionar-produto"
        onClick={() => setModalAdicionarVisible(true)}
      >
        Adicionar Produto
      </button>

      {/* Modal para adicionar produto */}
      {modalAdicionarVisible && (
        <div className="modal">
          <div className="modal-conteudo">
            <span
              className="fechar-modal"
              onClick={() => setModalAdicionarVisible(false)}
            >
              &times;
            </span>
            <h3>Adicionar Produto</h3>
            <form onSubmit={adicionarProduto}>
              <input
                type="text"
                placeholder="Nome"
                value={novoProduto.nome}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, nome: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={novoProduto.quantidade}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    quantidade: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Preço"
                value={novoProduto.preco}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, preco: e.target.value })
                }
                required
              />
              <button type="submit">Adicionar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar produto */}
      {modalAlterarVisible && (
        <div className="modal">
          <div className="modal-conteudo">
            <span
              className="fechar-modal"
              onClick={() => setModalAlterarVisible(false)}
            >
              &times;
            </span>
            <h3>Editar Produto</h3>
            <form onSubmit={salvarAlteracao}>
              <input
                type="text"
                placeholder="Nome"
                value={produtoEditando?.nome}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    nome: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={produtoEditando?.quantidade}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    quantidade: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Preço"
                value={produtoEditando?.preco}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    preco: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Salvar Alterações</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estoque;
