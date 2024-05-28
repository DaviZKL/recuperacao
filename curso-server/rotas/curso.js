const { Router } = require("express")
const { getCursos, getCurso, postCurso, patchCurso } = require("../controladores/curso")

const router = Router()

router.get('/', getCursos)

router.get('/:id', getCurso)

router.post('/', postCurso)

router.patch('/:id', patchCurso)

router.delete('/', (req, res) => {
      res.send('Você fez uma requisição do tipo DELETE')
})

module.exports = router