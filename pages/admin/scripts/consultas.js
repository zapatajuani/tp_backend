const mainContainerPedidos = document.querySelector(".main-container")

const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port
const url = `${protocol}//${hostname}${port ? ":"+port : "" }/`

const borrarConsulta = (btn) => {
    const rta = confirm("Desea eliminar esta consulta?")

    if (rta) {
        const uuid = btn.getAttribute('data-uuid')
    
        fetch(`${url}consultas/${uuid}`, {
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

const getHTMLelement = (dicc) => { 
    let htmlElemet =
    `<div class="tarjeta-consulta" id="${dicc.uuid}">
            
            <div class="title-container">
                <h3 class="titulo">Consulta n° ${dicc.id}</h3>
                <div class="cerrar" onclick="borrarConsulta(this)" data-uuid="${dicc.uuid}">&times;</div>
            </div>

            <div class="datos"><p class="tag-titulo">Nombre:</p><p id="nombre-"${dicc.uuid}">
                ${dicc.nombre}
            </p></div>
            <div class="datos"><p class="tag-titulo">Apellido:</p><p id="apellido-"${dicc.uuid}">
                ${dicc.apellido}
            </p></div>
            <div class="datos"><p class="tag-titulo">Mail:</p><p id="mail-"${dicc.uuid}">
                ${dicc.mail}
            </p></div>
            <div class="datos"><p class="tag-titulo">Motivo:</p><p id="motivo-"${dicc.uuid}">
                ${dicc.motivo}
            </p></div>
            <div class="datos mensaje"><p class="tag-titulo">Mensaje:</p><p class="mensaje-texto" id="mensaje-"${dicc.uuid}">
                ${dicc.mensaje}
            </p></div>
    </div>`

    return htmlElemet
}

const getConsultas = () => {

    fetch(`${url}consultas`)
        .then(data => data.text())
        .then((data) => {
            for (const item of JSON.parse(data)) {    
                mainContainerPedidos.insertAdjacentHTML("beforeend", getHTMLelement(item))
            }
        })
}

getConsultas()

setInterval(() => {
    mainContainerPedidos.innerHTML = ''
    getConsultas()
}, 60000)
