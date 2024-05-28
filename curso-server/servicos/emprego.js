const fs = require("fs")

function getTodosEmpregos (){
      return JSON.parse(fs.readFileSync("empregos.json"))
} 

function getEmpregoPorId(id){
      const empregos = JSON.parse(fs.readFileSync("empregos.json"))

      const empregoFiltrado = empregos.filter( emprego => emprego.id === id)[0]
      return empregoFiltrado

}

function insereEmprego(empregoNovo){
      const empregos = JSON.parse(fs.readFileSync("empregos.json"))

      const novaListaDeempregos = [...empregos, empregoNovo]

      fs.writeFileSync("empregos.json", JSON.stringify(novaListaDeempregos))
}

function modificaEmprego (modificacoes, id){
      let empregosAtuais = JSON.parse(fs.readFileSync("empregos.json"))

      const indiceModificado = empregosAtuais.findIndex(emprego => emprego.id === id)

      const conteudoMudado = { ...empregosAtuais[indiceModificado], ...modificacoes}

      empregosAtuais[indiceModificado] = conteudoMudado
      fs.writeFileSync("empregos.json", JSON.stringify(empregosAtuais))
}

function deletarEmpregoPorId(id){
      const empregos = JSON.parse(fs.readFileSync("empregos.json"))

      const empregosFiltrados = empregos.filter (emprego => emprego.id !== id)
      fs.writeFileSync("empregos.json", JSON.stringify(empregosFiltrados))
}

module.exports = {
      getTodosEmpregos,
      getEmpregoPorId,
      insereEmprego,
      modificaEmprego
}