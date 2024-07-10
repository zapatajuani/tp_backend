/* ELEMENTOS DEL DOCUMENT */

let botonSuma = document.getElementById("plus")
let botonResta = document.getElementById("minus")
let botonAdd = document.getElementById("add")
let botonVolver = document.getElementById("volver")
let cantidad = document.querySelector(".quantity")
// total definido en el otro archivo

/* ------ VARIABLES ----- */

let eliminar = false

/* ----------- Funciones ------------------ */

const updateTotal = (amount) => {
    const selectedItemID = sessionStorage.getItem('selectedItem')
    let aux = formatearPrecio(dicc[selectedItemID].price * amount)
    total.innerHTML = aux

    if (isInCart) {
        botonAdd.innerHTML = `MODIFICAR (${aux})`
    } else {
        botonAdd.innerHTML = `AGREGAR (${aux})`
    }
}

const sumarCantidad =  () => {
    let aux = parseInt(cantidad.innerHTML) + 1
    cantidad.innerHTML = aux
    updateTotal(aux)
}

const restarCantidad =  () => {
    let aux = parseInt(cantidad.innerHTML) - 1
    if (aux > 0) {
        cantidad.innerHTML = aux
        updateTotal(aux)
    } else if (isInCart) {
        cantidad.innerHTML = 0
        botonAdd.innerHTML = `QUITAR`
        eliminar = true
    }
}

const agregarAlCarrito = () => {
    const selectedItemID = sessionStorage.getItem('selectedItem')
    let carrito = JSON.parse(sessionStorage.getItem('carrito'))

    if (eliminar) {
        delete carrito[selectedItemID]
    } else {
        // la cantidad de unidades pasada a un entero
        let aux =  parseInt(cantidad.innerHTML)
    
        carrito[selectedItemID] = {
            quantity: aux,
            total: aux * dicc[selectedItemID].price
        }
    }

    sessionStorage.setItem('carrito',JSON.stringify(carrito))
    
    window.location.href = "../index.html"
}

/* ----------- Event Lsiteners ------------ */

botonSuma.addEventListener("click", sumarCantidad)
botonResta.addEventListener("click", restarCantidad)
botonAdd.addEventListener("click", agregarAlCarrito)
botonVolver.addEventListener("click", ()=>{window.location.href = "../index.html"})
