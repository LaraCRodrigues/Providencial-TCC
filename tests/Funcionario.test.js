// JÁ TESTADO E FUNCIONANDO CORRETAMENTE (TESTE UNITÁRIO)

const Funcionario = require('../model/Funcionario'); 
const db = require('../config/Db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 // Simulção da conexão com o Banco de Dados
jest.mock('bcryptjs');

jest.mock('../config/Db', () => ({
    query: jest.fn(),
    getConnection: jest.fn(),
  }));

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
  }));

describe('Funcionario Model', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Ao finalizar, limpa as simulações 
    });

    describe('create', () => {
        it('Criar um novo funcionario e o retornar', async () => {
            const nome = 'Test Funcionario';
            const email = 'test@example.com';
            const senha = 'password123';
            const cargo = 'Developer';

            const hashedPassword = 'hashedPassword';
            bcrypt.hash.mockResolvedValue(hashedPassword); // Simula a criptografia

            db.query.mockImplementation((sql, values, callback) => {
                callback(null, { insertId: 1 }); // Simulação de Sucesso
            });

            const result = await Funcionario.create(nome, email, senha, cargo);

            expect(result).toEqual({ insertId: 1 });
            expect(bcrypt.hash).toHaveBeenCalledWith(senha, expect.any(Number));
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                [nome, email, hashedPassword, cargo],
                expect.any(Function)
            );
        });

        it('Deve enviar um error caso a criptografia falhe', async () => {
            const nome = 'Test Funcionario';
            const email = 'test@example.com';
            const senha = 'password123';
            const cargo = 'Developer';

            bcrypt.hash.mockRejectedValue(new Error('Hashing error')); // Simulação de Erro

            await expect(Funcionario.create(nome, email, senha, cargo)).rejects.toThrow('Error na Criptografia da senha: Hashing error');
        });
    });

    describe('findByEmail', () => {
        it('Caso encontrado, retorna um funcionário', async () => {
            const email = 'test@example.com';
            const funcionarioData = { id: 1, nome: 'Test Funcionario', email };

            db.query.mockImplementation((sql, values, callback) => {
                callback(null, [funcionarioData]); // Simula o retorno do funcionário encontrado
            });

            const result = await Funcionario.findByEmail(email);

            expect(result).toEqual(funcionarioData);
            expect(db.query).toHaveBeenCalledWith(expect.any(String), [email], expect.any(Function));
        });

        it('Retorna nulo se não encontrar o funcionário', async () => {
            const email = 'notfound@example.com';

            db.query.mockImplementation((sql, values, callback) => {
                callback(null, []); 
            });

            const result = await Funcionario.findByEmail(email);

            expect(result).toBeNull();
        });

        it('Retorna error se requisicao ao Banco falhar', async () => {
            const email = 'test@example.com';

            db.query.mockImplementation((sql, values, callback) => {
                callback(new Error('Database error')); 
            });

            await expect(Funcionario.findByEmail(email)).rejects.toThrow('Database error');
        });
    });

    describe('verifyIdAndToken', () => {
        it('Retorna o funcionario com ID e Token validos', async () => {
            const id = 1;
            const token = process.env.JWT_SECRET; // Token do admin
            const funcionarioData = { id, cargo: 'admin' };
    
            jwt.verify.mockReturnValue({ id }); // Simula a verificação do JWT
            db.query.mockImplementation((sql, values, callback) => {
                callback(null, [funcionarioData]);
            });
    
            const result = await Funcionario.verifyIdAndToken(id, token);
    
            expect(result).toEqual(funcionarioData);
        });
    
        it('Retorna uma mensagem caso o user nao seja adm', async () => {
            const id = 1;
            const token = process.env.JWT_SECRET; // Token do admin
            const funcionarioData = { id, cargo: 'user' };
    
            jwt.verify.mockReturnValue({ id });
            db.query.mockImplementation((sql, values, callback) => {
                callback(null, [funcionarioData]);
            });
    
            const result = await Funcionario.verifyIdAndToken(id, token);
    
            expect(result).toEqual({ message: "O usuário não é um ADMIN" });
        });
    
        it('Retorna error se a verificacao do Token falhar', async () => {
            const id = 1;
            const token = process.env.TOKEN_INVALIDO; 
    
            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });
    
            await expect(Funcionario.verifyIdAndToken(id, token)).rejects.toThrow('Erro na verificação do ID e Token: Invalid token');
        });
    });
});