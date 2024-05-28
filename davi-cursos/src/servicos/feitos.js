import axios from "axios"

const feitosAPI = axios.create({baseURL: "http://localhost:8000/feitos"})

async function getFeitos() {
    const response = await feitosAPI.get('/')

    return response.data
}

async function postFeito(id) {
    await feitosAPI.post(`/${id}`)
}

async function deleteFeito(id) {
    await feitosAPI.delete(`/${id}`)
}

async function patchFeito(id, modificacoes) {
    await feitosAPI.patch(`/${id}`, modificacoes);
}

export {
    getFeitos,
    postFeito,
    deleteFeito,
    patchFeito
}