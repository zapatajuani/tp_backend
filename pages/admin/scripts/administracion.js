const mainContainerPedidos = document.querySelector(".lista-usuarios")

const btn = document.getElementById("userCreation")
const newUser = document.getElementById("new-user")
const newPass = document.getElementById("new-pass")
const rNewPass = document.getElementById("r-new-pass")

const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port
const url = `${protocol}//${hostname}${port ? ":"+port : "" }/`

btn.addEventListener("click", () => {

    if (!newUser.value || !newPass.value || !rNewPass.value) {
        newUser.classList.toggle("alarm")
        newPass.classList.toggle("alarm")
        rNewPass.classList.toggle("alarm")
        setTimeout(() => {
            newUser.classList.toggle("alarm")
            newPass.classList.toggle("alarm")
            rNewPass.classList.toggle("alarm")
        }, 1000)
    } else if (newPass.value != rNewPass.value) {
        newPass.classList.toggle("alarm")
        rNewPass.classList.toggle("alarm")
        setTimeout(() => {
            newPass.classList.toggle("alarm")
            rNewPass.classList.toggle("alarm")
        }, 1000)
    } else {

        fetch(`${url}users/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user: newUser.value,
                    pass: newPass.value
                }
            )
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un problema al hacer la solicitud.')
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta exitosa:', data)
            alert("Usuario creado exitosamente!")
            location.reload()
        })
        .catch(error => {
            console.error('Error:', error)
        })

    }
})

const borrarUsuario = (btn) => {
    const rta = confirm("Desea eliminar este usuario?")

    if (rta) {
        const user = btn.getAttribute('data-user')
    
        fetch(`${url}users/${user}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un problema al hacer la solicitud.')
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta exitosa:', data)
            alert("Consulta eliminado exitosamente!")
            location.reload()
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }
}

const getHTMLelement = (dicc, date) => { 
    let htmlElemet =
    `<div class="tarjeta-usuario" id="${dicc.user}">
                <div class="cerrar" onclick="borrarUsuario(this)" data-user="${dicc.user}">&times;</div>
                <div class="separadores"><p class="data-title">Usuario</p><p id="user-${dicc.user}"></p>${dicc.user}</div>
                <div class="separadores"><p class="data-title">Ultima Conexion</p><p id="last-loggin-${dicc.user}">${date}</p></div>
    </div>`

    return htmlElemet
}

const getUsers = () => {
    fetch(`${url}users`)
        .then(data => data.text())
        .then((data) => {
            for (const item of JSON.parse(data)) {    

                const date = new Date(item.last_loggin)
                const localDate = date.toLocaleString()

                mainContainerPedidos.insertAdjacentHTML("beforeend", getHTMLelement(item, localDate.replace(",", " -")))
            }
        })
}


getUsers()
setInterval(() => {
    mainContainerPedidos.innerHTML = ''
    getUsers()
}, 60000)
