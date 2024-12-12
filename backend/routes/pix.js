const express = require('express');
const router = express.Router();
const mercadopago = require('./config');

router.post('/pix', async (req, res) => {
  const { amount, description } = req.body;

  const payment = {
    transaction_amount: amount,
    description: description,
    payment_method_id: 'pix',
    payer: {
      email: 'seuemail@example.com',
    },
  };

  try {
    const response = await mercadopago.payment.create(payment);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao gerar pagamento de PIX' });
  }
});

module.exports = router;