const express = require('express');
const db = require('../config/Db');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const carrinhos = {}; // { idCliente: [ { idProduto, quantidade } ] }

// Função para adicionar produto ao carrinho
const adicionarProdutoAoCarrinho = (idCliente, idProduto, quantidade) => {
    if (!carrinhos[idCliente]) {
        carrinhos[idCliente] = [];
    }

    const produtoExistente = carrinhos[idCliente].find(item => item.idProduto === idProduto);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinhos[idCliente].push({ idProduto, quantidade });
    }

    return carrinhos[idCliente];
};

// Adicionar produto ao carrinho
router.post('/carrinho/adicionar', async (req, res) => {
    const { idCliente, idProduto, quantidade } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM PRODUTO WHERE idProduto = ?', [idProduto]);
        if (results.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });

        const carrinhoAtualizado = adicionarProdutoAoCarrinho(idCliente, idProduto, quantidade);
        res.json({ message: 'Produto adicionado ao carrinho com sucesso', carrinho: carrinhoAtualizado });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao verificar produto' });
    }
});

// Finalizar compra
router.post('/carrinho/finalizar', async (req, res) => {
    const { idCliente, produtos, formaPagamento, cep } = req.body;

    const valorTotal = produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    const pedidoData = {
        idClientePedido: idCliente,
        dataPedido: new Date(),
        statusPedido: 'pendente',
        formaPagamento,
        valorTotal
    };

    try {
        const [result] = await db.query('INSERT INTO PEDIDO SET ?', pedidoData);
        const idPedido = result.insertId;

        const itensPedidos = produtos.map(produto => [
            idPedido,
            produto.idProduto,
            produto.quantidade,
            produto.preco,
            produto.preco * produto.quantidade
        ]);

        await db.query('INSERT INTO ITENS_PEDIDOS (idPedido, idProduto, quantidade, valorUnitario, valorTotal) VALUES ?', [itensPedidos]);

        const pagamentoResponse = await axios.post('https://api.mercadopago.com/v1/payments', {
            idPedido,
            valorTotal,
            formaPagamento
        });

        const freteResponse = await axios.post('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', {
            cep,
            valorTotal
        });

        res.json({
            message: 'Pedido finalizado com sucesso',
            pedidoId: idPedido,
            pagamento: pagamentoResponse.data,
            frete: freteResponse.data
        });
    } catch (err) {
        if (err.response) {
            // Erro específico de resposta da API
            return res.status(err.response.status).json({ error: err.response.data });
        }
        res.status(500).json({ error: 'Erro ao finalizar pedido' });
    }
});

module.exports = router; // Exporte o roteador para uso em outro lugar