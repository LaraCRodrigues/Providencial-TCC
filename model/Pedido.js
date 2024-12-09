const db = require("../config/Db");

const Pedido = {
    create: async (cpf,dataPedido) => {
        try {
            // Buscar o ID do cliente
            const [rowsCliente] = await db.promise().query("SELECT idCliente FROM CLIENTE WHERE cpf = ?", [cpf]);
            if (rowsCliente.length === 0) {
                throw new Error("Cliente não encontrado");
            }
            const idClientePedido = rowsCliente[0].idCliente;

            // CRIANDO UM NOVO PEDIDO
            const sql = "INSERT INTO PEDIDO (idClientePedido,dataPedido) VALUES (?,NOW())";
            const [result] = await db.promise().query(sql, [idClientePedido,dataPedido]);

            return { message: `O ID do Pedido é: ${result.insertId}`, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao criar Pedido:", error);
            throw error;
        }
    },
    

    findById: async (id) => {
        try {
            const [result] = await db.promise().query("SELECT * FROM PEDIDO WHERE idPedido = ?", [id]); 
            return result.length ? result[0] : null; 
        } catch (error) {
            console.error("Erro ao buscar Pedido:", error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.promise().query("SELECT * FROM PEDIDO");
            return results;
        } catch (error) {
            console.error("Erro ao buscar todos os Pedidos:", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const sql = "DELETE FROM PEDIDO WHERE idPedido = ?";
            const [result] = await db.promise().query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error("Pedido não encontrado");
            }
        } catch (error) {
            console.error("Erro ao deletar Pedido:", error);
            throw error;
        }
    },
    update: async (id, updatedFields) => {
        // Verifica se o pedido existe
        const [pedido] = await db.query("SELECT * FROM PEDIDO WHERE idPedido = ?", [id]);
        if (pedido.length === 0) {
            throw new Error("Pedido não encontrado");
        }
    
        // Campos permitidos para atualização
        const camposPermitidos = ['statusPedido', 'formaPagamento', 'valorTotal']; // Adicione os campos que podem ser atualizados
        // Filtra os campos que estão em updatedFields e que estão na lista de camposPermitidos
        const camposParaAtualizar = Object.keys(updatedFields)
            .filter(field => camposPermitidos.includes(field))
            .reduce((obj, key) => {
                obj[key] = updatedFields[key];
                return obj;
            }, {});
    
        // Se não houver campos para atualizar, lance um erro ou retorne
        if (Object.keys(camposParaAtualizar).length === 0) {
            throw new Error("Nenhum campo válido para atualizar");
        }
    
        // Monta a query de atualização
        const camposAlterados = Object.keys(camposParaAtualizar)
            .map(field => `${field} = ?`)
            .join(', ');
        const sql = `UPDATE PEDIDO SET ${camposAlterados} WHERE idPedido = ?`;
        const values = [...Object.values(camposParaAtualizar), id];
    
        // Executa a query
        const [result] = await db.query(sql, values);
        if (result.affectedRows === 0) {
            throw new Error("Erro ao atualizar o pedido");
        }
    
        return result; // Retorna o resultado da atualização
    }
};

module.exports = Pedido;