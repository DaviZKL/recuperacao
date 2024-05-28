const { Router } = require("express")
const { getEmpregos, getEmprego, postEmprego, patchEmprego } = require("../controladores/emprego")

const router = Router()

router.get('/', getEmpregos)

router.get('/:id', getEmprego)

router.post('/', postEmprego)

router.patch('/:id', patchEmprego)

router.delete('/', (req, res) => {
      res.send('Você fez uma requisição do tipo DELETE')
})

module.exports = router