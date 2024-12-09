const express = require('express');
const Categoria = require('../model/Categoria');
const router = express.Router();

// Validação de dados
const validateCategoria = (nome, descricao) => {
    if (!nome || !descricao) throw new Error('Nome e descrição são obrigatórios.');
};

// Resposta padrão para erros
const handleError = (res, error) => {
    const status = error.message === 'Categoria não encontrada!' ? 404 : 400;
    res.status(status).json({ message: error.message }); // Usando 'message' para consistência
};

// CRIAR NOVA CATEGORIA
router.post('/categorias', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        validateCategoria(nome, descricao);
        const novaCategoria = await Categoria.create(nome, descricao);
        res.status(201).json(novaCategoria);
    } catch (error) {
        handleError(res, error);
    }
});

// BUSCAR CATEGORIA POR ID
router.get('/categorias/:idCategoria', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.idCategoria);
        if (!categoria) throw new Error('Categoria não encontrada!');
        res.json(categoria);
    } catch (error) {
        handleError(res, error);
    }
});

// LISTAR AS CATEGORIAS
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.getAll();
        res.json(categorias);
    } catch (error) {
        handleError(res, error);
    }
});

// ATUALIZAR CATEGORIA POR ID
router.put('/categorias/:idCategoria', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        validateCategoria(nome, descricao);
        const categoriaAtualizada = await Categoria.update(req.params.idCategoria, nome, descricao);
        if (!categoriaAtualizada || categoriaAtualizada.affectedRows === 0) throw new Error('Categoria não encontrada!');
        res.status(200).json({ message: 'Categoria atualizada com sucesso!', affectedRows: categoriaAtualizada.affectedRows });
    } catch (error) {
        handleError(res, error);
    }
});

// DELETAR CATEGORIA POR ID
router.delete('/categorias/:idCategoria', async (req, res) => {
    const idCategoria = parseInt(req.params.idCategoria, 10);

    try {
        const resultado = await Categoria.delete(idCategoria);
        res.status(204).send();
    } catch (error) {
        if (error.message === "Categoria não encontrada!") {
            return res.status(404).json({ message: 'Categoria não encontrada!' });
        }
        res.status(400).json({ message: 'Erro ao deletar categoria: ' + error.message });
    }
});

module.exports = router;