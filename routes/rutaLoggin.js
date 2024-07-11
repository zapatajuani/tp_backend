const { Router } = require("express")

const controladorLoggin = require("../controller/controllerLoggin")

const routerLoggin = Router()

routerLoggin.get("/verificacion", controladorLoggin.a)

module.exports = routerLoggin

/* 
    Se necesita completar el loggin
    verificar loggin y devolver cookie o redireccionar
    agregar middewares para verificar rutas privadas
        y redireccionar si es necesario
    
    terminar admin page
*/