const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require("../config/Db");

const router = express.Router();
router.use(cors());
router.use(cors({ origin: "http://localhost:3000" }));


// Rota para calcular o frete
router.post('/calcular-frete', async (req, res) => {
  const { cepOrigem, cepDestino, peso, dimensoes } = req.body;

  try {
    const response = await axios.post('https://api.melhorenvio.com.br/v2/fretes', {
      from: {
        postal_code: cepOrigem,
      },
      to: {
        postal_code: cepDestino,
      },
      products: [
        {
          weight: peso,
          dimensions: dimensoes,
        },
      ],
    }, {
      headers: {
        Authorization: 'Bearer SEU_ACCESS_TOKEN_DO_MELHOR_ENVIO',
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    res.status(500).json({ success: false, message: 'Erro ao calcular frete' });
  }
});

// Rota para processar o pagamento
router.post('/processar-pagamento', async (req, res) => {
  const { produtos, metodoPagamento } = req.body;

  try {
    // Aqui você pode integrar com a API do Mercado Pago
    const response = await axios.post('https://api.mercadopago.com/v1/payments', {
      items: produtos.map(produto => ({
        title: produto.nome,
        quantity: produto.quantidade,
        currency_id: 'BRL',
        unit_price: produto.preco,
      })),
      payment_method_id: metodoPagamento,
      // Adicione outros parâmetros necessários para a API do Mercado Pago
    }, {
      headers: {
        Authorization: `Bearer TEST-5881059652179286-110514-14c1afd36d1c9a03505a256ec32638e8-2080107502`,
      },
    });

    // Supondo que a resposta da API contenha informações sobre o pagamento
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao processar pagamento' });
  }
});

module.exports = router;