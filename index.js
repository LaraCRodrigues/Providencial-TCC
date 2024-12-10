const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Importação das rotas
const clientRoutes = require('./routes/ClienteRoute'); 
const funcionarioRoutes = require('./routes/FuncionarioRoute'); 
const produtoRoutes = require('./routes/ProdutoRoute'); 
const pagamentoRoutes = require('./routes/PagamentoRoute'); 
const categoriaRoutes = require('./routes/CategoriaRoute'); 

// Definição das rotas
app.use('/clientes', clientRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/categorias', categoriaRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.name === 'ValidationError' ? 400 : 500;
    const message = err.name === 'ValidationError' ? 'Dados inválidos!' : 'Algo deu errado!';
    res.status(status).json({ error: message });
});

app.use(cors({
    origin: '*', // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server Link: http://localhost:${PORT}`);
});