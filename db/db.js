const db = require("mysql2")
const fs = require("fs")
const uuidModule = require("uuid")
const dotenv = require("dotenv")
dotenv.configDotenv()

// --------------------------------------------------

const newConn = () => {
    const conn = db.createConnection({
        multipleStatements: true,
        host: process.env.DB_HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
    return conn
}

// ------ METODOS PARA INICIALIZAR EL SERVIDOR ------

const initDB = () => {

    const conn = db.createConnection({
        host: process.env.DB_HOST,
        user: process.env.USER,
        password: process.env.PASSWORD
    })
 
    conn.connect((err) => {
        if (err) {
            console.log("Error al conectar a MySQL: ", err)
        } else {
            const query = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`

            conn.query(query, (err) => {
                if (err) {
                    console.log(`Hubo un error en la creacion de la base de datos ${process.env.DATABASE}: ${err}`)
                    conn.end()
                } else {
                    initTables()
                }
            })
        }
    })
}

const initTables = () => {
    const conn = newConn()

    fs.readFile("./db/init.sql", 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        conn.query(data, (err, result) => {
            if (err) {
                console.log("Error en la creacion de las tablas: ", err)
            }
        })

    })

}

// ------ METODOS PARA PEDIDOS ----------------------

const listarPedidos = (res) => {
    const connection = newConn()
    const query = `SELECT * FROM pedidos`

    connection.query(query, (err, rows) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        res.json(rows)
    })
    connection.end()
}

const altaPedido = (data, res) => {
    const connection = newConn()

    const query = `INSERT INTO pedidos
    (uuid, nombre, apellido, calle, numero, piso, tel, delivery, json_products)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const uuid = uuidModule.v6()

    const values = [
        uuid,
        data.nombre,
        data.apellido,
        data.calle,
        data.numero,
        data.piso,
        data.tel,
        data.delivery,
        JSON.stringify(data.productos)
    ]

    connection.query(query, values, (err, results) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        } else {
            console.log(`Pedido ingresado - UUID: ${uuid}`)
            res.send({code: 200, mensaje: "Datos creados!"})
        }
    })

    connection.end()
}

const eliminarPedido = (uuid, res) => {
    const connection = newConn()
    const query = `DELETE FROM pedidos WHERE uuid = ?`

    const values = [uuid]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log(`Pedido eliminado - UUID: ${uuid}`)
        res.send({code: 200, mensaje: "Datos eliminados"})
    })

    connection.end()
}

const actualizarPedido = (uuid, data, res) => {
    const connection = newConn()

    const query = `UPDATE pedidos
    SET nombre = ?, 
        apellido = ?, 
        calle = ?, 
        numero = ?, 
        piso = ?, 
        tel = ?, 
        delivery = ?
    WHERE uuid = ?`

    const values = [
        data.nombre,
        data.apellido,
        data.calle,
        data.numero,
        data.piso,
        data.tel,
        data.delivery,
        uuid
    ]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        } else {
            console.log(`Pedido actualizado - UUID: ${uuid}`)
            res.send({code: 200, mensaje: "Datos actualizados!"})
        }
    })

    connection.end()
}

// ------ METODOS PARA CONSULTAS --------------------

const listarConsultas = (res) => {
    const connection = newConn()
    const query = `SELECT * FROM consultas`

    connection.query(query, (err, rows) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        res.json(rows)
    })

    connection.end()
} 

const altaConsulta = (data, res) => {
    const connection = newConn()

    const query = `INSERT INTO consultas
    (uuid, nombre, apellido, mail, motivo, mensaje)
    VALUES (?, ?, ?, ?, ?, ?)`

    const uuidValue = uuidModule.v6() 

    const values = [
        uuidValue,
        data.nombre,
        data.apellido,
        data.mail,
        data.motivo,
        data.mensaje
    ]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        } else {
            console.log(`Consulta ingresado - UUID: ${uuidValue}`)
            res.send({code: 200, mensaje: "Datos creados!"})
        }
    })

    connection.end()
}

const bajaConsulta = (uuid, res) => {
    const connection = newConn()
    const query = `DELETE FROM consultas WHERE uuid = ?`

    const values = [uuid]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log(`Consulta eliminada - UUID: ${uuid}`)
        res.send({code: 200, mensaje: "Datos eliminados"})
    })

    connection.end()
}


// ------ METODOS PARA USUARIOS ---------------------

const listarUsuarios = (res) => {
    const connection = newConn()

    const columns = ['user', 'last_loggin'] // Reemplaza con los nombres de las columnas que quieres seleccionar
    const query = `SELECT ${columns.join(', ')} FROM usuarios`

    connection.query(query, (err, rows) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        res.json(rows)
    })

    connection.end()
}

const consultaUsuario = (user, callbakc) => {

    const connection = newConn()
    const query = `SELECT * FROM usuarios WHERE user = ?`

    const values = [user]

    connection.query(query, values, callbakc)
}

const altaUsuario = (data) => {
    const connection = newConn()

    const query = `INSERT INTO usuarios
    (user, pass, last_loggin)
    VALUES (?, ?, ?)`

    const values = [
        data.user,
        data.pass,
        new Date()
    ]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        } else {
            console.log(`Usuario ${data.user} creado`)
        }
    })

    connection.end()
}

const bajaUsuario = (user, res) => {
    const connection = newConn()
    const query = `DELETE FROM usuarios WHERE user = ?`

    const values = [user]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log(`${user} eliminado`)
        res.send({code: 200, mensaje: "Datos eliminados"})
    })

    connection.end()
}

const updateLogginTime = (user) => {
    const connection = newConn()
    const query = `UPDATE usuarios SET last_loggin = ? WHERE user = ?`

    const values = [user]

    connection.query(query, new Date(), (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log(`${user} eliminado`)
    })

    connection.end()
}

// --------------------------------------------------

module.exports = {
    initDB,
    newConn, 
    listarPedidos,
    altaPedido,
    eliminarPedido,
    actualizarPedido,
    listarConsultas,
    altaConsulta,
    bajaConsulta,
    consultaUsuario,
    altaUsuario,
    bajaUsuario,
    updateLogginTime,
    listarUsuarios
}
