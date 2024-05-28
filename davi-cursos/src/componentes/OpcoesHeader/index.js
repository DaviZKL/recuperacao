import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcao = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
  min-width: 120px;
  background-color: #007BFF;
  color: #FFFFFF;
  border-radius: 5px;
  margin: 0 5px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Texto = styled.p`
  text-decoration: none;
  outline: none;
  color: inherit;
  margin: 0;
`;

const Opcoes = styled.ul`
  display: flex;
  list-style: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function OpcoesHeader() {
  const textoOpcoes = ['CURSOS ABERTOS', 'CURSOS'];

  return (
    <Opcoes>
      {textoOpcoes.map((texto) => (
        <StyledLink to={`/${texto.toLowerCase()}`} key={texto}>
          <Opcao>
            <Texto>{texto}</Texto>
          </Opcao>
        </StyledLink>
      ))}
    </Opcoes>
  );
}

export default OpcoesHeader;
