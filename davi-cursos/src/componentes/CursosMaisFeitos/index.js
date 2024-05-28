import { Titulo } from '../Titulo'
import CardRecomenda from '../CardRecomendaCursosMaisFeitos'
import styled from 'styled-components'

const CursosMaisFeitosContainer = styled.section`
    background-image: linear-gradient(90deg, #007BFF 35%, #343A40 165%);
    padding-bottom: 20px;
    padding-top: 20px;
    width: 100%;
`

function CursosMaisFeitos() {
    return (
        <div>
            <Titulo
                cor="#28A745"
                tamanhoFonte="36px"
            >
                CURSOS MAIS FEITOS
            </Titulo>
            <CursosMaisFeitosContainer>
                <CardRecomenda/>
            </CursosMaisFeitosContainer>
        </div>    
    )
}

export default CursosMaisFeitos