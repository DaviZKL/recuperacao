import styled from "styled-components"

export const Titulo = styled.h2`
    width: 100%;
    padding: ${props => props.p || '30px 0'};
    background-color: ${props => props.bgc || '#FFF'};
    color: ${props => props.cor || '#000'};
    font-size: ${props => props.tamanho || '18px;'};
    text-align: ${props => props.alinhamento || 'center'};
    text-shadow: ${props => props.sombra || '10px'};
    margin: 0;
`

export default Titulo