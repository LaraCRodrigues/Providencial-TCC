const express = require("express");
//const Produto = require('../model/Produto'); // Importa o modelo Produto
const cors = require('cors');
const router = express.Router();
const db = require("../config/Db");
router.use(cors());
router.use(cors({ origin: "http://localhost:3000" }));
// RETORNA TODOS OS PRODUTOS
router.get('/getProduto', async (req, res) => {
    const query = 'SELECT * FROM PRODUTO';
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao obter produtos:", err);
            return res.status(500).json({ message: "Erro ao obter produtos!" });
        }
        res.json(results);
    });
});

// ADICIONA UM NOVO PRODUTO
router.post('/adicionarProduto', async (req, res) => {
    console.log("Rota /adicionarProduto acessada. Dados recebidos:", req.body);
    const { nome, descricao, idCategoria, preco } = req.body;

    // Valida se os dados obrigatórios foram enviados
    if (!nome || !descricao || !idCategoria || !preco) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    const query = 'INSERT INTO PRODUTO (nome, descricao, idCategoria, preco) VALUES (?, ?, ?, ?)';

    db.query(query, [nome, descricao, idCategoria, preco], (err, results) => {
        if (err) {
            console.error("Erro ao adicionar produto:", err);
            return res.status(500).json({ message: "Erro ao adicionar produto!" });
        }

        // Envia a resposta com sucesso
        res.status(201).json({
            message: "Produto adicionado com sucesso!",
            produto: { nome, descricao, idCategoria, preco, id: results.insertId }
        });
    });
});

// DELETA UM PRODUTO ATRAVÉS DO ID
router.delete('/deletarProduto/:id', async (req, res) => {
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