const { Router } = require("express")
const middewares = require("../middlewares/autorizacion")

const consultas = require("../controller/controllerConsultas")

const routerConsultas = Router()

routerConsultas.get("/", middewares.soloAdmin, consultas.listaConsultas)
routerConsultas.post("/", consultas.altaConsultas)
routerConsultas.delete("/:uuid", middewares.soloAdmin, consultas.borrarConsultas)

module.exports = routerConsultas