const express = require('express');
const mercadopago = require('mercadopago');

const router = express.Router();

/*router.post('/checkout', async (req, res) => {
    // ... outros códigos para calcular o total, obter dados do usuário, etc.

router.post('/checkout', async (req, res) => {
  // Calcular o total
  const total = req.body.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Obter dados do usuário (exemplo usando sessão)
  const user = req.session.user;

const preference = {
    items: [
        {
            title: 'Produto 1',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 100
        }
    ],
    back_urls: {
        success: 'http://tuasite.com/success',
        failure: 'http://tuasite.com/failure',
        pending: 'http://tuasite.com/pending'
    },
    auto_return: 'approved'
};
 // Criar a transação

    mercadopago.preferences.create(preference)
        .then(function(response) {
            res.redirect(response.body.init_point);
        })
        .catch(function(error) {
            console.error(error);   

            res.status(500).send('Erro ao criar preferência');
        });
});
});*/

router.post('/criar-pix')
module.exports = router;