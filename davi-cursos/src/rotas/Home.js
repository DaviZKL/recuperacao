import Pesquisa from '../componentes/Pesquisa'
import CursosMaisFeitos from '../componentes/CursosMaisFeitos'
import CursosMaisContratados from '../componentes/CursosComMaisContratados'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  background-image: linear-gradient(90deg, #007BFF 35%, #343A40 165%);
`

function Home() {
  return (
    <AppContainer>
      <Pesquisa />
      <CursosMaisFeitos />
      <CursosMaisContratados />
    </AppContainer>
  );
}

export default Home
