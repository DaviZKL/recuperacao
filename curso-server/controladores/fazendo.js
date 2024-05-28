const { insereFazendo, getTodosFazendos, deletaFazendoPorId } = require("../servicos/fazendo")

function getFazendos(req, res) {
      try {
            const cursos = getTodosFazendos()
            res.send(cursos)
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function postFazendo(req, res) {
      try {
         const id = req.params.id
         insereFazendo(id)
         res.status(201)
         res.send("Curso inserido com sucesso!!")
      } catch (error) {
            res.status(500)
            res.send(error.message)

      }
}

function deleteFazendo(req, res) {
      try {
            const id = req.params.id

            if (id && Number(id)) {
                  deletaFazendoPorId(id)
                  res.send("Fazendo deletado com sucesso")
            } else {
                  res.status(422)
                  res.send("ID inválido.")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

module.exports ={
      getFazendos,
      postFazendo,
      deleteFazendo
}