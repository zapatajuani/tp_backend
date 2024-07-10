/* ELEMENTOS DEL DOCUMENT */

let imagen = document.querySelector(".selected-item-img")
let titulo = document.querySelector(".selected-item-title")
let desc = document.querySelector(".selected-item-desc")
let precio = document.querySelector(".selected-item-price")
let total = document.querySelector(".total")

/* ------ VARIABLES ----- */

let isInCart = false

/* ---------------------- */

function recoverData (id) {
    let carrito = JSON.parse(sessionStorage.getItem('carrito'))

    imagen.src = dicc[id].img
    titulo.innerHTML = dicc[id].name
    desc.innerHTML = dicc[id].desc
    precio.innerHTML = formatearPrecio(dicc[id].price)

    if (carrito[id]) {
        cantidad.innerHTML = carrito[id].quantity
        total.innerHTML = formatearPrecio(carrito[id].total)
        botonAdd.innerHTML = `MODIFICAR (${formatearPrecio(carrito[id].total)})`

        isInCart = true
    } else {
        total.innerHTML = formatearPrecio(dicc[id].price)
        botonAdd.innerHTML = `AGREGAR (${formatearPrecio(dicc[id].price)})`
    }

}


window.onload = function() {
    const selectedItemID = sessionStorage.getItem('selectedItem')
    recoverData(selectedItemID)
}
