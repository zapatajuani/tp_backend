const { Router } = require("express")

const pedidos = require("../controller/controllerPedidos")

const routerPedidos = Router()

routerPedidos.get("/", pedidos.listaPedido)
routerPedidos.post("/", pedidos.altaPedido)
routerPedidos.put("/:id", pedidos.modificacionPedido)
routerPedidos.delete("/:id", pedidos.borrarPedido)

module.exports = routerPedidos
