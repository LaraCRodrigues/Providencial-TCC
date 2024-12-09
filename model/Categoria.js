const db = require('../config/Db');

const Categoria = {
    create: async (nome, descricao) => {
        const sql = "INSERT INTO CATEGORIA (nome, descricao) VALUES (?, ?)";
        try {
            const result = await db.query(sql, [nome, descricao]);
            return {
                insertId: result.insertId,
                message: `O ID da categoria ${nome} é: ${result.insertId}`
            };
        } catch (error) {
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }
    },

    findById: async (idCategoria) => {
        const sql = "SELECT * FROM CATEGORIA WHERE idCategoria = ?";
        try {
            const result = await db.query(sql, [idCategoria]);
            return result[0] || null; 
        } catch (error) {
            throw new Error(`Erro ao buscar categoria por ID: ${error.message}`);
        }
    },

    getAll: async () => {
        const sql = "SELECT * FROM CATEGORIA";
        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw new Error(`Erro ao buscar todas as categorias: ${error.message}`);
        }
    },

    update: async (idCategoria, nome, descricao) => {
        const sql = "UPDATE CATEGORIA SET nome = ?, descricao = ? WHERE idCategoria = ?";
        try {
            const result = await db.query(sql, [nome, descricao, idCategoria]);
            if (result.affectedRows === 0) {
                throw new Error("Categoria não encontrada!");
            }
            return { affectedRows: result.affectedRows };
        } catch (error) {
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    },

    delete: async (idCategoria) => {
        const sql = "DELETE FROM CATEGORIA WHERE idCategoria = ?";
        try {
            const result = await db.query(sql, [idCategoria]);
            if (result.affectedRows === 0) {
                throw new Error("Categoria não encontrada!"); 
            }
            return result; // Retornar o resultado se a deleção for bem-sucedida
        } catch (error) {
            throw new Error(`Erro ao deletar categoria: ${error.message}`);
        }
    }
};

module.exports = Categoria;