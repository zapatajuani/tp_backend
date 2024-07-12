/* ------------ REQUERIMIENTOS ---------------- */

const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const routerPedidos = require("./routes/rutaPedidos")
const routerConsultas = require("./routes/rutaConsultas")
const routerLoggin = require("./routes/rutaLoggin")
const middewares = require("./middlewares/autorizacion")
const db = require("./db/db")

const dotenv = require("dotenv")
dotenv.configDotenv()

/* ------------ AJUSTES DEL SERVIDOR ---------- */

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())

/* ------------ RUTAS A PAGINAS --------------- */

app.use("/", express.static("./pages/users"))
app.use("/loggin", middewares.soloPublico, express.static("./pages/loggin"))
app.use("/admin", middewares.soloAdmin, express.static("./pages/admin"))

/* ------------ METODOS / ENDPOINTS ----------- */

app.use("/users", routerLoggin)
app.use("/pedidos", routerPedidos)
app.use("/consultas", routerConsultas)

/* ------------ SERVER INIT ------------------- */

app.listen(process.env.PORT, process.env.SERVER_HOST, () => {
    console.log("Iniciando Servidor...")

    // METODOS PARA INCIALIZAR SERVIDOR

    db.initDB()

    // --------------------------------

    const out_msg = `
    Servidor corriendo en http://${process.env.SERVER_HOST}:${process.env.PORT}
    
    Pagina principal ............... http://${process.env.SERVER_HOST}:${process.env.PORT}
    Pagina administrador ........... http://${process.env.SERVER_HOST}:${process.env.PORT}/admin
    Pagina loggin administrador .... http://${process.env.SERVER_HOST}:${process.env.PORT}/loggin
    `

    console.log(out_msg)
})
