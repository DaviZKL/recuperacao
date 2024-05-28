import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { deleteFazendo, getFazendos, postFazendo } from '../servicos/fazendos';
import { getFeitos, postFeito } from '../servicos/feitos';
import { getCurso } from '../servicos/cursos';

import Titulo from '../componentes/Titulo';
import BarraProgresso from '../componentes/barraProgresso';
import imagem from '../componentes/imagens/imagem';

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    max-height: 100%;
    background-image: linear-gradient(90deg, #007BFF 35%, #326589 165%); /* Azul Elétrico */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #FFFFFF; /* Branco */
    padding-top: 10px;
    box-sizing: border-box;
`;

const Cabecalho = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    padding-top: 0.5%;
`;

const Caixa = styled.div`
    background-color: #6C757D; /* Cinza Médio */
    padding: 10px;
    border-radius: 5px;
    max-width: 40%;
    margin-left: 10%;

    @media (max-width: 768px) {
        margin-left: 5%;
        max-width: 90%;
    }
`;

const Descricao = styled.p`
    font-size: 30px;
    margin: 0;
    text-align: left;
    color: #FFFFFF; /* Branco */

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Corpo = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    margin-right: 500px;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        margin-right: 0;
        flex-direction: column;
        align-items: center;
    }
`;

const CaixaEtapa = styled.div`
    width: 250px;
    background-color: #FFFFFF; /* Branco */
    border: 1px solid #CCC;
    padding: 5px;
    cursor: ${props => props.cursor || 'pointer'};
`;

const Conteudo = styled.div`
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
    transition: max-height 0.3s ease;
    padding: ${({ isOpen }) => (isOpen ? '10px' : '0')};
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    color: black;
`;

const Certificado = styled.div`
    display: ${({ progresso }) => (progresso === 100 ? 'block' : 'none')};
    width: 500px;
    position: absolute;
    right: 20px;
    margin-right: 200px;
    background-color: #FFFFFF; /* Branco */
    color: #000;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    word-break: break-all;

    @media (max-width: 768px) {
        width: 90%;
        right: auto;
        margin-right: 0;
    }
`;

const Imagem = styled.img`
    width: 500px;
    height: 400px;
    margin-left: 250px;
    margin-top: 100px;

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
        margin-left: 0;
        margin-top: 20px;
    }
`;

const Botao = styled.button`
    background-color: #28A745; /* Verde Limão */
    color: #FFFFFF; /* Branco */
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    &:hover {
        background-color: ${props => props.disabled ? '#28A745' : '#1E7A36'}; /* Verde Limão escurecido */
    }
    align-self: ${props => props.self || 'auto'};
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 16px;
        padding: 10px;
        margin: 5px 0;
    }
`;

const Navegacao = styled.div`
    display: flex;
    justify-content: space-between;
    width: 95%;
`;

const EtapasRow = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const BotoesContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export function Curso() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [fazendo, setFazendo] = useState(null);
    const [feito, setFeito] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [progresso, setProgresso] = useState(0);

    useEffect(() => {
        async function fetchCurso() {
            try {
                const cursoEncontrado = await getCurso(id);
                const feitosDaAPI = await getFeitos();
                const feitoExistente = feitosDaAPI.find(f => f.id === cursoEncontrado.id);
                
                if (!feitoExistente) {
                    cursoEncontrado.etapas = cursoEncontrado.etapas.map(etapa => ({
                        ...etapa,
                        aberto: false
                    }));
                }
                setCurso(cursoEncontrado);
                setLoading(false);
            } catch (error) {
                setError('Curso não encontrado');
                setLoading(false);
            }
        }
        fetchCurso();
    }, [id]);

    useEffect(() => {
        if (curso) {
            const etapasConcluidas = curso.etapas.filter(etapa => etapa.aberto).length;
            const totalEtapas = curso.etapas.length;
            const novoProgresso = (etapasConcluidas / totalEtapas) * 100;
            setProgresso(novoProgresso);
        }
    }, [curso]);

    useEffect(() => {
        async function attFazendoFeito() {
            try {
                const feitosDaAPI = await getFeitos();
                const feitoExistente = feitosDaAPI.find(f => f.id === curso?.id);
    
                if (progresso === 100 && !feitoExistente && fazendo) {
                    await postFeito(fazendo.id);
                    await deleteFazendo(fazendo.id);
                    setFazendo(null);
                    window.location.reload(true);
                }
            } catch (error) {
                console.error("Erro ao atualizar fazendo e feito:", error);
            }
        }
        attFazendoFeito();
    }, [progresso, curso, fazendo]);    

    async function habilitaConteudo(etapaId) {
        if (!fazendo) return;
        setCurso(prevCurso => ({
            ...prevCurso,
            etapas: prevCurso.etapas.map(etapa => {
                if (etapa.id === etapaId) {
                    return { ...etapa, aberto: !etapa.aberto };
                }
                return etapa;
            })
        }));
    };

    const handleAnterior = () => {
        const novoId = Math.max(parseInt(id) - 1, 1);
        // Limpar estados
        setFazendo(null);
        setFeito(null);
        navigate(`/curso/${novoId}`);
    };

    const handleProximo = () => {
        const novoId = Math.min(parseInt(id) + 1, 19);
        // Limpar estados
        setFazendo(null);
        setFeito(null);
        navigate(`/curso/${novoId}`);
    };

    async function handleFazerCurso() {
        if (feito || fazendo){
            return;
        } else {   
            await postFazendo(curso.id);
            setCurso(prevCurso => ({
                ...prevCurso,
                fazendo: true
            }));
            featch();
        } 
    }   

    async function handleAbandonarCurso() {
        if (!fazendo || feito) return;
        await deleteFazendo(fazendo.id);
        featch(); 
    }

    async function featch() {
        const favoritosDaAPI = await getFazendos();
        const feitosDaAPI = await getFeitos();
        setFazendo(favoritosDaAPI.find(favorito => favorito.id === curso?.id));
        setFeito(feitosDaAPI.find(feito => feito.id === curso?.id));
    }

    useEffect(() => {
        if (curso && !feito) {
            featch();
        }
    }, [curso, feito]);

    if (loading) {
        return <AppContainer><p>Carregando...</p></AppContainer>;
    }

    if (error) {
        return <AppContainer><p>Ocorreu um erro ao carregar o curso.</p></AppContainer>;
    }

    return (
        <div>
            {curso ? (
                <AppContainer>
                    <Navegacao>
                        <Botao 
                        self='flex-start'
                        onClick={handleAnterior}><GoArrowLeft/></Botao>
                        <Botao 
                        self='flex-end'
                        onClick={handleProximo}><GoArrowRight/></Botao>
                    </Navegacao>    
                    <Cabecalho>
                        <Titulo
                            cor='lime'
                            tamanho='40px'
                        >{curso.nome}</Titulo>
                        <Caixa>
                            <Descricao>{curso.descricao}</Descricao>
                        </Caixa>
                        <Imagem src={imagem[curso.id]} alt={curso.nome} />
                    </Cabecalho>
                    <BotoesContainer>
                        <Botao
                            onClick={handleFazerCurso}
                            disabled={fazendo || feito}
                        >
                            Fazer curso
                        </Botao>
                        <Botao
                            onClick={handleAbandonarCurso}
                            disabled={!fazendo || feito}
                        >
                            Abandonar curso
                        </Botao>
                    </BotoesContainer>
                    <Corpo>
                        <EtapasRow>
                            {curso.etapas.map(etapa => (
                                <CaixaEtapa 
                                key={etapa.id} 
                                onClick={() => habilitaConteudo(etapa.id)}
                                >
                                    <Titulo
                                        bgc='none'
                                        cor='black'
                                        p='0'
                                    >{etapa.nome}</Titulo>
                                    <Conteudo isOpen={etapa.aberto}>{etapa.conteudo}</Conteudo>
                                </CaixaEtapa>
                            ))}
                        </EtapasRow>
                        <BarraProgresso progresso={progresso} />
                        <Certificado progresso={progresso}>
                            <Titulo p='10px 0px'>Curso concluído.</Titulo>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat maximus nibh, ac venenatis libero consequat in. Cras quis enim malesuada nulla semper vulputate in vitae diam. Proin fringilla interdum magna, eget condimentum mi euismod id. Sed sodales ultrices ultricies. Cras id ante imperdiet, accumsan eros sed, dictum nisl. Pellentesque eu arcu quis nunc vulputate ultricies. Quisque ultricies ultrices mauris vel pharetra. Vestibulum finibus, nunc sed elementum imperdiet, turpis quam sagittis turpis, sit amet pretium purus purus in mauris. Integer id semper tortor. Proin gravida, ex vitae vehicula pellentesque, enim leo hendrerit ex, sed vestibulum felis lectus eget lacus.
                        </Certificado>
                    </Corpo>
                </AppContainer>
            ) : (
                <Descricao>Curso não encontrado.</Descricao>
            )}
        </div>
    );
}
