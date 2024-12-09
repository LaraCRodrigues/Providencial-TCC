const express = require('express');
const Pedido = require('../model/Pedido'); 
const router = express.Router();

// Rota para criar um novo pedido
router.post('/pedidos', async (req, res) => {
    const { cpf, idProduto, statusPedido, formaPagamento, valorTotal } = req.body;
    try {
        // Chama a função create e aguarda a inserção do pedido
        const { insertId } = await Pedido.create(cpf, idProduto, statusPedido, formaPagamento, valorTotal);
        res.status(201).json({ message: 'Pedido criado com sucesso!', insertId });
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
});

// Rota para buscar um pedido pelo ID
router.get('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findById(id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado!' });
        }
        res.json(pedido);
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
});

// Rota para listar todos os pedidos
router.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Pedido.getAll();
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
});

// Rota para deletar um pedido pelo ID (caso queira implementar)
router.delete('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Pedido.delete(id); 
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ error: 'Erro ao deletar pedido' });
    }
});

module.exports = router;