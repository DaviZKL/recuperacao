import axios from "axios";

const cursosAPI = axios.create({ baseURL: "http://localhost:8000/cursos" });

async function getCursos() {
    const response = await cursosAPI.get('/');
    return response.data;
}

async function getCurso(id) {
    const response = await cursosAPI.get(`/${id}`);
    return response.data;
}

async function patchCurso(id, modificacoes) {
    const response = await cursosAPI.patch(`/${id}`, modificacoes);
    return response.data;
}

export {
    getCursos,
    getCurso,
    patchCurso
}
