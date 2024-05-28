import logo from '../../imagens/logo.png'
import styled from 'styled-components'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
`

const LogoEscrita = styled.h4`
    text-decoration: none;
    color: #007BFF;
`

const LogoImage = styled.img`
    margin-right: 10px;
    width: 100px;
    height: 100px;
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage
                src={logo}
                alt='logo' 
            />
            <LogoEscrita>POP-eficiente</LogoEscrita>
       </LogoContainer>
    )
}

export default Logo