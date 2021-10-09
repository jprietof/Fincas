var dataItems;
var dataTipo;

function limpiarindex(){
    $("#idFinca").val("");
    $("#addressFinca").val("");
    $("#exensionFinca").val("");
    $("#categoryidFinca").val("");
    $("#nombreFinca").val("");
    $("#idclient").val("");
    $("#nameclient").val("");
    $("#emailclient").val("");
    $("#ageclient").val("");
    $("#idmessage").val("");
    $("#textmessage").val("");
}

function pintarTabla1(items, Tipo) {
    limpiarindex();
    dataItems = items;
    dataTipo = Tipo;
    let myTable = "<table>";
    myTable += "<tr>";
    if (Tipo == "Finca") {
        myTable += "<th>" + "Nombre Finca" + "</th>";
        myTable += "<th>" + "Detalle" + "</th>";
        myTable += "<th>" + "Acciones" + "</th>";
        myTable += "</tr>";
        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            myTable += "<td>" + items[i].name + "</td>";
            myTable += "<td>" + "<button onclick='pintarTabla2(" + i + ")'>Detalle</button>" + "</td>";
            myTable += "<td>" + "<button onclick='eliminarFinca(" + items[i].id + ")'>Eliminar</button>" + "</td>";
        }
    } else if (Tipo == "Cliente") {
        myTable += "<th>" + "Nombre Cliente" + "</th>";
        myTable += "<th>" + "Detalle" + "</th>";
        myTable += "</tr>";
        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            myTable += "<td>" + items[i].name + "</td>";
            myTable += "<td>" + "<button onclick='pintarTabla2(" + i + ")'>Detalle</button>" + "</td>";
        }
    } else if (Tipo == "Mensaje") {
        myTable += "<th>" + "Mensaje" + "</th>";
        myTable += "<th>" + "Detalle" + "</th>";
        myTable += "<th>" + "Acciones" + "</th>";
        myTable += "</tr>";
        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            myTable += "<td>" + items[i].messagetext + "</td>";
            myTable += "<td>" + "<button onclick='pintarTabla2(" + i + ")'>Detalle</button>" + "</td>";
            myTable += "<td>" + "<button onclick='eliminarMensaje(" + items[i].id + ")'>Eliminar</button>" + "</td>";
        }
    }
    myTable += "</tr>";
    myTable += "</table>";
    $("#Tabla1").empty();
    $("#Tabla2").empty();
    $("#Tabla1").append(myTable);
}

function pintarTabla2(identidficador) {
    console.log(dataTipo + " " + identidficador)
    let myTable = "<table>";
    myTable += "<tr>";
    if (dataTipo == "Finca") {
        myTable += "<th>" + "ADDRESS" + "</td>";
        myTable += "<th>" + "EXENSION" + "</td>";
        myTable += "<th>" + "CATEGORY_ID" + "</td>";
        myTable += "<th>" + "NAME" + "</td>";
        myTable += "</tr>";
        myTable += "<tr>";
        //myTable += "<td>" + dataItems[i].id + "</td>";
        myTable += "<td>" + dataItems[identidficador].address + "</td>";
        myTable += "<td>" + dataItems[identidficador].exension + "</td>";
        myTable += "<td>" + dataItems[identidficador].category_id + "</td>";
        myTable += "<td>" + dataItems[identidficador].name + "</td>";
        myTable += "<td>" + "<button onclick='actualizarInformacionFinca(" + dataItems[identidficador].id + ")'>Editar</button>" + "</td>";
    } else if (dataTipo == "Cliente") {
        myTable += "<th>" + "NAME" + "</td>";
        myTable += "<th>" + "EMAIL" + "</td>";
        myTable += "<th>" + "AGE" + "</td>";
        myTable += "</tr>";
        myTable += "<tr>";
        //myTable += "<td>" + dataItems[i].id + "</td>";
        myTable += "<td>" + dataItems[identidficador].name + "</td>";
        myTable += "<td>" + dataItems[identidficador].email + "</td>";
        myTable += "<td>" + dataItems[identidficador].age + "</td>";
        myTable += "<td>" + "<button onclick='actualizarInformacionCliente(" + dataItems[identidficador].id + ")'>Editar</button>" + "</td>";
    } else if (dataTipo == "Mensaje") {
        myTable += "<th>" + "MESSAGETEXT" + "</td>";
        myTable += "</tr>";
        myTable += "<tr>";
        //myTable += "<td>" + dataItems[i].id + "</td>";
        myTable += "<td>" + dataItems[identidficador].messagetext + "</td>";
        myTable += "<td>" + "<button onclick='actualizarInformacionMensaje(" + dataItems[identidficador].id + ")'>Editar</button>" + "</td>";
    }
    myTable += "</tr>";
    myTable += "</table>";
    $("#Tabla2").empty();
    $("#Tabla2").append(myTable);
    if (dataTipo == "Finca") {
        $("#idFinca").val(dataItems[identidficador].id),
        $("#addressFinca").val(dataItems[identidficador].address),
        $("#exensionFinca").val(dataItems[identidficador].exension),
        $("#categoryidFinca").val(dataItems[identidficador].category_id),
        $("#nombreFinca").val(dataItems[identidficador].name)
    } else if (dataTipo == "Cliente") {
        $("#idclient").val(dataItems[identidficador].id),
        $("#nameclient").val(dataItems[identidficador].name),
        $("#emailclient").val(dataItems[identidficador].email),
        $("#ageclient").val(dataItems[identidficador].age)
    } else if (dataTipo == "Mensaje") {
        $("#idmessage").val(dataItems[identidficador].id),
        $("#textmessage").val(dataItems[identidficador].messagetext)
    }
}

function eliminarFinca(idFinca) {
    console.log("Eliminar Finca")
    let mydata = {
        id: idFinca
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "delete",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            consultarInformacionFinca();
        }, error: function (xhr, status) {
            console.log(status)
            consultarInformacionFinca();
        }
    });
}

function guardarInformacionFinca() {
    console.log("Guardar informacion finca")
    let myData = {
        address: $("#addressFinca").val(),
        exension: $("#exensionFinca").val(),
        category_id: $("#categoryidFinca").val(),
        name: $("#nombreFinca").val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData)
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "post",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            consultarInformacionFinca();
        }, error: function (xhr, status) {
            console.log(status)
            consultarInformacionFinca();
        }
    });
}

function actualizarInformacionFinca(IDActualizarFinca) {
    console.log("actualizar informacion finca")
    if (IDActualizarFinca == $("#idFinca").val()) {
        let myData = {
            id: IDActualizarFinca,
            address: $("#addressFinca").val(),
            exension: $("#exensionFinca").val(),
            category_id: $("#categoryidFinca").val(),
            name: $("#nombreFinca").val()
        };
        let dataToSend = JSON.stringify(myData);
        console.log(myData)
        $.ajax({
            url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm',
            type: "put",
            data: dataToSend,
            contentType: "application/JSON",
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta);
                consultarInformacionFinca();
            }, error: function (xhr, status) {
                console.log(status)
                consultarInformacionFinca();
            }
        });
    }
}

function consultarInformacionFinca() {
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "get",
        datatype: "json",
        success: function (respuesta) {
            console.log(respuesta);
            $("Tabla1").html("");
            pintarTabla1(respuesta.items, "Finca");
        }
    })
    console.log("Consultar informacion finca")
}

function eliminarCliente(idCliente) {
    console.log("Eliminar Cliente")
    let mydata = {
        id: idCliente
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        type: "delete",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            consultarInformacionCliente();
        }, error: function (xhr, status) {
            console.log(status)
            consultarInformacionCliente();
        }
    });
}

function guardarInformacionCliente() {
    console.log("Guardar informacion cliente")
    let myData = {
        name: $("#nameclient").val(),
        email: $("#emailclient").val(),
        age: $("#ageclient").val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData)
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        type: "post",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            consultarInformacionCliente();
        }, error: function (xhr, status) {
            console.log(status)
            consultarInformacionCliente();
        }
    });
}

function actualizarInformacionCliente(IDActualizarCliente) {
    console.log("actualizar informacion finca")
    if (IDActualizarCliente == $("#idclient").val()) {
        let myData = {
            id: IDActualizarCliente,
            name: $("#nameclient").val(),
            email: $("#emailclient").val(),
            age: $("#ageclient").val()
        };
        let dataToSend = JSON.stringify(myData);
        console.log(myData)
        $.ajax({
            url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type: "put",
            data: dataToSend,
            contentType: "application/JSON",
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta);
                consultarInformacionCliente();
            }, error: function (xhr, status) {
                console.log(status)
                consultarInformacionCliente();
            }
        });
    }
}

function consultarInformacionCliente() {
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        type: "get",
        datatype: "json",
        success: function (respuesta) {
            console.log(respuesta);
            $("Tabla1").html("");
            pintarTabla1(respuesta.items, "Cliente");
        }
    })
    console.log("Consultar informacion Cliente")
}

function eliminarMensaje(idMensaje) {
    console.log("Eliminar Mensaje")
    let mydata = {
        id: idMensaje
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type: "delete",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            consultarInformacionMensaje();
        }, error: function (xhr, status) {
            console.log(status)
            consultarInformacionMensaje();
        }
    });
}

function guardarInformacionMensaje() {
    console.log("Guardar informacion Mensaje")
    let myData = {
        messagetext: $("#textmessage").val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData)
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type: "post",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            consultarInformacionMensaje();
        }, error: function (xhr, status) {
            console.log(status)
            consultarInformacionMensaje();
        }
    });
}

function actualizarInformacionMensaje(IDActualizarMensaje) {
    console.log("actualizar informacion mensaje")
    if (IDActualizarMensaje == $("#idmessage").val()) {
        let myData = {
            id: IDActualizarMensaje,
            messagetext: $("#textmessage").val()
        };
        let dataToSend = JSON.stringify(myData);
        console.log(myData)
        $.ajax({
            url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type: "put",
            data: dataToSend,
            contentType: "application/JSON",
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta);
                consultarInformacionMensaje();
            }, error: function (xhr, status) {
                console.log(status)
                consultarInformacionMensaje();
            }
        });
    }
}

function consultarInformacionMensaje() {
    $.ajax({
        url: 'https://g07861b2ce04378-db202109261306.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type: "get",
        datatype: "json",
        success: function (respuesta) {
            console.log(respuesta);
            $("Tabla1").html("");
            pintarTabla1(respuesta.items, "Mensaje");
        }
    })
    console.log("Consultar informacion Mensaje")
}