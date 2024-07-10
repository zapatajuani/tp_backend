const db = require("../db/db")

const listaConsultas = (req, res) => {
    db.listarConsultas()
    res.send("Listado exitoso")
}

const altaConsultas = (req, res) => {
    const data = req.body
    db.altaConsulta(data)
    res.send("Alta exitosa!")
}

const borrarConsultas = (req, res) => {
    const { id } = req.params
    db.bajaConsulta(id)
    res.send("Baja con exito!")
}

module.exports = { listaConsultas, altaConsultas, borrarConsultas }
