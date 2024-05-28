const express = require("express")
const rotaCurso = require("./rotas/curso")
const rotaFeito = require("./rotas/feito")
const rotaFazendo = require("./rotas/fazendo")
const rotaEmprego = require("./rotas/emprego")

const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({origin: "*"}))

app.use('/cursos', rotaCurso)
app.use('/feitos', rotaFeito)
app.use('/fazendos', rotaFazendo)
app.use('/empregos', rotaEmprego)

const port = 8000

app.listen(port, () => {
      console.log(`Escutando a porta ${port}`)
})