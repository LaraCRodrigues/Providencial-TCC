const express = require('express');
const dotenv = require('dotenv');
// Carregar variáveis de ambiente
dotenv.config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsing de JSON
app.use(express.json());

// Importação das rotas
const clientRoutes = require('./routes/ClienteRoute'); 
const funcionarioRoutes = require('./routes/FuncionarioRoute'); 
const produtoRoutes = require('./routes/ProdutoRoute'); 
const pagamentoRoutes = require('./routes/PagamentoRoute'); 
const categoriaRoutes = require('./routes/CategoriaRoute'); 

// Definição das rotas
app.use('/api/clientes', clientRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/categorias', categoriaRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.name === 'ValidationError' ? 400 : 500;
    const message = err.name === 'ValidationError' ? 'Dados inválidos!' : 'Algo deu errado!';
    res.status(status).json({ error: message });
});

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    ];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server Link: http://localhost:${PORT}`);
});