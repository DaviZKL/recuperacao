import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './rotas/Home';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './componentes/Header'
import Footer from './componentes/rodaPe';
import Perfil from './rotas/Perfil';
import Abertos from './rotas/Abertos';
import Geral from './rotas/Gerais';
import { Curso } from './rotas/Curso';
import Login from './rotas/Login';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;    
  }


`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/LOGIN" element={<Login/>} />
          <Route path="/PERFIL" element={<Perfil/>} />
          <Route path="/CURSOS ABERTOS" element={<Abertos/>} />
          <Route path="/CURSOS" element={<Geral/>} />
          <Route path="/CURSO/:id" element={<Curso/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
