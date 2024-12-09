const express = require('express');
const db = require('../config/Db');
const axios = require('axios');
const mercadopago = require('../config/configPagamento');
require('dotenv').config();

const router = express.Router(); // Corrigido para usar Router do Express



// Rota para adicionar um produto ao carrinho
router.post('/carrinho', async (req, res) => {
    const { idPedido, idProduto, quantidade, valorUnitario } = req.body;

    try {
        const result = await Carrinho.create(idPedido, idProduto, quantidade, valorUnitario);
        res.status(201).json({ message: 'Produto adicionado ao carrinho', result });
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' });
    }
});

// Rota para calcular o frete
router.post('/calcular-frete', async (req, res) => {
    const { cep } = req.body;

    try {
        const response = await axios.get(`https://api.example.com/calculate?cep=${cep}`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao calcular o frete:', error);
        res.status(500).json({ error: 'Erro ao calcular o frete' });
    }
});

// Rota para realizar o checkout
router.post('/checkout', async (req, res) => {
    const { produtos, usuario, formaPagamento } = req.body;

    try {
        // Calcular o total do pedido
        let total = 0;
        for (const item of produtos) {
            const [produto] = await db.promise().query("SELECT preco FROM PRODUTO WHERE idProduto = ?", [item.produtoId]);
            if (produto.length === 0) {
                return res.status(404).json({ message: `Produto com ID ${item.produtoId} não encontrado` });
            }
            total += produto[0].preco * item.quantidade; // Supondo que cada produto tem um campo 'preco'
        }

        // Criar o pedido no banco de dados
        const [rowsCliente] = await db.promise().query("SELECT idCliente FROM CLIENTE WHERE cpf = ?", [usuario.cpf]);
        if (rowsCliente.length === 0) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }
        const idClientePedido = rowsCliente[0].idCliente;

        const [result] = await db.promise().query("INSERT INTO PEDIDO (idClientePedido, dataPedido) VALUES (?, NOW())", [idClientePedido]);
        const novoPedidoId = result.insertId;

        // Processar o pagamento
        const pagamentoSucesso = await processarPagamento(total, formaPagamento);
        if (!pagamentoSucesso) {
            return res.status(400).json({ message: 'Erro ao processar o pagamento' });
        }

        // Adicionar itens ao pedido
        for (const item of produtos) {
            await db.promise().query("INSERT INTO ITENS_PEDIDOS (idPedido, idProduto, quantidade, valorUnitario) VALUES (?, ?, ?, ?)", [novoPedidoId, item.produtoId, item.quantidade, item.preco]);
        }

        res.status(201).json({ message: 'Pedido realizado com sucesso', pedidoId: novoPedidoId });
    } catch (error) {
        console.error('Erro ao realizar o checkout:', error);
        res.status(500).json({ message: 'Erro ao realizar o checkout' });
    }
});

// Rota para finalizar a compra
router.post('/finalizar-compra', async (req, res) => {
    const { produtos, total } = req.body;

    const paymentData = {
        items: produtos.map(item => ({
            id: item.produtoId,
            title: item.titulo, // Supondo que você tenha um campo 'titulo' no item
            quantity: item.quantidade,
            currency_id: 'BRL',
            unit_price: item.preco,
        })),
        back_urls: {
            // Aqui é possível fazer a personalização das páginas!
            success: 'http://localhost:3000/compracerta',
            failure: 'http://localhost:3000/compraerrada',
            pending: 'http://localhost:3000/compraerrada',
        },
        auto_return: 'all',
    };

    try {
        const response = await mercadopago.preferences.create(paymentData);
        const linkPagamento = response.body.init_point;

        // Salvar dados da compra no banco de dados
        await db.promise().query('INSERT INTO ITENS_PEDIDOS (produtos, total) VALUES (?, ?)', [JSON.stringify(produtos), total]);
        res.json({ link: linkPagamento });
    } catch (error) {
        console.error('Erro ao criar preferência de pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
    }
});

// Rotas de sucesso e erro
router.get('/compracerta', (req, res) => {
    res.send('Compra realizada com sucesso!');
});

router.get('/compraerrada', (req, res) => {
    res.send('Houve um erro na compra.');
});

module.exports = router; 