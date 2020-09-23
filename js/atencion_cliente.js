var listaRE;
var listaCE;
var listaRR;
var listaAC;
var listaQQ;

//funcion recuperar lista de clientesPendientes del localstorage
function getListaClientesPendientes() {
    var guardado = localStorage.getItem("clientesPendientes");
    var clientesPendientes = JSON.parse(guardado);
    if (clientesPendientes === null) clientesPendientes = new Array();
    return clientesPendientes;
}
//funcion para recuperar el total de empleados atendidos por todos los empleados
function getTotalAtendidos() {
    var guardado = localStorage.getItem("totalAtendidos");
    if (guardado === null) guardado = 0;
    return guardado;
}
//funcion recuperar total de clientes atendidos hasta el momento por el empleado
function getTotalAtendidosPorEmpleado() {
    var totalAtendidos = JSON.parse(sessionStorage.getItem("totalAtendidosPorEmpleado"));
    if (totalAtendidos === null) {
        totalAtendidos = new Array();
        sessionStorage.setItem("totalAtendidosPorEmpleado", JSON.stringify(totalAtendidos));
    }
    return totalAtendidos;
}

//funcion para eliminar turnos viejos de la tabla                               
function limpiarNodo(node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
};


//establecer q la funcion de actualizacion se ejecute cada medio segundo
setInterval(actualizar, 500);

//establecer listeners para los botones
document.getElementById("btnAtenderRE").addEventListener("click", atenderCliente);
document.getElementById("btnAtenderCE").addEventListener("click", atenderCliente);
document.getElementById("btnAtenderRR").addEventListener("click", atenderCliente);
document.getElementById("btnAtenderAC").addEventListener("click", atenderCliente);
document.getElementById("btnAtenderQQ").addEventListener("click", atenderCliente);

function actualizar() {
    listaRE = new Array();
    listaCE = new Array();
    listaRR = new Array();
    listaAC = new Array();
    listaQQ = new Array();
    //actualizar listas logicas
    var listaPendientes = getListaClientesPendientes();
    for (var i = 0; i < listaPendientes.length; i++) {
        if (listaPendientes[i][1] == "RE") {
            listaRE.push(listaPendientes[i]);
        } else if (listaPendientes[i][1] == "CE") {
            listaCE.push(listaPendientes[i]);
        } else if (listaPendientes[i][1] == "RR") {
            listaRR.push(listaPendientes[i]);
        } else if (listaPendientes[i][1] == "AC") {
            listaAC.push(listaPendientes[i]);
        } else {
            listaQQ.push(listaPendientes[i]);
        }
    }

    //actualizar las listas visuales
    limpiarNodo(document.getElementById("listaRE"));
    for (var i = 0; i < listaRE.length; i++) {
        var doc = document.createElement("tr");
        doc.innerHTML = listaRE[i][2] + " | "+ listaRE[i][0];
        doc.classList.add("is-size-7","has-text-weight-light");
        document.getElementById("listaRE").appendChild(doc);
    }
    limpiarNodo(document.getElementById("listaCE"));
    for (var i = 0; i < listaCE.length; i++) {
        var doc = document.createElement("p");
        doc.innerHTML = listaCE[i][0];
        doc.classList.add("is-family-code");
        document.getElementById("listaCE").appendChild(doc);
    }
    limpiarNodo(document.getElementById("listaRR"));
    for (var i = 0; i < listaRR.length; i++) {
        var doc = document.createElement("p");
        doc.innerHTML = listaRR[i][0];
        doc.classList.add("is-family-code");
        document.getElementById("listaRR").appendChild(doc);
    }
    limpiarNodo(document.getElementById("listaAC"));
    for (var i = 0; i < listaAC.length; i++) {
        var doc = document.createElement("p");
        doc.innerHTML = listaAC[i][0];
        doc.classList.add("is-family-code");
        document.getElementById("listaAC").appendChild(doc);
    }
    limpiarNodo(document.getElementById("listaQQ"));
    for (var i = 0; i < listaQQ.length; i++) {
        var doc = document.createElement("p");
        doc.innerHTML = listaQQ[i][0];
        doc.classList.add("is-family-code");
        document.getElementById("listaQQ").appendChild(doc);
    }
    document.getElementById("totalRE").innerHTML = listaRE.length;
    document.getElementById("totalCE").innerHTML = listaCE.length;
    document.getElementById("totalRR").innerHTML = listaRR.length;
    document.getElementById("totalAC").innerHTML = listaAC.length;
    document.getElementById("totalQQ").innerHTML = listaQQ.length;

    //mostrar total atendidos
    var listaAtendidos = getTotalAtendidosPorEmpleado();
    document.getElementById("totalAtendidosPorEmpleado").innerHTML = listaAtendidos.length;
    limpiarNodo(document.getElementById("listaAtendidos"));
    for (var i = 0; i < listaAtendidos.length; i++) {
        var doc = document.createElement("p");
        doc.innerHTML = listaAtendidos[i][0];
        doc.classList.add("is-size-7");
        document.getElementById("listaAtendidos").appendChild(doc);
    }
}

function atenderCliente(e) {
    var cliente;
    var nombreBoton = e.target.getAttribute('id');
    if (nombreBoton == "btnAtenderRE") cliente = listaRE.shift();
    else if (nombreBoton == "btnAtenderCE") cliente = listaCE.shift();
    else if (nombreBoton == "btnAtenderRR") cliente = listaRR.shift();
    else if (nombreBoton == "btnAtenderAC") cliente = listaAC.shift();
    else cliente = listaQQ.shift();
    if (cliente != null) {
        var clientesPendientes = getListaClientesPendientes();
        //remove
        var guardar = clientesPendientes.filter(function (value, index, arr) { return !(value[1] == cliente[1] && value[2] == cliente[2]); });
        localStorage.setItem("clientesPendientes", JSON.stringify(guardar));
        //actualizamos el total de atendidos por toda la empresa en 1 mas
        localStorage.setItem("totalAtendidos", parseInt(getTotalAtendidos()) + 1);
        //actualizamos el total atendidos por el empleado de esta sesion
        var clientesAtendidosPorEmpleado = getTotalAtendidosPorEmpleado();
        clientesAtendidosPorEmpleado.push(cliente);
        sessionStorage.setItem("totalAtendidosPorEmpleado", JSON.stringify(clientesAtendidosPorEmpleado));
        console.log("Pendientes: " + guardar);
        console.log("Cliente: " + cliente);
        console.log("Atendidos: " + clientesAtendidosPorEmpleado);
    } else (alert("boludo, queres eliminar de un array vacio"));

}