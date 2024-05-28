const { Router } = require("express")
const { getFazendos, postFazendo, deleteFazendo } = require("../controladores/fazendo")

const router = Router()

router.get('/', getFazendos)

router.post('/:id', postFazendo)

router.delete('/:id', deleteFazendo)

module.exports = router