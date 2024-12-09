const db = require("../config/Db");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const Funcionario = {
    create: async (nome, email, senha, cargo) => {
        try {
            // Senha Cripto e Adiciona um técnica de segurança na senha gerada
            const hashedPassword = await bcrypt.hash(senha, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
            const sql = "INSERT INTO FUNCIONARIO (nome, email, senha, cargo) VALUES (?, ?, ?, ?)";
            return new Promise((resolve, reject) => {
                db.query(sql, [nome, email, hashedPassword, cargo], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            throw new Error("Error na Criptografia da senha: " + error.message);
        }
    },

    findByEmail: (email) => {
        const sql = "SELECT * FROM FUNCIONARIO WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [email], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length === 0) {
                    return resolve(null); 
                }
                resolve(result[0]); 
            });
        });
    },

    verifyIdAndToken: async (id, token) => {
        try {
            const verificaID_TOKEN = jwt.verify(token, process.env.JWT_SECRET);
            if (verificaID_TOKEN.id !== id) {
                throw new Error("Token incompatível com o ID.");
            }
            // VERIFICA TAMBÉM NO BANCO DE DADOS
            const sql = "SELECT * FROM FUNCIONARIO WHERE id = ?";
            return new Promise((resolve, reject) => {
                db.query(sql, [id], (err, result) => {
                    if (err) return reject(err);
                    if (result.length === 0) return resolve(null); 
    
                    const funcionario = result[0];
    
                    // CHECA SE O FUNCIONÁRIO É UM ADMIN
                    if (funcionario.cargo.toLowerCase() === 'admin') {
                        resolve(funcionario);
                    } else {
                        return resolve({
                            message: "O usuário não é um ADMIN"
                        }); 
                    }
                });
            });
        } catch (error) {
            throw new Error("Erro na verificação do ID e Token: " + error.message);
        }
    }
};

module.exports = Funcionario;