const db = require("../config/Db");

// CRIAÇÃO DO OBJETO PAGAMENTO
const Pagamento = {
    create: async (nome, dataPagamento, valorPago, statusPagamento, formaPagamento) => {
        // Construir a query de inserção
        const sql = "INSERT INTO PAGAMENTO (nome, dataPagamento, valorPago, statusPagamento, formaPagamento) VALUES (?, ?, ?, ?, ?)";
        
        // Executar a query de inserção
        return new Promise((resolve, reject) => {
            db.query(sql, [nome, dataPagamento, valorPago, statusPagamento, formaPagamento], (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId); // Retorna o ID do pagamento inserido
            });
        });
    },

    findById: async (idPagamento) => {
        const sql = "SELECT * FROM PAGAMENTO WHERE idPagamento = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [idPagamento], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });
    },

    delete: async (idPagamento) => {
        const query = 'DELETE FROM PAGAMENTO WHERE idPagamento = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [idPagamento], (error, results) => {
                if (error) return reject(error);
                if (results.affectedRows === 0) return reject(new Error("PAGAMENTO não encontrado!"));
                resolve();
            });
        });
    },

    getAll: async () => {
        const query = 'SELECT * FROM PAGAMENTO';
        return new Promise((resolve, reject) => {
            db.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
};

module.exports = Pagamento;
