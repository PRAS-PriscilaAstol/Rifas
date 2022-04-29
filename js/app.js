function Utilui() {
        let form = {};
        let ticket = {};
        let dataSubmit = {
            premio: '"Un Postre"',
            precioN: "$20",
            cantidadInicialN: 1 ,
            cantidadNFinalN: 5,
            fechaSorteo: 	"2022-04-29",
            contactoNombre: "Tito",
            contactoNumero: 099999999,
            contactoRedSocial: "@comidagg",
        };
        let fechaHoy;
        function getforInput() {
                return {
                    premio: document.getElementById("premio"),
                    precioN: document.getElementById("precioN"),
                    cantidadInicialN: document.getElementById("cantidadInicialN"),
                    cantidadNFinalN: document.getElementById("cantidadNFinalN"),
                    fechaSorteo: document.getElementById("fechaSorteo"),
                    contactoNombre: document.getElementById("contactoNombre"),
                    contactoNumero: document.getElementById("contactoNumero"),
                    contactoRedSocial: document.getElementById("contactoRedSocial"),
                };
            }
        function getform(){
                return document.getElementById("form");
            }
        function guardar(){

                validaInputConCondiccion();
                let dataGetForm = getform();
                if(!dataGetForm.checkValidity()){
                    dataGetForm.classList.add("was-validated");
                }else{
                    dataGetForm.classList.remove("was-validated");
                    debugger
                    let infoInput = getforInput();
                    let listInput = Object.keys(infoInput);
                    for (var i = 0; i < listInput.length; i++) {
                        dataSubmit[listInput[i]] = infoInput[listInput[i]].value;
                        debugger
                    }
                    actualizarRifa();
                }
        }
        function actualizarRifa(){
            
            let fechaSeleccionada = dataSubmit.fechaSorteo; //creo variable con la fecha
            let fecha = new Date(fechaSeleccionada); // creo variable fecha con Data (fecha) 
            let diaSeleccionado = fecha.getDate()+1; ///guardo el dia seleccionado +1, porq toLocaleDateString() le quita 1 
            fecha.setDate(diaSeleccionado); // cambio la fecha de fecha con setData

            dataSubmit.fechaSorteo= fecha.toLocaleDateString();///pone la fecha en orden dd/mm/aa

            //este if oculta el texto de red Social cunado no se le asigna valor
            if(dataSubmit.contactoRedSocial ==""){
                document.getElementById('textInputRedSocial').style.display = 'none';
            }else{
                document.getElementById('textInputRedSocial').style.display = 'block';
            }
            debugger
            ////mostrar botones de descarga y vista previa
            document.getElementById('descargarPDF').style.display = 'block';
            document.getElementById('mostrarTiketTot').style.display = 'block';
            

            ///inserta  los valores puestos a la tabla
            let keyData = Object.keys(dataSubmit); 
            for(var i = 0 ; i < keyData.length; i++){
                if(document.getElementById("talon" + keyData[i])){
                    document.getElementById("talon" + keyData[i]).innerHTML = dataSubmit[keyData[i]];
                }
                if(document.getElementById("ticket" + keyData[i])){
                    document.getElementById("ticket" + keyData[i]).innerHTML = dataSubmit[keyData[i]];
                }

            }
            repiteRifa("tiketsTot")
        }

        function fechaActual(){
            let fecha = new Date(); //Fecha actual
            let mes = fecha.getMonth()+1; //obteniendo mes
            let dia = fecha.getDate(); //obteniendo dia
            let ano = fecha.getFullYear(); //obteniendo año
            if(dia<10){
              dia='0'+dia;
            }  //agrega cero si el menor de 10
            if(mes<10){
              mes='0'+mes //agrega cero si el menor de 10
            document.getElementById('fechaSorteo').value=ano+"-"+mes+"-"+dia;
            }
            fechaHoy  = ano+"-"+mes+"-"+dia ;
            ;
        }

        ///le establece un minimo a la fecha del sorteo, que no puede elegir fechas pasadas, solo a partir de (hoy)
        function minFecha(){
            document.getElementById("fechaSorteo").min= fechaHoy;
        }
        

        ///cancelar vacis todos los valores de los input dentro de form
        function cancelar(){
            let elementinputs = getform().getElementsByTagName("input");
            for(var i = 0 ; i < elementinputs.length ; i++){
                var input = elementinputs[i];
                input.value = "";
            }
        }

        function validaInputConCondiccion(){
            let inputMayor = document.getElementById("cantidadNFinalN");
            let inputComparar= document.getElementById("cantidadInicialN");
            debugger
            if(inputMayor.value < inputComparar.value){
                /// inputMayor.classList.add("was-validated");
                inputMayor.setCustomValidity('Tiene que ser mayor o igual a ' + inputComparar.value);
            } else {
                inputMayor.setCustomValidity('');
              }
            
            inputMayor.reportValidity();
        }
        
        function mostrarTiketTot(){
            if($("#tiketsTot").is(':visible')){
                $('#tiketsTot').hide()
            }else{
                $('#tiketsTot').show()
            }
        }


        ///MUESTRA TODAS LAS RIFAS EN TiketsTot
        function repiteRifa(contenedorID){
            $("#" + contenedorID).empty()

            let numberInicio = $("#cantidadInicialN").val();
            let numberFinal = $("#cantidadNFinalN").val();
            debugger
            for(var i =  numberInicio ; i <= numberFinal ; i++){
                let a = document.getElementById("tiketMuestra")
                
                $("#talonNumber").text(i);
                $("#ticketNumber").text(i);
                let b = document.importNode(a,true)
                
                debugger
                document.getElementById(contenedorID).appendChild(b)
            }
        }
        
        ///descarga el pdf 
        function descargarPDF(){
            if ($("#tiketsTot").is(':visible')){
                let a = document.getElementById("tiketsTot");
                let opt = {
                    margin:       1,
                    filename:     'rifas.pdf',
                };
                html2pdf().set(opt).from(a).save();
            }else{
                mostrarTiketTot()
                let a = document.getElementById("tiketsTot");
                let opt = {
                    margin:       1,
                    filename:     'rifas.pdf',
                };
                html2pdf().set(opt).from(a).save();
            }
        }

        form.getform = getform;
        form.getforInput = getforInput;
        form.fechaActual = fechaActual();
        form.minFecha= minFecha();

        ticket.actualizarRifa = actualizarRifa() ;
        ticket.dataSubmit = dataSubmit;

        const data = {
            form : form,
            ticket : ticket,
            guardar : guardar,
            cancelar : cancelar,
            descargarPDF : descargarPDF,
            mostrarTiketTot : mostrarTiketTot
        }
        return data;
}
let rifa = Utilui();