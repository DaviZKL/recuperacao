const { insereFeito, getTodosFeitos, deletaFeitoPorId } = require("../servicos/feito")

function getFeitos(req, res) {
      try {
            const cursos = getTodosFeitos()
            res.send(cursos)
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function postFeito(req, res) {
      try {
         const id = req.params.id
         insereFeito(id)
         res.status(201)
         res.send("Curso inserido com sucesso!!")
      } catch (error) {
            res.status(500)
            res.send(error.message)

      }
}

function deleteFeito(req, res) {
      try {
            const id = req.params.id

            if (id && Number(id)) {
                  deletaFeitoPorId(id)
                  res.send("Feito deletado com sucesso")
            } else {
                  res.status(422)
                  res.send("ID inválido.")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function patchFeito(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  const body = req.body
                  modificaFeito(body, id)
                  res.send("Item modificado com sucesso")
            } else {
                  res.status(422)
                  res.send("ID Inválido")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

module.exports ={
      getFeitos,
      postFeito,
      deleteFeito,
      patchFeito
}