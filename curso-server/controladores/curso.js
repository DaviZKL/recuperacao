const { getTodosCursos, getCursoPorId, insereCurso, modificaCurso } = require("../servicos/curso")

function getCursos(req, res) {
      try {
            const cursos = getTodosCursos()
            res.send(cursos)
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function getCurso(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  const curso = getCursoPorId(id)
                  res.send(curso)
            } else {
                  res.status(422)
                  res.send("ID inválido. :(")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)
      }
}

function postCurso(req, res) {
      try {
            const cursoNovo = req.body
            if (req.body.nome) {
                  insereCurso(cursoNovo)
                  res.status(201)
                  res.send("Curso Inserido com sucesso")
            } else {
                  res.status(422)
                  res.send("O Campo nome é obrigatório")
            }
      } catch (error) {
            res.status(500)
            res.send(error.message)

      }
}

function patchCurso(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  const body = req.body
                  modificaCurso(body, id)
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

function deleteCurso(req, res) {
      try {
            const id = req.params.id
            if (id && Number(id)) {
                  deletaCursoPorId(id)
                  res.send("Curso deletado com sucesso")
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
      getCursos,
      getCurso,
      postCurso,
      patchCurso,
      deleteCurso
}