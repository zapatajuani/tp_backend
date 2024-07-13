const db = require("../db/db")

const listaConsultas = (req, res) => {
    db.listarConsultas(res)
}

const altaConsultas = (req, res) => {
    const data = req.body
    db.altaConsulta(data, res)
}

const borrarConsultas = (req, res) => {
    const { uuid } = req.params
    db.bajaConsulta(uuid, res)
}

module.exports = { listaConsultas, altaConsultas, borrarConsultas }
