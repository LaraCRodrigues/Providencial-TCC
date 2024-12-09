// JÁ TESTADO E FUNCIONANDO CORRETAMENTE (TESTE UNITÁRIO)

const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const PagamentoRoute = require('../routes/PagamentoRoute');
const Pagamento = require('../model/Pagamento');
const db = require("../config/Db");

const app = express();
app.use(bodyParser.json());
app.use(PagamentoRoute);

jest.mock('../model/Pagamento'); // Simulação do modelo Pagamento

describe('Teste das rotas de Pagamento', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um novo pagamento com sucesso', async () => {
        const mockId = 1;
        Pagamento.create.mockResolvedValue(mockId); // Simula um sucesso na criação

        const response = await request(app)
            .post('/pagamentos')
            .send({ nome: 'Cliente Teste', data_pagamento: new Date(), valor_pago: 100, statusPedido: 'PAGO', forma_pagamento: 'CARTÃO' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Pagamento criado com sucesso!', idPagamento: mockId });
    });

    it('deve retornar erro ao tentar criar um pagamento', async () => {
        Pagamento.create.mockRejectedValue(new Error('Erro ao criar pagamento')); // Simula um erro na criação

        const response = await request(app)
            .post('/pagamentos')
            .send({ nome: 'Cliente Teste', data_pagamento: new Date(), valor_pago: 100, statusPedido: 'PAGO', forma_pagamento: 'CARTÃO' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Erro ao criar pagamento' });
    });

    it('deve buscar um pagamento pelo ID com sucesso', async () => {
        const mockPagamento = { idPagamento: 1, nome: 'Cliente Teste' };
        Pagamento.findById.mockResolvedValue(mockPagamento); // Simula um pagamento encontrado

        const response = await request(app)
            .get('/pagamentos/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPagamento);
    });

    it('deve retornar erro 404 ao buscar um pagamento que não existe', async () => {
        Pagamento.findById.mockResolvedValue(null); // Simula que nenhum pagamento foi encontrado

        const response = await request(app)
            .get('/pagamentos/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Pagamento não encontrado!' });
    });

    it('deve deletar um pagamento com sucesso', async () => {
        Pagamento.delete.mockResolvedValue(); // Simula sucesso na deleção

        const response = await request(app)
            .delete('/pagamentos/1');

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });

    it('deve retornar erro ao tentar deletar um pagamento que não existe', async () => {
        Pagamento.delete.mockRejectedValue(new Error('PAGAMENTO não encontrada!')); // Simula erro ao deletar

        const response = await request(app)
            .delete('/pagamentos/999');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Erro ao deletar pagamento' });
    });

    it('deve listar todos os pagamentos com sucesso', async () => {
        const mockPagamentos = [{ idPagamento: 1, nome: 'Cliente Teste' }];
        Pagamento.getAll.mockResolvedValue(mockPagamentos); // Simula a listagem de pagamentos

        const response = await request(app)
            .get('/pagamentos');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPagamentos);
    });

    it('deve retornar erro ao listar pagamentos', async () => {
        Pagamento.getAll.mockRejectedValue(new Error('Erro ao listar pagamentos')); // Simula erro na listagem

        const response = await request(app)
            .get('/pagamentos');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Erro ao listar pagamentos' });
    });
});