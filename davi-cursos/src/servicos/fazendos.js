import axios from "axios"

const fazendosAPI = axios.create({baseURL: "http://localhost:8000/fazendos"})

async function getFazendos() {
    const response = await fazendosAPI.get('/')

    return response.data
}

async function postFazendo(id) {
    await fazendosAPI.post(`/${id}`)
}

async function deleteFazendo(id) {
    await fazendosAPI.delete(`/${id}`)
}

export {
    getFazendos,
    postFazendo,
    deleteFazendo
}