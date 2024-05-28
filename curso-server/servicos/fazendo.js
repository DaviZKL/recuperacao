const fs = require("fs")

function getTodosFazendos (){
      return JSON.parse(fs.readFileSync("fazendos.json"));
} 

function deletaFazendoPorId(id){
      const cursos = JSON.parse(fs.readFileSync("fazendos.json"));
      const cursosFiltrados = cursos.filter(curso => curso.id !== id)
      fs.writeFileSync("fazendos.json", JSON.stringify(cursosFiltrados))
}

function insereFazendo(id){
      const cursos = JSON.parse(fs.readFileSync("cursos.json"))
      const fazendos = JSON.parse(fs.readFileSync("fazendos.json"))
      const cursoInserido = cursos.find(curso => curso.id === id)
      const novaListaDecursosFazendos = [...fazendos, cursoInserido]
      fs.writeFileSync("fazendos.json", JSON.stringify(novaListaDecursosFazendos))
}

module.exports={
      getTodosFazendos,
      deletaFazendoPorId,
      insereFazendo
}

