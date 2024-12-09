const request = require('supertest');
const express = require('express');
const db = require('../config/Db');
const clienteRoute = require('../routes/ClienteRoute');

// Inicializando o aplicativo Express
const app = express();
app.use(express.json());
app.use('/api', clienteRoute); // Definindo a rota base

// Mock do módulo de banco de dados
jest.mock('../config/Db', () => ({
    query: jest.fn(),
}));

describe('Cliente API', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa as simulações após cada teste
    });

    const clienteData = {
        nome: 'Test Cliente',
        email: 'test@example.com',
        senha: 'password123',
        cpf: '12345678901',
        telefone: '123456789',
    };

    // Função auxiliar para simular a consulta ao banco de dados
    const mockDbQuery = (condition, result) => {
        db.query.mockImplementation((query, values, callback) => {
            if (condition(query)) {
                callback(null, result);
            } else {
                callback(null, []); // Simula que não há resultados se a condição não for atendida
            }
        });
    };

    describe('POST /clientes', () => {
        it('Deve criar um novo cliente com sucesso', async () => {
            // Simula que não há clientes existentes
            mockDbQuery(
                (query) => query.includes('SELECT * FROM CLIENTE WHERE email = ?') || query.includes('SELECT * FROM CLIENTE WHERE cpf = ?'),
                [] // Nenhum cliente encontrado
            );

            // Simula a inserção bem-sucedida
            mockDbQuery(
                (query) => query.includes('INSERT INTO CLIENTE'),
                { insertId: 1 } // Simula um cliente inserido com ID 1
            );

            const response = await request(app).post('/api/clientes').send(clienteData);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ insertId: 1 });
        });

        it('Deve retornar erro se o email já estiver em uso', async () => {
            // Simula que o email já existe
            mockDbQuery(
                (query) => query.includes('SELECT * FROM CLIENTE WHERE email = ?'),
                [{ id: 1, email: clienteData.email }] // Simula que o email já está em uso
            );

            const response = await request(app).post('/api/clientes').send(clienteData);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Email já está em uso.' });
        });

        it('Deve retornar erro se o CPF já estiver em uso', async () => {
            // Simula que o CPF já existe
            mockDbQuery(
                (query) => query.includes('SELECT * FROM CLIENTE WHERE cpf = ?'),
                [{ id: 1, cpf: clienteData.cpf }] // Simula que o CPF já está em uso
            );

            const response = await request(app).post('/api/clientes').send(clienteData);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'CPF já está em uso.' });
        });
    });

    describe('GET /clientes/:field/:value', () => {
        it('Deve retornar um cliente se encontrado pelo ID', async () => {
            const cliente = { id: 1, nome: 'Test Cliente', email: 'test@example.com' };
            // Simula que o cliente foi encontrado pelo ID
            mockDbQuery((query) => query.includes('SELECT * FROM CLIENTE WHERE id = ?'), [cliente]);

            const response = await request(app).get('/api/clientes/id/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(cliente);
        });

        it('Deve retornar um cliente se encontrado pelo email', async () => {
            const cliente = { id: 1, nome: 'Test Cliente', email: 'test@example.com' };
            // Simula que o cliente foi encontrado pelo email
            mockDbQuery((query) => query.includes('SELECT * FROM CLIENTE WHERE email = ?'), [cliente]);

            const response = await request(app).get('/api/clientes/email/test@example.com');
            expect(response.status).toBe(200);
            expect(response.body).toEqual (cliente);
        });

        it('Deve retornar 404 se o cliente não for encontrado', async () => {
            // Simula que nenhum cliente foi encontrado
            mockDbQuery((query) => query.includes('SELECT * FROM CLIENTE WHERE id = ?'), []);

            const response = await request(app).get('/api/clientes/id/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Cliente não encontrado.' });
        });

        it('Deve retornar erro se o campo for inválido', async () => {
            const response = await request(app).get('/api/clientes/invalidField/value');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Campo inválido. Use email, cpf ou id.' });
        });
    });

    describe('PUT /clientes/:id', () => {
        it('Deve atualizar um cliente com sucesso', async () => {
            // Simula que o cliente foi encontrado
            mockDbQuery((query) => query.includes('SELECT * FROM CLIENTE WHERE id = ?'), [{ id: 1 }]);
            // Simula a atualização bem-sucedida
            mockDbQuery((query) => query.includes('UPDATE CLIENTE SET'), { affectedRows: 1 });

            const response = await request(app).put('/api/clientes/1').send(clienteData);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ affectedRows: 1 });
        });

        it('Deve retornar 404 se o cliente não for encontrado para atualização', async () => {
            // Simula que o cliente não foi encontrado
            mockDbQuery((query) => query.includes('SELECT * FROM CLIENTE WHERE id = ?'), []);

            const response = await request(app).put('/api/clientes/999').send(clienteData);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Cliente não encontrado.' });
        });
    });

    describe('DELETE /clientes/:id', () => {
        it('Deve deletar um cliente com sucesso', async () => {
            // Simula que o cliente foi encontrado
            mockDbQuery((query) => query.includes('DELETE FROM CLIENTE WHERE id = ?'), { affectedRows: 1 });

            const response = await request(app).delete('/api/clientes/1');
            expect(response.status).toBe(204);
        });

        it('Deve retornar 404 se o cliente não for encontrado para deleção', async () => {
            // Simula que o cliente não foi encontrado
            mockDbQuery((query) => query.includes('DELETE FROM CLIENTE WHERE id = ?'), { affectedRows: 0 });

            const response = await request(app).delete('/api/clientes/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Cliente não encontrado.' });
        });
    });
});