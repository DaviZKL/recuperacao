import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { Link   } from 'react-router-dom';
import Logo from '../Logo';
import { LogoLink } from '../Header';

const FooterContainer = styled.footer`
    background-color: #343A40;
    color: #FFFFFF;
    padding: 10px 20px;
    text-align: left;
`;

const FooterItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const AppInfo = styled.div`
    flex: 1;
    min-width: 200px;

    .app-name {
        font-size: 24px;
        font-weight: bold;

        .app-initial {
            color: #007BFF;
        }
    }
`;

const Section = styled.div`
    flex: 1;
    min-width: 200px;
`;

const FooterTitle = styled.h4`
    font-size: 25px;
    margin-bottom: 10px;
    color: #007BFF;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 5px;

    a {
        color: #FFFFFF;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #6C757D;
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #343A40;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #6C757D;
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #343A40;
    height: 100px;
    resize: none;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #28A745;
    color: #FFFFFF;
    cursor: pointer;
    
    &:hover {
        background-color: #218838;
    }
`;

const CopyrightContainer = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const Footer = () => {
    const [emailStatus, setEmailStatus] = useState('Nos mande um email');
    const [emailError, setEmailError] = useState('');

    const validEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

    const isValidEmail = (email) => {
        const atIndex = email.indexOf('@');
        if (atIndex === -1) {
            return false;
        }
        const domain = email.substring(atIndex + 1);
        return validEmailProviders.includes(domain);
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const email = e.target.reply_to.value;
        if (!isValidEmail(email)) {
            setEmailError('Por favor, insira um email válido de um provedor aceito.');
            return;
        }

        emailjs.sendForm('service_pb3bur7', 'template_7fmmvuf', e.target, 'Q3CSEkP-7LnF1pweV')
            .then((result) => {
                console.log(result.text);
                setEmailStatus('Email enviado com sucesso');
                setEmailError('');
                setTimeout(() => setEmailStatus('Nos mande um email'), 5000);
            }, (error) => {
                console.log(error.text);
                setEmailStatus('Email falhou ao ser enviado');
                setTimeout(() => setEmailStatus('Nos mande um email'), 5000);
            });
    };

    return (
        <FooterContainer>
            <FooterItemContainer>
                <AppInfo>
                    <LogoLink to="/">
                        <Logo/>
                    </LogoLink>    
                </AppInfo>
                <Section>
                    <FooterTitle>Páginas do site</FooterTitle>
                    <List>
                        <ListItem><Link to="/PERFIL">Perfil</Link></ListItem>
                        <ListItem><Link to="/LOGIN">Login</Link></ListItem>
                        <ListItem><Link to="/CURSOS">Cursos</Link></ListItem>
                        <ListItem><Link to="/CURSOS ABERTOS">Cursos abertos</Link></ListItem>
                    </List>
                </Section>
                <Section>
                    <FooterTitle>{emailStatus}</FooterTitle>
                    <Form onSubmit={sendEmail}>
                        <Input type="text" name="from_name" placeholder="Nome" required />
                        <Input type="email" name="reply_to" placeholder='Email' required />
                        {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                        <Input type='text' name="assunto_message" placeholder='assundo da mensagem'/>
                        <Textarea name="message" placeholder='Message...' required></Textarea>
                        <Button type="submit">enviar email</Button>
                    </Form>
                </Section>
            </FooterItemContainer>
            <CopyrightContainer>
                Copyright &copy; 2024 | Gov.br
            </CopyrightContainer>
        </FooterContainer>
    );
};

export default Footer;
