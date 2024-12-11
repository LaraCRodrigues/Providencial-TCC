import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../components-login-cadastro/cadas.css';

function BlocoCadastro() {
  const [nome, setNome] = useState('');
  const [emailOuCpf, setEmailOuCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !emailOuCpf || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Tente novamente.');
      return;
    }

    console.log('Cadastro realizado com sucesso');
    console.log('Nome:', nome);
    console.log('Email/CPF:', emailOuCpf);
    console.log('Senha:', senha);

    navigate('/login'); 

    setNome('');
    setEmailOuCpf('');
    setSenha('');
    setConfirmarSenha('');
    setErro('');
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cliente</h2>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Digite seu nome completo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailOuCpf">Email ou CPF:</label>
          <input
            type="text"
            id="emailOuCpf"
            value={emailOuCpf}
            onChange={(e) => setEmailOuCpf(e.target.value)}
            required
            placeholder="Digite seu email ou CPF"
            pattern="(\d{3}\.\d{3}\.\d{3}-\d{2})|(\S+@\S+\.\S+)"
            title="Digite um email válido ou CPF no formato 000.000.000-00"
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            placeholder="Confirme sua senha"
          />
        </div>
        <button type="submit" className="cadastro-btn">
          Cadastrar
        </button>
      </form>
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default BlocoCadastro;
