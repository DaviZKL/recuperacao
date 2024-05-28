import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(90deg, #007BFF 35%, #343A40 165%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #6C757D;
  border-radius: 10px;
  background-color: #FFFFFF;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #343A40;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #6C757D;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SwitchText = styled.p`
  margin-top: 15px;
  color: #343A40;

  a {
    color: #28A745;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Message = styled.p`
  color: green;
  margin-bottom: 15px;
`;

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleRegister = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username || user.email === email || user.cpf === cpf);

    if (userExists) {
      alert('Usuário já existe!');
    } else {
      users.push({ fullName, username, cpf, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Usuário registrado com sucesso!');
      setTimeout(() => {
        setMessage('');
        setIsRegister(false);
      }, 2000);
    }
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => (user.username === username || user.email === username || user.cpf === username) && user.password === password);

    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      alert('Login bem-sucedido!');
      navigate('/');
    } else {
      alert('Nome de usuário, CPF, e-mail ou senha incorretos!');
    }
  };

  return (
    <AppContainer>
      <h2>{isRegister ? 'Registro' : 'Login'}</h2>
      {message && <Message>{message}</Message>}
      <FormContainer onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <FormGroup>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
          </>
        )}
        <FormGroup>
          <Label htmlFor="username">{isRegister ? 'Nome de Usuário' : 'Nome de Usuário, CPF ou E-mail'}</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">{isRegister ? 'Registrar' : 'Entrar'}</Button>
        <SwitchText>
          {isRegister ? (
            <span>Já tem uma conta? <a onClick={() => setIsRegister(false)}>Faça login</a></span>
          ) : (
            <span>Não tem uma conta? <a onClick={() => setIsRegister(true)}>Registre-se</a></span>
          )}
        </SwitchText>
      </FormContainer>
    </AppContainer>
  );
};

export default Login;
