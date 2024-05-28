import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getCursos } from '../servicos/cursos';
import Pesquisa from '../componentes/Pesquisa';
import imagens from '../componentes/imagens/imagem';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  background-image: linear-gradient(90deg, #007BFF 35%, #343A40 165%);
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ResultadoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    text-align: center;
    padding: 0 100px;
    p {
        width: 200px;
        color: #FFF;
    }
    img {
        width: 100px;
    }
`

function Geral() {

    const [cursos, setCursos] = useState([])

    useEffect(() => {
        fetchCursos()
    }, [])

    async function fetchCursos() {
        const cursosDaAPI = await getCursos();
        const cursosGerals = cursosDaAPI.filter(curso => curso.id);
        setCursos(cursosGerals);
    }

    const navigate = useNavigate();

    const handleCourseClick = (id) => {
        navigate(`/curso/${id}`);
    };
    
    return (
        <AppContainer>
            <div>
                <Pesquisa/>
                <ResultadoContainer>
                    {
                        cursos.length !== 0 ? cursos.map(curso => (
                            <Resultado key={curso.id} onClick={() => handleCourseClick(curso.id)}>
                                <img src={imagens[curso.id]} alt='' />
                                <p>{curso.nome}</p>
                            </Resultado>
                        )) : null
                    }
                </ResultadoContainer>
            </div>
        </AppContainer>
    )
}

export default Geral;