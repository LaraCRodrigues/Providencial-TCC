const db = require('../config/Db');

const Cliente = {
    // Cria um novo cliente após validar email e CPF
    create: async (nome, email, senha, cpf, telefone) => {
        await Cliente.validateUniqueFields(email, cpf);

        const sql = "INSERT INTO CLIENTE (nome, email, senha, cpf, telefone) VALUES (?, ?, ?, ?, ?)";
        try {
            const results = await db.query(sql, [nome, email, senha, cpf, telefone]);
            return results;
        } catch (error) {
            throw new Error(`Erro ao criar cliente: ${error.message}`);
        }
    },

    // Valida se o email e o CPF já estão em uso
    validateUniqueFields: async (email, cpf) => {
        const existingEmail = await Cliente.findByEmail(email);
        if (existingEmail) {
            throw new Error('Email já está em uso.');
        }

        const existingCpf = await Cliente.findByCpf(cpf);
        if (existingCpf) {
            throw new Error('CPF já está em uso.');
        }
    },

    // Método genérico para buscar cliente por um campo específico
    findByField: async (field, value) => {
        const sql = `SELECT * FROM CLIENTE WHERE ${field} = ?`;
        try {
            const result = await db.query(sql, [value]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error(`Erro ao buscar cliente por ${field}: ${error.message}`);
        }
    },

    update: async (id, nome, email, senha, cpf, telefone) => {
        const sql = "UPDATE CLIENTE SET nome = ?, email = ?, senha = ?, cpf = ?, telefone = ? WHERE id = ?";
        try {
            const result = await db.query(sql, [nome, email, senha, cpf, telefone, id]);
            if (result.affectedRows === 0) {
                throw new Error('Cliente não encontrado.');
            }
            return result; 
        } catch (error) {
            throw new Error(`Erro ao atualizar cliente: ${error.message}`);
        }
    },

    // Deleta um cliente pelo ID
    delete: async (id) => {
        const sql = "DELETE FROM CLIENTE WHERE id = ?";
        try {
            const result = await db.query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error('Cliente não encontrado.');
            }
            return result;
            } catch (error) {
                throw new Error(`Erro ao deletar cliente: ${error.message}`);
    }
}
};

module.exports = Cliente;