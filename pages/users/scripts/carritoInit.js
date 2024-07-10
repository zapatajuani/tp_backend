/* --------- Carrito --------- */

let carrito = sessionStorage.getItem("carrito")
const carritoDicc = JSON.parse(carrito)

/* --------- Elementos html --------- */

let lista = document.querySelector(".lista-elementos")
let total = document.querySelector(".total")

/* ------------ Funciones ------------ */

const getItemLista = (id) => {

    let precio = formatearPrecio(carritoDicc[id].total)

    let liElement = document.createElement("li")
    liElement.classList.add("list-item")
    liElement.innerHTML = `<p class="producto">${dicc[id].name} x ${carritoDicc[id].quantity}</p>
    <p class="precio">${precio}</p>`

    lista.insertAdjacentElement("afterbegin", liElement)
}

/* ---------------------------------------- */

let aux = 0

Object.keys(carritoDicc).forEach(key => {
    aux += carritoDicc[key].total
    getItemLista(key)
})

if (aux === 0) {
    total.innerHTML = "$ - "
} else {
    total.innerHTML = formatearPrecio(aux)
}