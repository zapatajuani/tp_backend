let carrito = sessionStorage.getItem("carrito") 

const separateNumeros = (num) => {
	let unidad = 0
	let centena = 0

	if (num < 10) {
		unidad=num 
		centena=null
	} else {
		while (num >= 10) {
			num = num - 10
			centena = centena + 1
			unidad = num
		}
	}
	
	return [unidad, centena]
}


function saveData(id) {
    sessionStorage.setItem('selectedItem', id)
}

if (!carrito) {
    sessionStorage.setItem("carrito",JSON.stringify({}))
} else {

    const carritoDicc = JSON.parse(carrito)

    Object.keys(carritoDicc).forEach(key => {

        let padre = document.querySelector("#" + key)
        let child = padre.querySelector(".amount")
        let cantidad = carritoDicc[key].quantity 

        let [unidad, centena] = separateNumeros(cantidad)

        if (centena) {
            child.innerHTML = `<i class="bi bi-${centena}-square-fill"></i><i class="bi bi-${unidad}-square-fill"></i>`
        } else {
            child.innerHTML = `<i class="bi bi-${unidad}-square-fill"></i>`
        }

    })  
}  
