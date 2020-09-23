//funcion para recuperar nombre de usuario de esta sesion
function getUsuarioSesion() {
    var guardado = sessionStorage.getItem("usuario");       
    return guardado;
}

//funcion para guardar el nombre de uusairo de esta sesion
function setUsuarioSesion(usuario) {
    var guardado = sessionStorage.setItem("usuario",usuario);
}