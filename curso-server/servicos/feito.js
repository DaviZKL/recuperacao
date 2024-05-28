const fs = require("fs")

function getTodosFeitos (){
      return JSON.parse(fs.readFileSync("feitos.json"));
} 

function deletaFeitoPorId(id){
      const cursos = JSON.parse(fs.readFileSync("feitos.json"));
      const cursosFiltrados = cursos.filter(curso => curso.id !== id)
      fs.writeFileSync("feitos.json", JSON.stringify(cursosFiltrados))
}

function insereFeito(id){
      const cursos = JSON.parse(fs.readFileSync("cursos.json"))
      const feitos = JSON.parse(fs.readFileSync("feitos.json"))
      const cursoInserido = cursos.find(curso => curso.id === id)
      const novaListaDecursosFeitos = [...feitos, cursoInserido]
      fs.writeFileSync("feitos.json", JSON.stringify(novaListaDecursosFeitos))
}

function modificarFeito(modificacoes, id) {
      try {
          let feitos = lerFeitos();
          const indiceModificado = feitos.findIndex(feito => feito.id === id);
  
          if (indiceModificado !== -1) {
              const conteudoMudado = { ...feitos[indiceModificado], ...modificacoes };
              feitos[indiceModificado] = conteudoMudado;
              fs.writeFileSync("feitos.json", JSON.stringify(feitos));
          } else {
              throw new Error(`Feito com ID ${id} não encontrado.`);
          }
      } catch (error) {
          console.error("Erro ao modificar feito:", error);
      }
  }
  
  module.exports = {
      getTodosFeitos,
      deletaFeitoPorId,
      insereFeito,
      modificarFeito
  };

