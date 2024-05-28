import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 20px;
    background-color: #ccc;
`;

const ProgressBar = styled.div`
    height: 100%;
    width: ${({ progresso }) => progresso}%;
    background-color: #4caf50;
`;

const BarraProgresso = ({ progresso }) => {
    return (
        <ProgressBarContainer>
            <ProgressBar progresso={progresso} />
        </ProgressBarContainer>
    );
};

export default BarraProgresso;

