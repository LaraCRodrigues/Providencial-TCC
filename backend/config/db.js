const mysql = require('mysql2');
require("dotenv").config(); // Usando as variáveis de ambiente
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
// Criando a conexão com o banco
console.log('DB_HOST:', host);  // Isso deve imprimir 'srv691.hstgr.io'
console.log('DB_USER:', user);  // Isso deve imprimir 'u817008098_claudia'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_SENHA,
  database: process.env.DB_NOME,
  waitForConnections: true, // Garante que as conexões aguardem se o pool estiver cheio
  connectionLimit: 10, // Número máximo de conexões simultâneas
  connectTimeout: 10000,
  queueLimit: 0
});


// Testando a Conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  };
  console.log('Conectado ao banco de dados com sucesso!');
  connection.release();
});

module.exports = pool;