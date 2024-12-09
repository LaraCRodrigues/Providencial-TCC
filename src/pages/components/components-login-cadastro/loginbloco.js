import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components-login-cadastro/login.css';

function BlocoLogin() {
  const [emailOuCpf, setEmailOuCpf] = useState(''); 
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navegarparapg = useNavigate(); // Hook para navegação

  const validarCpf = (cpf) => {
    return /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(cpf);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOuCpf || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha === 'senha123') {
      navegarparapg('/gerenP'); 
    } else {
      setErro('Senha incorreta. Tente novamente.');
    }

    setEmailOuCpf('');
    setSenha('');
    setErro('');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-btn">
          Entrar
        </button>
      </form>
      <p>
        Não tem uma conta? <a h className='link-cadas' href="/cadastrar">Cadastre-se</a>
      </p>
    </div>
  );
}

export default BlocoLogin;
