import styled from "styled-components";
import { useEffect, useState } from 'react';
import { Titulo } from "../Titulo";
import { getCursos } from '../../servicos/cursos';
import { useNavigate } from 'react-router-dom';
import imagens from "../imagens/imagem";

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF; /* Branco */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin: 0 10px 20px;
    padding: 25px 20px;
    max-width: calc(30% - 20px);
    flex-basis: calc(30% - 20px);
`;

const Descricao = styled.p`
    max-width: 300px;
    color: #6C757D; /* Cinza Médio */
`;

const Subtitulo = styled.h4`
    color: #007BFF; /* Azul Elétrico */
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0;
    width: 100%;
    word-wrap: break-word; 
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Informacoes = styled.div`
    flex-grow: 1;
    max-width: 200px;
`;

const Image = styled.img`
    width: 170px;
    height: 200px;
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #28A745; /* Verde Limão */
    color: #FFFFFF; /* Branco */
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #1E7A36; /* Verde Limão escurecido */
    }
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: auto; 
`;

const ContentRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start; 
    flex-grow: 0; 
`;

function CardRecomenda() {
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        fetchCursos()
    }, [])

    async function fetchCursos() {
        const cursosDaAPI = await getCursos();
        const cursosMaisFeitos = cursosDaAPI.filter(curso => curso.maisFeito === true);
        setCursos(cursosMaisFeitos);
    }

    const navigate = useNavigate();

    const handleCourseClick = (id) => {
        navigate(`/curso/${id}`);
    };

    return (
        <CardContainer>
            {cursos.length !== 0 && cursos.map(curso => (
                <Card key={curso.id}>
                    <ContentRow>
                        <Informacoes>
                            <Titulo>{curso.nome}</Titulo>
                            <Subtitulo>{curso.subtitulo}</Subtitulo>
                            <Descricao>{curso.descricao}</Descricao>
                        </Informacoes>
                        <ImageContainer>
                            <Image  src={imagens[curso.id]} alt={curso.titulo} />
                            <Button key={curso.id} onClick={() => handleCourseClick(curso.id)}>Saiba mais</Button>
                        </ImageContainer>
                    </ContentRow>
                </Card>
            ))}
        </CardContainer>
    );
}

export default CardRecomenda;
