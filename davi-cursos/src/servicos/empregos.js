import axios from "axios"

const empregosAPI = axios.create({baseURL: "http://localhost:8000/empregos"})

async function getEmpregos() {
    const response = await empregosAPI.get('/')

    return response.data
}

export {
    getEmpregos
}