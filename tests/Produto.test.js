const Produto = require('../model/Produto');
const db = require('../config/Db');

jest.mock('../config/Db');

describe('Produto Model', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('deve criar um novo produto', async () => {
        const mockInsertId = 1;
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { insertId: mockInsertId });
        });

        const result = await Produto.create('Produto Teste', 'Descrição Teste', 'Categoria Teste');
        expect(result).toEqual({ message: 'O ID do Produto Produto Teste é: 1', insertId: mockInsertId });
    });

    test('deve encontrar um produto pelo ID', async () => {
        const mockProduct = { id: 1, nome: 'Produto Teste', descricao: 'Descrição Teste', categoria: 'Categoria Teste' };
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, [mockProduct]);
        });

        const result = await Produto.findById(1);
        expect(result).toEqual(mockProduct);
    });

    test('deve adicionar um novo produto', async () => {
        const mockInsertId = 2;
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { insertId: mockInsertId });
        });

        const result = await Produto.add('Produto Novo', 100.0, 'Descrição Nova');
        expect(result).toEqual({ id: mockInsertId, nome: 'Produto Novo', preco: 100.0, descricao: 'Descrição Nova' });
    });

    test('deve deletar um produto pelo ID', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        await expect(Produto.delete(1)).resolves.toBeUndefined();
    });

    test('deve retornar erro ao tentar deletar um produto que não existe', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 0 });
        });

        await expect(Produto.delete(999)).rejects.toThrow("Produto não encontrado!");
    });

    test('deve retornar todos os produtos', async () => {
        const mockProducts = [
            { id: 1, nome: 'Produto 1', descricao: 'Descrição 1', categoria: 'Categoria 1' },
            { id: 2, nome: 'Produto 2', descricao: 'Descrição 2', categoria: 'Categoria 2' }
        ];
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, mockProducts);
        });

        const result = await Produto.getAll();
        expect(result).toEqual(mockProducts);
    });
});