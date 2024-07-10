let envVars = sessionStorage.getItem('env')
let envVarsDicc = JSON.parse(envVars)

/* ------ Valores de form --------- */

let nombre = document.querySelector("#name")
let apellido = document.querySelector("#surname")
let mail = document.querySelector("#email")
let motivo = document.querySelector("#motive")
let mensaje = document.querySelector("#message")

/* ------ Etiquetas de error ------- */

let errorNombre = document.querySelector("#error001")
let errorApellido = document.querySelector("#error002")
let errorEmail1 = document.querySelector("#error003")
let errorEmail2 = document.querySelector("#error004")
let errorMensaje = document.querySelector("#error005")
let errorSubmit = document.querySelector("#error006")

/* ------------- FLAGS ---------------- */

let nombreFlag = false
let apellidoFlag = false
let emailFlag1 = false
let emailFlag2 = false
let mensajeFlag = false

/* --------------Funciones--------- */

const validarEmail = (email) => {
    const regex = /^(?![_.-])[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+(\.[a-z]+)*$/
    return regex.test(email)
}

/* ------------------ Validaciones -------------- */

nombre.addEventListener("blur", (e) => {
    if (e.target.value <= 0 && !nombreFlag) {
        errorNombre.classList.toggle("hide")
        nombreFlag = true
    } else if (e.target.value && nombreFlag) {
        errorNombre.classList.toggle("hide")
        nombreFlag = false
    }
})

apellido.addEventListener("blur", (e) => {
    if (e.target.value <= 0 && !apellidoFlag) {
        errorApellido.classList.toggle("hide")
        apellidoFlag = true
    } else if (e.target.value && apellidoFlag) {
        errorApellido.classList.toggle("hide")
        apellidoFlag = false
    }
})

mail.addEventListener("blur", (e) => {
    if (e.target.value <= 0 && !emailFlag1) {
        errorEmail1.classList.toggle("hide")
        emailFlag1 = true
    } else if (e.target.value && emailFlag1) {
        errorEmail1.classList.toggle("hide")
        emailFlag1 = false
    }

    if (!validarEmail(e.target.value) && !emailFlag2) {
        errorEmail2.classList.toggle("hide")
        emailFlag2 = true
    } else if (validarEmail(e.target.value) && emailFlag2) {
        errorEmail2.classList.toggle("hide")
        emailFlag2 = false
    }
})

mensaje.addEventListener("blur", (e) => {
    if (e.target.value <= 0 && !mensajeFlag) {
        errorMensaje.classList.toggle("hide")
        mensajeFlag = true
    } else if (e.target.value && mensajeFlag) {
        errorMensaje.classList.toggle("hide")
        mensajeFlag = false
    }
})

/* ------ Carga de formulario ------- */

document.querySelector("#contactanos-form").addEventListener("submit", (e) => {

    if ((!nombreFlag && !apellidoFlag && !emailFlag1 && !emailFlag2 && !mensajeFlag) &&
        (nombre.value && apellido.value && mensaje.value && mail.value)) {
        e.preventDefault()
        
        /* Envio al backend */

        const mensajeContacto = {
            nombre: nombre.value,
            apellido: apellido.value,
            mail: mail.value,
            motivo: motivo.value,
            mensaje: mensaje.value
        }

        fetch(`http://${envVarsDicc.host}:${envVarsDicc.port}/consultas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensajeContacto)
        }).finally(
            window.location.href = "./envioExitoso.html"
        )

    } else {
        e.preventDefault()
        if (errorSubmit.classList.contains("hide")) {
            errorSubmit.classList.toggle("hide")
        }
    }    
})
