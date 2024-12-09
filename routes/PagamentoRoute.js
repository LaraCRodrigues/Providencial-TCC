const express = require('express');
const Pagamento = require('../model/Pagamento'); 
const router = express.Router();

// Rota para criar um novo pagamento
router.post('/pagamentos', async (req, res) => {
    const { nome, data_pagamento, valor_pago, statusPedido, forma_pagamento } = req.body;
    try {
        // Chama a função create e aguarda a inserção do pagamento
        const idPagamento = await Pagamento.create(nome, data_pagamento, valor_pago, statusPedido, forma_pagamento);
        res.status(201).json({ message: 'Pagamento criado com sucesso!', idPagamento });
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
});

// Rota para buscar um pagamento pelo ID
router.get('/pagamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pagamento = await Pagamento.findById(id);
        if (!pagamento) {
            return res.status(404).json({ message: 'Pagamento não encontrado!' });
        }
        res.json(pagamento);
    } catch (error) {
        console.error('Erro ao buscar pagamento:', error);
        res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
});

// Rota para deletar um pagamento pelo ID
router.delete('/pagamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Pagamento.delete(id);
        res.status(204).send(); // Envia uma resposta sem conteúdo
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
});

// Rota para listar todos os pagamentos
router.get('/pagamentos', async (req, res) => {
    try {
        const pagamentos = await Pagamento.getAll();
        res.json(pagamentos);
    } catch (error) {
        console.error('Erro ao listar pagamentos:', error);
        res.status(500).json({ error: 'Erro ao listar pagamentos' });
    }
});

module.exports = router;