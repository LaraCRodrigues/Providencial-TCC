const crypto = require("crypto");

// GERA SENHAS RANDÔMICAS CRYPTO
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);