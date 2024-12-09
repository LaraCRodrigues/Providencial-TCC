const db = require('../config/Db');

const Carrinho = {
    create: async (idPedido, idProduto, quantidade, valorUnitario) => {
        try {
            // Verifica se o pedido existe 
            // O SELECT 1 é uma boa prática que otimiza e simplifica o processo de verificação de registros e usa menos dados
            const pedidoCheckSql = "SELECT 1 FROM PEDIDO WHERE idPedido = ?";
            const pedidoExists = await new Promise((resolve, reject) => {
                db.query(pedidoCheckSql, [idPedido], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.length > 0);
                });
            });

            if (!pedidoExists) {
                throw new Error('Pedido não encontrado');
            }

            // Verifica se o produto existe
            const produtoCheckSql = "SELECT 1 FROM PRODUTO WHERE idProduto = ?";
            const produtoExists = await new Promise((resolve, reject) => {
                db.query(produtoCheckSql, [idProduto], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.length > 0);
                });
            });

            if (!produtoExists) {
                throw new Error('Produto não encontrado');
            }

            // Insere o novo item no pedido
            const sql = "INSERT INTO ITENS_PEDIDOS (idPedido, idProduto, quantidade, valorUnitario) VALUES (?, ?, ?, ?)";
            const result = await new Promise((resolve, reject) => {
                db.query(sql, [idPedido, idProduto, quantidade, valorUnitario], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    delete: async (idItensPedidos) => {
        try {
            const sql = 'DELETE FROM ITENS_PEDIDOS WHERE idItensPedidos = ?';
            const result = await new Promise((resolve, reject) => {
                db.query(sql, [idItensPedidos], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
            if (result.affectedRows === 0) {
                throw new Error("Item não encontrado!");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    adicionarProdutoAoCarrinho: async (idCliente, idProduto, quantidade) => {
        try {
            // Verifica se o produto existe
            const produtoCheckSql = "SELECT * FROM PRODUTO WHERE idProduto = ?";
            const produtoExists = await new Promise((resolve, reject) => {
                db.query(produtoCheckSql, [idProduto], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.length > 0);
                });
            });

            if (!produtoExists) {
                throw new Error('Produto não encontrado');
            }

            // Verifica se o produto já está no carrinho do cliente
            const carrinhoCheckSql = "SELECT * FROM ITENS_PEDIDOS WHERE idCliente = ? AND idProduto = ?";
            const itemNoCarrinho = await new Promise((resolve, reject) => {
                db.query(carrinhoCheckSql, [idCliente, idProduto], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.length > 0 ? results[0] : null);
                });
            });

            if (itemNoCarrinho) {
                // Se o produto já estiver no carrinho, atualiza a quantidade
                const novaQuantidade = itemNoCarrinho.quantidade + quantidade;
                const updateSql = "UPDATE ITENS_PEDIDOS SET quantidade = ? WHERE idCliente = ? AND idProduto = ?";
                await new Promise((resolve, reject) => {
                    db.query(updateSql, [novaQuantidade, idCliente, idProduto], (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(results);
                    });
                });
            } else {
                // Se o produto não estiver no carrinho, insere um novo item
                const insertSql = "INSERT INTO ITENS_PEDIDOS (idCliente, idProduto, quantidade) VALUES (?, ?, ?)";
                await new Promise((resolve, reject) => {
                    db.query(insertSql, [idCliente, idProduto, quantidade], (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(results);
                    });
                });
            }

            return { idProduto, quantidade }; // Retorna os dados do produto adicionado ou atualizado
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = Carrinho;