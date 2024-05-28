const { getTodosEmpregos, getEmpregoPorId, insereEmprego, modificaEmprego } = require("../servicos/emprego")

function getEmpregos(req, res) {
      try {
            const empregos = getTodosEmpregos()
            res.send(empregos)
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function getEmprego(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  const emprego = getEmpregoPorId(id)
                  res.send(emprego)
            } else {
                  res.status(422)
                  res.send("ID inválido. :(")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function postEmprego(req, res) {
      try {
            const empregoNovo = req.body
            if (req.body.nome) {
                  insereEmprego(empregoNovo)
                  res.status(201)
                  res.send("Emprego Inserido com sucesso")
            } else {
                  res.status(422)
                  res.send("O Campo nome é obrigatório")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)

      }
}

function patchEmprego(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  const body = req.body
                  modificaEmprego(body, id)
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

function deleteEmprego(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  deletaEmpregoPorId(id)
                  res.send("Emprego deletado com sucesso")
            } else {
                  res.status(422)
                  res.send("ID inválido.")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

module.exports = {
      getEmpregos,
      getEmprego,
      postEmprego,
      patchEmprego,
      deleteEmprego
}