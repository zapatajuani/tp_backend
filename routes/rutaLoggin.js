const { Router } = require("express")
const middewares = require("../middlewares/autorizacion")

const controladorUsers = require("../controller/controllerUsers")

const routerUsers = Router()

routerUsers.post("/verificar", controladorUsers.verificarUsuario)
routerUsers.post("/crear", middewares.soloAdmin, controladorUsers.crearUsuario)
routerUsers.delete("/", middewares.soloAdmin, controladorUsers.eliminarUsuario)

module.exports = routerUsers
