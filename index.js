/* ------------ REQUERIMIENTOS ---------------- */

const express = require('express')
const cors = require("cors")
const routerPedidos = require("./routes/rutaPedidos")
const routerConsultas = require("./routes/rutaConsultas")
const routerLogin = require("./routes/rutaLoggin")
const db = require("./db/db")

const dotenv = require("dotenv")
dotenv.configDotenv()

/* ------------ AJUSTES DEL SERVIDOR ---------- */

const app = express()
app.use(express.json())
app.use(cors())

/* ------------ RUTAS A PAGINAS --------------- */

app.use("/", express.static("./pages/users"))
app.use("/loggin", express.static("./pages/loggin"))
app.use("/admin", express.static("./pages/admin"))

/* ------------ METODOS / ENDPOINTS ----------- */

app.use("/loggin", routerLogin)
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
