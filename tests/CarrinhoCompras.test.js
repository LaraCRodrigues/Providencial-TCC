const request = require('supertest');
const express = require('express');
const db = require('../config/Db');
const Carrinho = require('../model/CarrinhoCompras'); 
const carrinhoRoutes = require('../routes/CarrinhoComprasRoute'); 

jest.mock('../config/Db', () => ({
    query: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(carrinhoRoutes); // Usa as rotas do carrinho

describe('Carrinho e Rotas', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Modelo Carrinho', () => {
        describe('create', () => {
            it('deve criar um item no carrinho com sucesso', async () => {
                // Mock do retorno do SELECT 1 para pedido e produto
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT 1 FROM PEDIDO')) {
                        callback(null, [{ idPedido: params[0] }]); // Pedido existe
                    } else if (sql.includes('SELECT 1 FROM PRODUTO')) {
                        callback(null, [{ idProduto: params[0] }]); // Produto existe
                    } else if (sql.includes('INSERT INTO ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 1 }); // Inserção bem-sucedida
                    }
                });

                const result = await Carrinho.create(1, 1, 2, 10.00);
                expect(result).toEqual({ affectedRows: 1 });
            });

            it('deve lançar um erro se o pedido não existir', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT 1 FROM PEDIDO')) {
                        callback(null, []); // Pedido não existe
                    }
                });

                await expect(Carrinho.create(1, 1, 2, 10.00)).rejects.toThrow('Pedido não encontrado');
            });

            it('deve lançar um erro se o produto não existir', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT 1 FROM PEDIDO')) {
                        callback(null, [{ idPedido: params[0] }]); // Pedido existe
                    } else if (sql.includes('SELECT 1 FROM PRODUTO')) {
                        callback(null, []); // Produto não existe
                    }
                });

                await expect(Carrinho.create(1, 1, 2, 10.00)).rejects.toThrow('Produto não encontrado');
            });
        });

        describe('delete', () => {
            it('deve deletar um item do carrinho com sucesso', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('DELETE FROM ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 1 }); // Deleção bem-sucedida
                    }
                });

                await expect(Carrinho.delete(1)).resolves.not.toThrow();
            });

            it('deve lançar um erro se o item não existir', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('DELETE FROM ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 0 }); // Nenhum item deletado
                    }
                });

                await expect(Carrinho.delete(1)).rejects.toThrow('Item não encontrado!');
            });
        });

        describe('adicionarProdutoAoCarrinho', () => {
            it('deve adicionar um produto ao carrinho com sucesso', async () => {
                // Mock do retorno do SELECT para produto e carrinho
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT * FROM PRODUTO')) {
                        callback(null, [[{ idProduto: params[0], preco: 10.00 }]]); // Produto existe
                    } else if (sql.includes('SELECT * FROM ITENS_PEDIDOS')) {
                        callback(null, []); // Produto não está no carrinho
                    } else if (sql.includes('INSERT INTO ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 1 }); // Inserção bem-sucedida
                    }
                });

                const result = await Carrinho.adicionarProdutoAoCarrinho(1, 1, 2);
                expect(result).toEqual({ idProduto: 1, quantidade: 2 });
            });

            it('deve atualizar a quantidade se o produto já estiver no carrinho', async () => {
                // Mock do retorno do SELECT para produto e carrinho
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT * FROM PRODUTO')) {
                        callback(null, [[{ idProduto: params[0], preco: 10.00 }]]); // Produto existe
                    } else if (sql.includes('SELECT * FROM ITENS_PEDIDOS')) {
                        callback(null, [{ idCliente: params[0], idProduto: params[1], quantidade: 1 }]); // Produto já no carrinho
                    } else if (sql.includes('UPDATE ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 1 }); // Atualização bem-sucedida
                    }
                });

                const result = await Carrinho.adicionarProdutoAoCarrinho(1, 1, 2);
                expect(result).toEqual({ idProduto: 1, quantidade: 2 }); // Retorna a quantidade atualizada
            });

            it('deve lançar um erro se o produto não existir', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT * FROM PRODUTO')) {
                        callback(null, [[]]); // Produto não existe
                    }
                });

                await expect(Carrinho.adicionarProdutoAoCarrinho(1, 1, 2)).rejects.toThrow('Produto não encontrado');
            });
        });
    });

    describe('Rotas de Carrinho', () => {
        describe('POST /carrinho/adicionar', () => {
            it('deve adicionar um produto ao carrinho com sucesso', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT * FROM PRODUTO')) {
                        callback(null, [[{ idProduto: params[0], preco: 10.00 }]]); // Produto existe
                    }
                });

                const response = await request(app)
                    .post('/carrinho/adicionar')
                    .send({ idCliente: 1, idProduto: 1, quantidade: 2 });

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('message', 'Produto adicionado ao carrinho com sucesso');
                expect(response.body).toHaveProperty('carrinho');
                expect(response.body.carrinho).toEqual([{ idProduto: 1, quantidade: 2 }]);
            });

            it('deve retornar 404 se o produto não existir', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('SELECT * FROM PRODUTO')) {
                        callback(null, [[]]); // Produto não existe
                    }
                });

                const response = await request(app)
                    .post('/carrinho/adicionar')
                    .send({ idCliente: 1, idProduto: 1, quantidade: 2 });

                expect(response.status).toBe(404);
                expect(response.body).toHaveProperty('error', 'Produto não encontrado');
            });

            it('deve retornar 500 em caso de erro ao verificar produto', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    callback(new Error('Erro no banco de dados'));
                });
    
                const response = await request(app)
                    .post('/carrinho/adicionar')
                    .send({ idCliente: 1, idProduto: 1, quantidade: 2 });
    
                expect(response.status).toBe(500);
                expect(response.body).toHaveProperty('error', 'Erro ao verificar produto');
            });    
        });

        describe('POST /carrinho/finalizar', () => {
            it('deve finalizar o pedido com sucesso', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('INSERT INTO PEDIDO')) {
                        callback(null, [{ insertId: 1 }]); // Pedido inserido com sucesso
                    } else if (sql.includes('INSERT INTO ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 1 }); // Itens inseridos com sucesso
                    }
                });

                jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({ data: { status: 'approved' } }); // Mock de pagamento
                jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({ data: { valorFrete: 10.00 } }); // Mock de frete

                const response = await request(app)
                    .post('/carrinho/finalizar')
                    .send({
                        idCliente: 1,
                        produtos: [{ idProduto: 1, quantidade: 2, preco: 10.00 }],
                        formaPagamento: 'cartao',
                        cep: '12345-678'
                    });

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('message', 'Pedido finalizado com sucesso');
                expect(response.body).toHaveProperty('pedidoId', 1);
                expect(response.body).toHaveProperty('pagamento');
                expect(response.body).toHaveProperty('frete');
            });

            it('deve retornar 500 em caso de erro ao finalizar pedido', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('INSERT INTO PEDIDO')) {
                        callback(new Error('Erro ao inserir pedido')); // Simula erro na inserção do pedido
                    }
                });

                const response = await request(app)
                    .post('/carrinho/finalizar')
                    .send({
                        idCliente: 1,
                        produtos: [{ idProduto: 1, quantidade: 2, preco: 10.00 }],
                        formaPagamento: 'cartao',
                        cep: '12345-678'
                    });

                expect(response.status).toBe(500);
                expect(response.body).toHaveProperty('error', 'Erro ao finalizar pedido');
            });

            it('deve retornar erro específico da API se houver erro na resposta', async () => {
                db.query.mockImplementation((sql, params, callback) => {
                    if (sql.includes('INSERT INTO PEDIDO')) {
                        callback(null, [{ insertId: 1 }]); // Pedido inserido com sucesso
                    } else if (sql.includes('INSERT INTO ITENS_PEDIDOS')) {
                        callback(null, { affectedRows: 1 }); // Itens inseridos com sucesso
                    }
                });

                jest.spyOn(require('axios'), 'post').mockRejectedValueOnce({
                    response: { status: 400, data: { error: 'Erro no pagamento' } }
                });

                const response = await request(app)
                    .post('/carrinho/finalizar')
                    .send({
                        idCliente: 1,
                        produtos: [{ idProduto: 1, quantidade: 2, preco: 10.00 }],
                        formaPagamento: 'cartao',
                        cep: '12345-678'
                    });

                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty(' error', 'Erro no pagamento');
            });
        });
    });
});