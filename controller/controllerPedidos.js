const db = require("../db/db")

const listaPedido = (req, res) => {
    db.listarPedidos(res)
}

const altaPedido = (req, res) => {
    const data = req.body
    a = db.altaPedido(data, res)
}

const modificacionPedido = (req, res) => {
    const data = req.body
    const { uuid } = req.params

    db.actualizarPedido(uuid, data, res)
}

const borrarPedido = (req, res) => {
    
    const { uuid } = req.params

    db.eliminarPedido(uuid, res)
}

module.exports = { listaPedido, altaPedido, modificacionPedido, borrarPedido }
