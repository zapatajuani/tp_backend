const db = require("../db/db")
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const soloAdmin = (req, res, next) => {
    const cookie = req.cookies.jwt

    if (cookie && jsonwebtoken.verify(cookie, process.env.SECRECT_KEY)) {
        next()
    } else {
        res.redirect("/loggin")
    }
}

const soloPublico = (req, res, next) => {
    const cookie = req.cookies.jwt

    if (cookie && jsonwebtoken.verify(cookie, process.env.SECRECT_KEY)) {
        res.redirect("/admin")
    } else {
        next()
    }
}

module.exports = { soloAdmin, soloPublico }