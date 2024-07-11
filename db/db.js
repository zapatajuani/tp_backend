const db = require("mysql2")
const fs = require("fs")
const uuid = require("uuid")
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

const altaPedido = (data) => {
    const connection = newConn()

    const query = `INSERT INTO pedidos
    (uuid, nombre, apellido, calle, numero, piso, tel, delivery, json_products)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const values = [
        uuid.v6(),
        data.nombre,
        data.apellido,
        data.calle,
        data.numero,
        data.piso,
        data.tel,
        data.delivery,
        JSON.stringify(data.productos)
    ]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        } else {
            console.log('Fila insertada!')
        }
    })

    connection.end()
}

const eliminarPedido = (uuid) => {
    const connection = newConn()
    const query = `DELETE FROM pedidos WHERE uuid = ?`

    const values = [uuid]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log('Fila eliminada')
    })

    connection.end()
}

const actualizarPedido = (id, data) => {
    const connection = newConn()

    const query = `UPDATE pedidos
    SET nombre = ?, 
        apellido = ?, 
        calle = ?, 
        numero = ?, 
        piso = ?, 
        tel = ?, 
        delivery = ?, 
        json_products = ?,
    WHERE id_pedido = ?`

    const values = [
        data.nombre,
        data.apellido,
        data.calle,
        data.numero,
        data.piso,
        data.tel,
        data.delivery,
        JSON.stringify(data.productos),
        id
    ]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        } else {
            console.log('Fila actualizada!')
        }
    })

    connection.end()
}

// ------ METODOS PARA CONSULTAS --------------------

const listarConsultas = () => {
    const connection = newConn()
    const query = `SELECT * FROM consultas`

    connection.query(query, (err, rows) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log(rows)
    })

    connection.end()
} 

const altaConsulta = (data) => {
    const connection = newConn()

    const query = `INSERT INTO consultas
    (uuid, nombre, apellido, mail, motivo, mensaje)
    VALUES (?, ?, ?, ?, ?, ?)`

    const values = [
        uuid.v6(),
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
            console.log('Fila insertada!')
        }
    })

    connection.end()
}

const bajaConsulta = (id) => {
    const connection = newConn()
    const query = `DELETE FROM consultas WHERE id = ?`

    const values = [id]

    connection.query(query, values, (err) => {
    
        if (err) {
            console.error('Error ejecutando la consulta')
            throw err
        }

        console.log('Fila eliminada')
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
    bajaConsulta
}
