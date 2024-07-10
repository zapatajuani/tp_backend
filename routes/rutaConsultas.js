const { Router } = require("express")

const consultas = require("../controller/controllerConsultas")

const routerConsultas = Router()

routerConsultas.get("/", consultas.listaConsultas)
routerConsultas.post("/", consultas.altaConsultas)
routerConsultas.delete("/:id", consultas.borrarConsultas)

module.exports = routerConsultas