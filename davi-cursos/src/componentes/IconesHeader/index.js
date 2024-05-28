import perfil from '../../imagens/perfil.svg';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Icone = styled.li`
    margin-right: 40px;
    width: 25px;
    position: relative;
    img {
        width: 100%;
        height: auto;
    }
`;

const Icones = styled.ul`
    display: flex;
    align-items: center;
`;

const LoginLink = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 5px;
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    ${({ show }) => show && `
        transform: translate(30px, -50%);
        opacity: 1;
    `}
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        text-decoration: none;
        color: black;
    }
`;

const LogoutLink = styled.div`
    margin-left: 10px;
    cursor: pointer;
    color: black;
    &:hover {
        text-decoration: underline;
    }
`;

const opcoes = [
    { texto: 'PERFIL', icone: perfil }
];

function IconesHeader() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        console.log('loggedUser:', loggedUser); // Adicionando log para depuração
        if (loggedUser) {
            setLoggedIn(true);
            setUsername(loggedUser.username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        setLoggedIn(false);
        setUsername('');
        navigate('/login');
    };

    return (
        <Icones>
            {opcoes.map((opcao, index) => (
                <Icone
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <img src={opcao.icone} alt={opcao.texto} />
                    <LoginLink show={hoveredIndex === index}>
                        {loggedIn ? (
                            <>
                                <StyledLink to="/PERFIL">{username}</StyledLink>
                                <LogoutLink onClick={handleLogout}>Sair</LogoutLink>
                            </>
                        ) : (
                            <StyledLink to="/LOGIN">Login</StyledLink>
                        )}
                    </LoginLink>
                </Icone>
            ))}
        </Icones>
    );
}

export default IconesHeader;
