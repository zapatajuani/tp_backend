const mainContainerPedidos = document.querySelector(".main-container")

const getHTMLelement = (dicc, lista, total) => { 
    let htmlElemet =
    `<div class="tarjeta-pedido">
                <h3 class="pedido-titulo">Pedido n° ${dicc.id}</h3>

                <form class="formulario-pedido" id="${dicc.uuid}">

                    <span class="div-label">
                    <label class="etiqueta-label" for="nombre">Nombre:</label>
                    <input value="${dicc.nombre}" class="campo-dato-cliente" type="text" id="nombre ${dicc.uuid}" placeholder="Nombre..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="apellido">Apellido:</label>
                    <input value="${dicc.apellido}" class="campo-dato-cliente" type="text" id="apellido ${dicc.uuid}" placeholder="Apellido..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="calle">Calle:</label>
                    <input value="${dicc.calle}" class="campo-dato-cliente" type="text" id="calle ${dicc.uuid}" placeholder="Calle..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="numero">Numero:</label>
                    <input value="${dicc.numero}" class="campo-dato-cliente" type="text" id="numero ${dicc.uuid}" placeholder="Numero..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="piso">Piso:</label>
                    <input value="${dicc.piso}" class="campo-dato-cliente" type="text" id="piso ${dicc.uuid}" placeholder="Piso..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="tel">Telefono:</label>
                    <input value="${dicc.tel}" class="campo-dato-cliente" type="number" id="tel ${dicc.uuid}" placeholder="Telefono..." disabled>
                    </span>

                </form>

                <ul class="pedido">
                    <li class="titulo-pedido">Pedido</li>
                    ${lista}
                    <li class="total-pedido"><p>TOTAL</p><p>${formatearPrecio(total)}</p></li>
                </ul>

                <div class="botonera">
                    <button class="boton edi">EDITAR</button>
                    <button class="boton del">ELIMINAR</button>
                    <button class="boton end">FINALIZAR</button>
                </div>
        </div>`

    return htmlElemet
}

fetch("http://127.0.0.1:8000/pedidos")
    .then(data => data.text())
    .then((data) => {
        for (const item of JSON.parse(data)) {

            const pedido = item.json_products
            let listaProductos = ""
            let total = 0

            Object.keys(pedido).forEach((key) => {
                total += pedido[key].total

                listaProductos = listaProductos + `
                <li class="producto-pedido">
                    <p>${productsDicc[key].name} x ${pedido[key].quantity}</p>
                    <p>${formatearPrecio(pedido[key].total)}</p>
                </li>`
            })
            
            mainContainerPedidos.insertAdjacentHTML("beforeend", getHTMLelement(item, listaProductos, total))
        }
    })


