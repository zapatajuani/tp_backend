const accionEliminar = (btn) => {
    const rta = confirm("Desea eliminar este pedido?")

    if (rta) {
        const uuid = btn.getAttribute('data-uuid')
    
        fetch(`${url}pedidos/${uuid}`, {
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
            alert("Pedido eliminado exitosamente!")
            location.reload()
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }
}

const accionFinalizar = (btn) => {
    const rta = confirm("Desea concluir este pedido?")

    if (rta) {
        const uuid = btn.getAttribute('data-uuid')
    
        fetch(`${url}pedidos/${uuid}`, {
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
            alert("Pedido finalizado!")
            location.reload()
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }
}

const accionEditar = (btn) => {

    const uuid = btn.getAttribute('data-uuid')
    let state = btn.getAttribute('data-state')
    const nombre = document.getElementById(`nombre-${uuid}`)
    const apellido = document.getElementById(`apellido-${uuid}`)
    const calle = document.getElementById(`calle-${uuid}`)
    const numero = document.getElementById(`numero-${uuid}`)
    const piso = document.getElementById(`piso-${uuid}`)
    const tel = document.getElementById(`tel-${uuid}`)
    const delivery = document.getElementById(`delivery-${uuid}`)

    if (state == "desactivado") {
        btn.setAttribute("data-state", "activo")

        nombre.disabled  = false
        apellido.disabled  = false
        calle.disabled  = false
        numero.disabled  = false
        piso.disabled  = false
        tel.disabled  = false
        delivery.disabled  = false

    } else if ((delivery.value == "DELIVERY") || (delivery.value == "TAKE-AWAY")) {

        btn.setAttribute("data-state", "desactivado")

        nombre.disabled  = true
        apellido.disabled  = true
        calle.disabled  = true
        numero.disabled  = true
        piso.disabled  = true
        tel.disabled  = true
        delivery.disabled  = true

        const formData = {
            nombre: nombre.value,
            apellido: apellido.value,
            calle: calle.value,
            numero: numero.value,
            piso: piso.value,
            tel: tel.value,
            delivery: delivery.value == "DELIVERY" ? true : false,
        }
 
        fetch(`${url}pedidos/${uuid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un problema al hacer la solicitud.')
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta exitosa:', data)
            alert("Datos cambiados exitosamente!")
        })
        .catch(error => {
            console.error('Error:', error)
        })
        
    } else {

        alert("EL medio de envio solo puede ser DELIVERY o TAKE-AWAY")

    }
}
