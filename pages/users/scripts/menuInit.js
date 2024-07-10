/* ELEMENTOS DEL DOCUMENT */

let contenedor = document.querySelector(".main")

Object.keys(dicc).forEach(key => {

    let precio = formatearPrecio(dicc[key].price)

    let HTMLcontent = `<a href="pages/item.html" class="item" id="${key}" onclick="saveData(this.id)">
    <img src="${dicc[key].img.substring(3)}" alt="${dicc[key].name}">
    <span>
    <p class="title">${dicc[key].name}</p>
    <p class="desc">${dicc[key].desc}</p>
    <span class="price">
        <span class="amount"></span>
        <p class="value">${precio}</p>
    </span>
    </span>
    </a>`

    contenedor.insertAdjacentHTML("afterbegin", HTMLcontent)
})


