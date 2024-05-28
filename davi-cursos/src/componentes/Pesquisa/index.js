import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCursos } from '../../servicos/cursos';
import Input from '../Input';
import imagens from "../imagens/imagem";

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #007BFF 35%, #343A40 165%); /* Azul Elétrico */
    color: #FFFFFF; /* Branco */
    text-align: center;
    padding: 85px 0;
    min-height: 200px;
    max-height: 1050px;
    width: 100%;
`;

const Titulo = styled.h2`
    color: #FFFFFF; /* Branco */
    font-size: 36px;
    text-align: center;
    width: 100%;
`;

const Subtitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
    color: #FFFFFF; /* Branco */
`;

const ResultadosContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const Coluna = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: border-color 0.3s;
    background-color: #343A40;
    border-radius: 10px;

    p {
        width: 200px;
        color: #28A745; /* Cinza Escuro */
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid #FFFFFF; /* Branco */
    }
`;

function Pesquisa() {
    const [cursosPesquisados, setCursosPesquisados] = useState([]);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        fetchCursos();
    }, []);

    async function fetchCursos() {
        try {
            const cursosDaAPI = await getCursos();
            setCursos(cursosDaAPI);
        } catch (error) {
            console.error("Erro ao buscar cursos: ", error);
        }
    }

    const navigate = useNavigate();

    const handleCourseClick = (id) => {
        navigate(`/curso/${id}`);
    };

    const handleSearch = (evento) => {
        const textoDigitado = evento.target.value.toLowerCase();
        if (textoDigitado === "") {
            setCursosPesquisados([]);
        } else {
            const resultadoPesquisa = cursos.filter(curso => curso.nome.toLowerCase().includes(textoDigitado));
            setCursosPesquisados(resultadoPesquisa);
        }
    };

    const apareceColunas = (cursos) => {
        const colunas = [[], [], []];
        cursos.forEach((curso, index) => {
            colunas[index % 3].push(curso);
        });
        return colunas;
    };

    const colunas = apareceColunas(cursosPesquisados);

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre sua profissão e|ou seu hobbie!</Subtitulo>
            <Input
                placeholder="Encontre-se aqui!"
                onChange={handleSearch}
            />
            <ResultadosContainer>
                {colunas.map((coluna, index) => (
                    <Coluna key={index}>
                        {coluna.map(curso => (
                            <Resultado key={curso.id} onClick={() => handleCourseClick(curso.id)}>
                                <img src={imagens[curso.id]} alt={curso.nome} />
                                <p>{curso.nome}</p>
                            </Resultado>
                        ))}
                    </Coluna>
                ))}
            </ResultadosContainer>
        </PesquisaContainer>
    );
}

export default Pesquisa;
