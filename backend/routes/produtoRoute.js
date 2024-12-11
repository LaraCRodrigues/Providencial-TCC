const express = require("express");
const Produto = require('../model/Produto'); // Importa o modelo Produto
const cors = require('cors');
const router = express.Router();
router.use(cors());
// RETORNA TODOS OS PRODUTOS
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.getAll();
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao obter produtos:", error);
        res.status(500).json({ message: "Erro ao obter produtos!" });
    }
});

// ADICIONA UM NOVO PRODUTO
router.post('/adicionarProduto', async (req, res) => {
    const {nome, descricao, idCategoria, preco} = req.body; 

    try {
        const newProduct = await Produto.create(nome, descricao, idCategoria, preco);
        res.status(201).json({ message: "Produto adicionado com sucesso!", produto: newProduct });
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        res.status(500).json({ message: "Erro ao adicionar produto!" });
    }
});

// DELETA UM PRODUTO ATRAVÉS DO ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Produto.delete(id);
        res.json({ message: "Produto deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ message: "Erro ao deletar produto!" });
    }
});

module.exports = router;