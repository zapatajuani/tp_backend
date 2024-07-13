const { Router } = require("express")
const middewares = require("../middlewares/autorizacion")

const pedidos = require("../controller/controllerPedidos")

const routerPedidos = Router()

routerPedidos.get("/", middewares.soloAdmin, pedidos.listaPedido)
routerPedidos.post("/", pedidos.altaPedido)
routerPedidos.put("/:uuid", middewares.soloAdmin, pedidos.modificacionPedido)
routerPedidos.delete("/:uuid", middewares.soloAdmin, pedidos.borrarPedido)

module.exports = routerPedidos
