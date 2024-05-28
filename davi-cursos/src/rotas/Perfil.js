import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getFazendos } from '../servicos/fazendos';
import { getFeitos } from '../servicos/feitos';

import imagens from '../componentes/imagens/imagem';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  background-image: linear-gradient(90deg, #007BFF 35%, #343A40 165%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
    &:hover {
        border: 1px solid white;
    }
`

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px;
`

function Perfil() {
  function Feitos() {

    const [feitos, setFeitos] = useState([]);

    async function fetchFeitos() {
      const feitosDaAPI = await getFeitos();
      setFeitos(feitosDaAPI);
    }

    useEffect(() => {
      fetchFeitos();
    }, []);

    const navigate = useNavigate();

    const handleCourseClick = (id) => {
      navigate(`/curso/${id}`);
    };

    const cursosExibidos = new Set();

    return (
      <div>
        <Titulo>Aqui estão os cursos que terminou:</Titulo>
        <ResultadoContainer>
          {
            feitos.map(feito => {
              if (!cursosExibidos.has(feito.id)) {
                cursosExibidos.add(feito.id);
                return (
                  <Resultado key={feito.id} onClick={() => handleCourseClick(feito.id)}>
                    <p>{feito.nome}</p>
                    <img src={imagens[feito.id]} alt={feito.nome} />
                  </Resultado>
                );
              }
              return null;
            })
          }
        </ResultadoContainer>
      </div>
    );
  }


  function Fazendo() {
    const [fazendos, setFazendos] = useState([])

    async function fetchFazendos() {
      const fazendosDaAPI = await getFazendos()
      const fazendosFazendo = fazendosDaAPI.filter(fazendos => fazendos.id);
      setFazendos(fazendosFazendo)
    }

    useEffect(() => {
      fetchFazendos([])
    }, [])

    const navigate = useNavigate();

    const handleCourseClick = (id) => {
      navigate(`/curso/${id}`);
    };

    return (
      <div>
        <Titulo>Aqui estão os cursos que está fazendo:</Titulo>
        <ResultadoContainer>
          {
            fazendos.length !== 0 ? fazendos.map(fazendo => (
              <Resultado key={fazendo.id} onClick={() => handleCourseClick(fazendo.id)}>
                <p>{fazendo.nome}</p>
                <img src={imagens[fazendo.id]} alt={fazendo.nome} />
              </Resultado>
            )) : null
          }
        </ResultadoContainer>
      </div>
    )
  }


  return (
    <AppContainer>
      <Feitos />
      <Fazendo />
    </AppContainer>
  )

}



export default Perfil
