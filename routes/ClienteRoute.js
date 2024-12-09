const express = require('express');
const Cliente = require('../model/Cliente');
const router = express.Router();

// CRIA CLIENTE
router.post('/clientes', async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body;
    try {
        const cliente = await Cliente.create(nome, email, senha, cpf, telefone);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// BUSCA CLIENTE POR CAMPO
router.get('/clientes/:field/:value', async (req, res) => {
    const { field, value } = req.params;

    // Valida se o campo é permitido
    const allowedFields = ['email', 'cpf', 'id'];
    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Campo inválido. Use email, cpf ou id.' });
    }

    try {
        const cliente = await Cliente.findByField(field, value);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ATUALIZA CLIENTE
router.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, cpf, telefone } = req.body;
    try {
        const clienteAtualizado = await Cliente.update(id, nome, email, senha, cpf, telefone);
        res.json(clienteAtualizado);
    } catch (error) {
        if (error.message === 'Cliente não encontrado.') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
});

// DELETA CLIENTE
router.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Cliente.delete(id); // Chama o método de exclusão do modelo
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(204).send(); // Retorna 204 se a exclusão foi bem-sucedida
    } catch (error) {
        res.status(400).json({ message: error.message }); // Retorna 400 em caso de erro
    }
});

module.exports = router;