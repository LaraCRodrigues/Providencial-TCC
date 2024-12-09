const Pedido = require('../model/Pedido');
const db = require('../config/Db');

jest.mock('../config/Db', () => ({
    promise: jest.fn().mockReturnValue({
        query: jest.fn()
    })
}));

describe('Modelo Pedido', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('deve criar um novo pedido', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([[{ idCliente: 1 }]]); // Simula que o cliente foi encontrado
        mockQuery.mockResolvedValueOnce([{ insertId: 1 }]); // Mock do resultado da inserção

        const result = await Pedido.create('12345678900', '2023-10-01');
        
        expect(result).toEqual({ message: 'O ID do Pedido é: 1', insertId: 1 });
        expect(mockQuery).toHaveBeenCalledTimes(2); // Deve chamar o banco duas vezes (para o cliente e para a inserção)
    });

    test('deve lançar um erro se o cliente não for encontrado', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([[]]); // Simula que o cliente não foi encontrado

        await expect(Pedido.create('12345678900', '2023-10-01'))
            .rejects
            .toThrow("Cliente não encontrado");
    });

    test('deve buscar um pedido pelo ID', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([[{ idPedido: 1, statusPedido: 'Pendente' }]]); // Pedido encontrado

        const result = await Pedido.findById(1);
        
        expect(result).toEqual({ idPedido: 1, statusPedido: 'Pendente' });
        expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM PEDIDO WHERE idPedido = ?", [1]);
    });

    test('deve retornar null se o pedido não for encontrado', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([[]]); // Mock do resultado vazio

        const result = await Pedido.findById(999); // ID que não existe
        
        expect(result).toBeNull();
    });

    test('deve listar todos os pedidos', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([[{ idPedido: 1 }, { idPedido: 2 }]]); // LISTA DOS PEDIDOS

        const result = await Pedido.getAll();
        
        expect(result).toEqual([{ idPedido: 1 }, { idPedido: 2 }]);
        expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM PEDIDO");
    });

    test('deve deletar um pedido pelo ID', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]); // Remoção bem-sucedida

        await Pedido.delete(1);
        
        expect(mockQuery).toHaveBeenCalledWith("DELETE FROM PEDIDO WHERE idPedido = ?", [1]);
    });

    test('deve lançar um erro se tentar deletar um pedido que não existe', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([{ affectedRows: 0 }]); // Simula que nenhum pedido foi encontrado
    
        await expect(Pedido.delete(999)).rejects.toThrow("Pedido não encontrado");
    });

    test('deve atualizar um pedido', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([[{ idPedido: 1 }]]); // Pedido encontrado
        mockQuery.mockResolvedValueOnce ([{ affectedRows: 1 }]); // Atualização bem-sucedida

        const result = await Pedido.update(1, { statusPedido: 'Concluído' });
        
        expect(result).toEqual({ message: 'Pedido atualizado com sucesso!' });
        expect(mockQuery).toHaveBeenCalledWith("UPDATE PEDIDO SET statusPedido = ? WHERE idPedido = ?", ['Concluído', 1]);
    });

    test('deve lançar um erro se tentar atualizar um pedido que não existe', async () => {
        const mockQuery = db.promise().query;
        mockQuery.mockResolvedValueOnce([{ affectedRows: 0 }]); // Simula que nenhum pedido foi encontrado

        await expect(Pedido.update(999, { statusPedido: 'Concluído' })).rejects.toThrow("Pedido não encontrado");
    });
});