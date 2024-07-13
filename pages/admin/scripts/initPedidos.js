const mainContainerPedidos = document.querySelector(".main-container")

const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port
const url = `${protocol}//${hostname}${port ? ":"+port : "" }/`

const getHTMLelement = (dicc, lista, total, delivery) => { 
    let htmlElemet =
    `<div class="tarjeta-pedido">
                <h3 class="pedido-titulo" data-id=${dicc.id} id="titulo-${dicc.uuid}">Pedido n° ${dicc.id}</h3>

                <form class="formulario-pedido" id="${dicc.uuid}">

                    <span class="div-label">
                    <label class="etiqueta-label" for="nombre">Nombre:</label>
                    <input value="${dicc.nombre}" class="campo-dato-cliente" type="text" name="nombre" id="nombre-${dicc.uuid}" placeholder="Nombre..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="apellido">Apellido:</label>
                    <input value="${dicc.apellido}" class="campo-dato-cliente" type="text" name="apellido" id="apellido-${dicc.uuid}" placeholder="Apellido..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="calle">Calle:</label>
                    <input value="${dicc.calle}" class="campo-dato-cliente" type="text" name="calle" id="calle-${dicc.uuid}" placeholder="Calle..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="numero">Numero:</label>
                    <input value="${dicc.numero}" class="campo-dato-cliente" type="text" name="numero" id="numero-${dicc.uuid}" placeholder="Numero..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="piso">Piso:</label>
                    <input value="${dicc.piso}" class="campo-dato-cliente" type="text" name="piso" id="piso-${dicc.uuid}" placeholder="Piso..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="tel">Telefono:</label>
                    <input value="${dicc.tel}" class="campo-dato-cliente" type="number" name="tel" id="tel-${dicc.uuid}" placeholder="Telefono..." disabled>
                    </span>

                    <span class="div-label">
                    <label class="etiqueta-label" for="delivery">Entrega:</label>
                    <input value="${delivery}" class="campo-dato-cliente" type="text" name="delivery" id="delivery-${dicc.uuid}" placeholder="Medio de entrega..." disabled>
                    </span>

                </form>

                <ul class="pedido">
                    <li class="titulo-pedido">Pedido</li>
                    ${lista}
                    <li class="total-pedido"><p>TOTAL</p><p>${formatearPrecio(total)}</p></li>
                </ul>

                <div class="botonera">
                    <button class="boton edi" onclick="accionEditar(this)" data-uuid="${dicc.uuid}" data-state="desactivado">EDITAR DATOS</button>
                    <button class="boton del" onclick="accionEliminar(this)" data-uuid="${dicc.uuid}">ELIMINAR PEDIDO</button>
                    <button class="boton end" onclick="accionFinalizar(this)"  data-uuid="${dicc.uuid}">FINALIZAR PEDIDO</button>
                </div>
        </div>`

    return htmlElemet
}

const getPedidos = () => {
    fetch(`${url}pedidos`)
        .then(data => data.text())
        .then((data) => {
            for (const item of JSON.parse(data)) {
    
                const pedido = item.json_products
                let listaProductos = ""
                let delivery = "TAKE-AWAY"
                let total = 0
    
                Object.keys(pedido).forEach((key) => {
                    total += pedido[key].total
    
                    listaProductos = listaProductos + `
                    <li class="producto-pedido">
                        <p>${productsDicc[key].name} x ${pedido[key].quantity}</p>
                        <p>${formatearPrecio(pedido[key].total)}</p>
                    </li>`
                })
                
                if (item.delivery) {
                    delivery = "DELIVERY"
                }
    
                mainContainerPedidos.insertAdjacentHTML("beforeend", getHTMLelement(item, listaProductos, total, delivery))
            }
        })
}


getPedidos()

setInterval(() => {
    mainContainerPedidos.innerHTML = ''
    getPedidos()
}, 60000)
