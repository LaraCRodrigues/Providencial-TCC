const db = require("../config/Db");

const Produto = {
    create: async (nome, descricao, idCategoria,preco) => {
        const sql = "INSERT INTO PRODUTO (nome, descricao, idCategoria,preco) VALUES (?, ?, ?,?)";
        try {
            const result = await db.query(sql, [nome, descricao, idCategoria,preco]);
            return {
                message: `O ID do Produto ${nome} é: ${result.insertId}`,
                insertId: result.insertId
            };
        } catch (error) {
            throw new Error(`Erro ao criar produto: ${error.message}`);
        }
    },

    findById: async (id) => {
        const sql = "SELECT * FROM PRODUTO WHERE id = ?";
        try {
            const result = await db.query(sql, [id]);
            return result[0] || null; 
        } catch (error) {
            throw new Error(`Erro ao buscar produto por ID: ${error.message}`);
        }
    },

    getAll: async () => {
        const sql = "SELECT * FROM PRODUTO";
        try {
            return await db.query(sql);
        } catch (error) {
            throw new Error(`Erro ao buscar todos os produtos: ${error.message}`);
        }
    },

    delete: async (id) => {
        const sql = "DELETE FROM PRODUTO WHERE id = ?";
        try {
            const result = await db.query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error("Produto não encontrado!");
            }
        } catch (error) {
            throw new Error(`Erro ao deletar produto: ${error.message}`);
        }
    }
};

module.exports = Produto;