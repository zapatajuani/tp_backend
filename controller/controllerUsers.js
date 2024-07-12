const db = require("../db/db")
const bcryptjs = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const crearUsuario = async (req, res) => {
    const salt = await bcryptjs.genSalt(10)
    const hashedPass = await bcryptjs.hash(req.body.pass, salt)

    const data = {user: req.body.user, pass: hashedPass}

    db.altaUsuario(data)

    return res.send({code: 200, message: "OK"})
}

const verificarUsuario = async (req, res) => {
    
    db.consultaUsuario(req.body.user, async (err, rows) => {

        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        if (rows.length == 0) {
            // No se encontro ese usuaior
            res.send({code: 401, mensaje: "Error en la consulta"})
        
        } else if (await bcryptjs.compare(req.body.pass, rows[0].pass)) {
            // Si bcrypts da como true la comparacion de contraseñas se prosigue por aca

            token = jsonwebtoken.sign(
                {user: req.body.user},
                process.env.SECRECT_KEY,
                {expiresIn: process.env.JWT_EXPIRES_TIME}
            )

            const cookie_option = {
                Expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
                path: "/"
            }

            res.cookie("jwt", token, cookie_option)
            res.send({code: 200, redirect: "/admin"})
        } else {
            // Si la comparacion e bcrypts falla...

            res.send({code: 401, mensaje: "Error en la consulta"})
        }
    })
}

const eliminarUsuario = (req, res) => {
    db.eliminarUsuario(req, res)
}

module.exports = { crearUsuario, verificarUsuario, eliminarUsuario }

