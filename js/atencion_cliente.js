//funcion recuperar lista de clientesPendientes del localstorage
function getListaClientesPendientes() {
    var guardado = localStorage.getItem("clientesPendientes");
    var clientesPendientes = JSON.parse(guardado);
    if(clientesPendientes === null) clientesPendientes = new Array();
    return clientesPendientes;
}
//funcion recuperar total de clientes atendidos hasta el momento
function getTotalAtendidos() {
    var totalAtendidos = localStorage.getItem("totalAtendidos");
    if(totalAtendidos === null) {
        totalAtendidos = 0;
        localStorage.setItem("totalAtendidos",totalAtendidos);
    }
    return totalAtendidos;
}