const request = require('supertest');
const express = require('express');
const db = require('../config/Db');
const Categoria = require('../model/Categoria');
const categoriaRoutes = require('../routes/CategoriaRoute');

jest.mock('../config/Db');

const app = express();
app.use(express.json());
app.use('/api', categoriaRoutes);

// SEÇÃO DE TESTE DO MODELO CATEGORIA
describe('Testes do Modelo Categoria', () => {
    afterEach(() => jest.clearAllMocks());

    test('Deve criar uma nova categoria', async () => {
        db.query.mockResolvedValue({ insertId: 1 });
        const categoria = await Categoria.create('Teste', 'Descrição do teste');
        expect(categoria).toHaveProperty('insertId', 1);
        expect(categoria.message).toMatch(/O ID da categoria Teste é:/);
    });

    test('Deve encontrar uma categoria pelo ID', async () => {
        db.query.mockResolvedValue([{ idCategoria: 1, nome: 'Teste 2', descricao: 'Descrição do teste 2' }]);
        const categoria = await Categoria.findById(1);
        expect(categoria).toMatchObject({ idCategoria: 1, nome: 'Teste 2' });
    });

    test('Deve retornar null para categoria não encontrada', async () => {
        db.query.mockResolvedValue([]);
        const categoria = await Categoria.findById(9999);
        expect(categoria).toBeNull();
    });

    test('Deve obter todas as categorias', async () => {
        db.query.mockResolvedValue([{ idCategoria: 1, nome: 'Teste 1' }, { idCategoria: 2, nome: 'Teste 2' }]);
        const categorias = await Categoria.getAll();
        expect(categorias).toHaveLength(2);
        expect(categorias).toEqual(expect.arrayContaining([{ idCategoria: 1, nome: 'Teste 1' }, { idCategoria: 2, nome: 'Teste 2' }]));
    });

    test('Deve atualizar uma categoria existente', async () => {
        db.query.mockResolvedValue({ affectedRows: 1 });
        const categoriaAtualizada = await Categoria.update(1, 'Teste Atualizado', 'Descrição Atualizada');
        expect(categoriaAtualizada).toHaveProperty('affectedRows', 1);
    });

    test('Deve lançar erro ao tentar atualizar uma categoria inexistente', async () => {
        db.query.mockResolvedValue({ affectedRows: 0 });
        await expect(Categoria.update(9999, 'Teste', 'Descrição')).rejects.toThrow("Categoria não encontrada!");
    });

    test('Deve deletar uma categoria pelo ID', async () => {
        db.query.mockResolvedValue({ affectedRows: 1 });
        await Categoria.delete(1);
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE'), [1]);
    });

    test('Deve lançar erro ao tentar deletar uma categoria inexistente', async () => {
        db.query.mockResolvedValue({ affectedRows: 0 });
        await expect(Categoria.delete(9999)).rejects.toThrow("Categoria não encontrada!");
    });
});

// SEÇÃO DE TESTE DAS ROTAS CATEGORIA
describe('Testes das Rotas Categoria', () => {
    afterEach(() => jest.clearAllMocks());

    test('Deve criar uma nova categoria', async () => {
        db.query.mockResolvedValue({ insertId: 1, message: 'O ID da categoria Teste é: 1' });
        const response = await request(app).post('/api/categorias').send({ nome: 'Teste', descricao: 'Descrição do teste' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('insertId', 1);
        expect(response.body.message).toMatch(/O ID da categoria Teste é:/);
    });

    test('Deve buscar uma categoria pelo ID', async () => {
        db.query.mockResolvedValue([{ idCategoria: 1, nome: 'Teste 2', descricao: 'Descrição do teste 2' }]);
        const response = await request(app).get('/api/categorias/1');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ idCategoria: 1, nome: 'Teste 2' });
    });

    test('Deve retornar 404 para categoria não encontrada', async () => {
        db.query.mockResolvedValue([]);
        const response = await request(app).get('/api/categorias/9999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Categoria não encontrada!');
    });

    test('Deve listar todas as categorias', async () => {
        db.query.mockResolvedValue([{ idCategoria: 1, nome: 'Teste 1' }, { idCategoria: 2, nome: 'Teste 2' }]);
        const response = await request(app).get('/api/categorias');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body).toEqual(expect.arrayContaining([{ idCategoria: 1, nome: 'Teste 1' }, { idCategoria: 2, nome: 'Teste 2' }]));
    });

    test('Deve atualizar uma categoria existente', async () => {
        db.query.mockResolvedValue({ affectedRows: 1 });
        const response = await request(app).put('/api/categorias/1').send({ nome: 'Teste Atualizado', descricao: 'Descrição Atualizada' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('affectedRows', 1);
    });

    test('Deve lançar erro ao tentar deletar uma categoria inexistente', async () => {
        db.query.mockResolvedValue({ affectedRows: 0 }); // Simule que a categoria não foi encontrada
    
        await expect(Categoria.delete(9999)).rejects.toThrow("Categoria não encontrada!");
    });

    test('Deve deletar uma categoria pelo ID', async () => {
        db.query.mockResolvedValue({ affectedRows: 1 });
        const response = await request(app).delete('/api/categorias/1');
        expect(response.status).toBe(204);
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE'), [1]);
    });
    
    test('Deve retornar 404 ao tentar deletar uma categoria inexistente', async () => {
        db.query.mockResolvedValue({ affectedRows: 0 }); // Mock do retorno para categoria não encontrada
        const response = await request(app).delete('/api/categorias/9999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Categoria não encontrada!'); 
    });
});