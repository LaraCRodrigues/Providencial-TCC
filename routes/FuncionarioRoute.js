const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DB = require("../config/Db.js");
const Funcionario = require('../model/Funcionario.js'); 
require('dotenv').config();

const router = express.Router(); 

// CRIA NOVO FUNCIONARIO
router.post("/register", async (req, res) => {
    const { nome, email, senha, cargo } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        await Funcionario.create(nome, email, hashedPassword, cargo);
        res.status(201).json({ message: "Funcionário criado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar funcionário!" });
    }
});

// LOGIN DO FUNCIONARIO
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const funcionario = await Funcionario.findByEmail(email);
        if (!funcionario || !(await bcrypt.compare(senha, funcionario.senha))) {
            return res.status(401).json({ message: "Erro nas Credenciais!" });
        }

        const token = jwt.sign(
            { id: funcionario.id, email: funcionario.email, cargo: funcionario.cargo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao logar funcionário!" });
    }
});

module.exports = router;