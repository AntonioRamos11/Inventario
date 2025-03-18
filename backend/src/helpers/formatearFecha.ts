function formatearFecha (fecha:Date):string{
    //formateamos la fecha en el formato general que usamos
    //dd-mm-yyyy
    let dia = fecha.getDate()
    let mes = fecha.getMonth() + 1
    let anio = fecha.getFullYear()
    let hora = fecha.getHours()
    let minutos = fecha.getMinutes()
    let segundos = fecha.getSeconds()
    return `${dia}-${mes}-${anio} ${hora}:${minutos}:${segundos}`
    
}