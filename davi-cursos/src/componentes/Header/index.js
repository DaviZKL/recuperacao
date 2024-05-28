import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader';

const HeaderContainer = styled.header`
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #6C757D;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

function Header() {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <OpcoesHeader />
      <IconesHeader />
    </HeaderContainer>
  );
}

export default Header;
