
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const usuario = urlParams.get("usuario");
        document.getElementById("nombreUsuario").innerHTML = usuario;

        //contadores globales de los turnos
        var turnosRE = 0;
        var turnosCE = 0;
        var turnosRR = 0;
        var turnosAC = 0;
        var turnosQQ = 0;
        
        //registro del listener del boton agregar
        document.getElementById("botonAgregarCliente").addEventListener("click", agregarCliente);

        //actualizacion cada 2 segundos de la lista
        setInterval(actualizar,1000);        
        
        //funcion recuperar lista de clientesPendientes del localstorage
        function getListaClientesPendientes() {
            var guardado = localStorage.getItem("clientesPendientes");
            var clientesPendientes = JSON.parse(guardado);
            if (clientesPendientes === null) clientesPendientes = new Array();
            return clientesPendientes;
        }
        //funcion recuperar total de clientes atendidos hasta el momento
        function getTotalAtendidos() {
            var totalAtendidos = localStorage.getItem("totalAtendidos");
            if (totalAtendidos === null) {
                totalAtendidos = 0;
                localStorage.setItem("totalAtendidos", totalAtendidos);
            }
            return totalAtendidos;
        }

        //implementacion del listener del boton agregar
        function agregarCliente() {
            var nombre = document.getElementById("textNombre").value;
            var selectValue = document.getElementById("selectCodigo").value;
            var tipo = "";
            var nTurno = 0;
            if(selectValue.includes('RE')) {
                tipo = "RE";
                turnosRE++;                
                nTurno = turnosRE;
            } else if(selectValue.includes("CE")) {
                tipo = "CE";
                turnosCE++;
                nTurno = turnosCE;
            } else if(selectValue.includes("RR")) {
                tipo = "RR";
                turnosRR++;
                nTurno = turnosRR;
            } else if(selectValue.includes("AC")) {
                tipo = "AC";
                turnosAC++;
                nTurno = turnosAC;
            }else {
                tipo = "QQ";
                turnosQQ++;
                nTurno = turnosQQ;
            }
            var clientesPendientes = getListaClientesPendientes();
            var clienteNuevo = [nombre,tipo,nTurno];
            clientesPendientes.push(clienteNuevo);
            localStorage.setItem("clientesPendientes",JSON.stringify(clientesPendientes));
        }


        //funcion para eliminar turnos viejos de la tabla                               
        function limpiarNodo(node) {
                var last;
                while (last = node.lastChild) node.removeChild(last);            
            };

        //funcion para actualizar en base a lo guardado en el sotorage
        function actualizar() {            
            var listaClientesPendientes = getListaClientesPendientes();
            var tabla = document.getElementById("sinAtender");
            limpiarNodo(tabla);
            for (var i = 0; i < listaClientesPendientes.length; i++) {              
                var elemNombre = document.createElement("td");
                var elemTurno = document.createElement("td");
                elemNombre.innerHTML = listaClientesPendientes[i][0];
                elemTurno.innerHTML =  '<span class="tag is-'+ getColorTurno(listaClientesPendientes[i][1])+'">' + listaClientesPendientes[i][1]+listaClientesPendientes[i][2] + '<span>';
                var elemRow = document.createElement("tr");
                elemRow.appendChild(elemNombre);
                elemRow.appendChild(elemTurno);
                tabla.appendChild(elemRow);
            }
            document.getElementById("totalPendientes").innerHTML = listaClientesPendientes.length;
            var totalAtendidos = getTotalAtendidos();            
            document.getElementById("totalAtendidos").innerHTML = totalAtendidos;
        }

        //funcion auxiliar
        function getColorTurno(tipoTurno){            
            var color = "light";
            switch (tipoTurno) {
                case 'RE':
                    color = "primary";
                    break;
                case 'CE':
                    color = "success";
                    break;
                case 'RR':
                    color = "info";
                    break;
                case 'AC':
                    color = "dark";
                    break;
                case 'QQ':
                    color = "danger";
                    break;
            }
            return color;
        }  