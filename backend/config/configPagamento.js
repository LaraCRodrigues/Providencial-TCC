const mercadopago = require('mercadopago');

// Configura as credenciais da sua aplicação
mercadopago.configure({
    sandbox: true, // Utilize o ambiente sandbox para testes
    access_token: 'TEST-5881059652179286-110514-14c1afd36d1c9a03505a256ec32638e8-2080107502'
});