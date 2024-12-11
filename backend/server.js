const express = require('express');
const dotenv = require('dotenv');
// Carregar variáveis de ambiente
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
// Middleware para parsing de JSON
app.use(express.json());

// Importação das rotas
/*const clientRoutes = require('./routes/ClienteRoute'); 
const funcionarioRoutes = require('./routes/FuncionarioRoute'); 

const pagamentoRoutes = require('./routes/PagamentoRoute'); 
const categoriaRoutes = require('./routes/CategoriaRoute'); */
const produtoRoutes = require('./routes/produtoRoute'); 
// Definição das rotas
/*app.use('/api/clientes', clientRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/categorias', categoriaRoutes);*/
app.use('/produtos', produtoRoutes);
// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.name === 'ValidationError' ? 400 : 500;
    const message = err.name === 'ValidationError' ? 'Dados inválidos!' : 'Algo deu errado!';
    res.status(status).json({ error: message });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server Link: http://localhost:${PORT}`);
});