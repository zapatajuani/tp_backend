const db = require("../db/db")

const listaPedido = (req, res) => {
    db.listarPedidos()
    res.send("Listado exitoso")
}

const altaPedido = (req, res) => {
    const data = req.body
    db.altaPedido(data)
    res.send("Alta exitosa!")
}

const modificacionPedido = (req, res) => {
    const data = req.body
    const { id } = req.params

    db.actualizarPedido(id, data)
    res.send("Actualizacion exitosa!")
}

const borrarPedido = (req, res) => {
    const { id } = req.params
    db.eliminarPedido(id)
    res.send("Baja con exito!")
}

module.exports = { listaPedido, altaPedido, modificacionPedido, borrarPedido }
