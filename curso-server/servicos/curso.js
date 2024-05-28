const fs = require("fs")

function getTodosCursos (){
      return JSON.parse(fs.readFileSync("cursos.json"))
} 

function getCursoPorId(id){
      const cursos = JSON.parse(fs.readFileSync("cursos.json"))

      const cursoFiltrado = cursos.filter( curso => curso.id === id)[0]
      return cursoFiltrado

}

function insereCurso(cursoNovo){
      const cursos = JSON.parse(fs.readFileSync("cursos.json"))

      const novaListaDecursos = [...cursos, cursoNovo]

      fs.writeFileSync("cursos.json", JSON.stringify(novaListaDecursos))
}

function modificaCurso (modificacoes, id){
      let cursosAtuais = JSON.parse(fs.readFileSync("cursos.json"))

      const indiceModificado = cursosAtuais.findIndex(curso => curso.id === id)

      const conteudoMudado = { ...cursosAtuais[indiceModificado], ...modificacoes}

      cursosAtuais[indiceModificado] = conteudoMudado
      fs.writeFileSync("cursos.json", JSON.stringify(cursosAtuais))
}

function deletarCursoPorId(id){
      const cursos = JSON.parse(fs.readFileSync("cursos.json"))

      const cursosFiltrados = cursos.filter (curso => curso.id !== id)
      fs.writeFileSync("cursos.json", JSON.stringify(cursosFiltrados))
}

module.exports = {
      getTodosCursos,
      getCursoPorId,
      insereCurso,
      modificaCurso
}