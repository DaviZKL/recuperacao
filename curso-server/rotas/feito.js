const { Router } = require("express")
const { getFeitos, postFeito, deleteFeito, patchFeito } = require("../controladores/feito")

const router = Router()

router.get('/', getFeitos)

router.post('/:id', postFeito)

router.delete('/:id', deleteFeito)

router.patch('/:id', patchFeito)

module.exports = router