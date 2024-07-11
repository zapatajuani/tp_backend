function formatearPrecio(numero) {
    // Convierte el número a string y separa la parte entera de la decimal
    var partes = numero.toFixed(2).split('.')
    var parteEntera = partes[0]
    var parteDecimal = partes[1]

    // Agrega un punto cada tres dígitos en la parte entera
    var parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    // Concatena el símbolo de la moneda y el formato completo
    var precioFormateado = '$' + parteEnteraFormateada + ',' + parteDecimal

    return precioFormateado
}