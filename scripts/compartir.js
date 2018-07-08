$(document).ready(function(){
	$("#btEnviar").click(enviarMail);
	var informacion=localStorage.getItem("nombreMedia");
	informacion=informacion+": \n"+localStorage.getItem("descMedia");
	$("#txtInfo").val(informacion);
	$("#btBuscar").click(search);
	$("#nombre").bind({keypress:soloLetrasTecla, change:soloLetrasCaP});
	$("#apellido").bind({keypress:soloLetrasTecla, change:soloLetrasCaP});

});

function enviarMail(event){
	event.preventDefault();
	var validar=validarForm();
	console.log(validar);
	if(validar){
		var dest=$("#correoDestino").val();
		var mensaje=$("#mensaje").val();
		mensaje=mensaje+"\n"+$("#txtInfo").val();
		var nom=$("#nombre").val();
		var ape=$("#apellido").val();
		if (nom!="" || ape!="") {
			mensaje=mensaje+"\n Con cariño: "+nom+" "+ape;
		}
		window.location.href="mailto:"+dest+"?subject=SeriesLibres&body="+mensaje;
	}

}

function validarForm(){
	var dest=$("#correoDestino").val();
	console.log(dest);
	if (dest=="") {
		alert("Complete los campos obligatorios marcados con (*) por favor.");
		return false;
	}else{
		var contArroba=false;
		for (var i =dest.length - 1; i >= 0; i--) {
			if(dest[i]=='@'){
				contArroba=true;
			}
		}
		if (contArroba==false){
			alert("Por favor, ingrese una dirección de email valida.");
			return false;
		}
	}
	var opcionales=$(".optional");
	console.log(opcionales);
	var sinNum=true;
	$.each(opcionales,function(index,valor){
		console.log("Valor: "+$(valor).val());
		var pal=valor.value;
		for (var i = pal.length - 1; i >= 0; i--) {
			var v=pal.charCodeAt(i);
			if ((65<=v && v<=90) || (97<=v && v<=122) || (160<=v && v<=165) || v==32) {
				
			}
			else{
				alert("Por favor, ingrese caracteres validos en Nombre y Apellido");
				sinNum=false;
				return;
			}
		}
	});
	if (sinNum) {
		return true;
	}
	else{
		return false;
	}
}
/*Funcion validadora que solo permite letras al presionar una tecla*/
function soloLetrasTecla(){
	var evento= window.event;
	var codCaracter=evento.charCode;
	if ((65<=codCaracter && codCaracter<=90) || (97<=codCaracter && codCaracter<=122) || (160<=codCaracter && codCaracter<=165) || codCaracter==32) {
		
	}
	else{
		window.event.preventDefault();
	}
}

/*Funcion validadora que se activa cuando se copia y pega en un input*/
function soloLetrasCaP(){
	var input= window.event.target;
	var pal=input.value;
	var validar=true;
	for (var i = pal.length - 1; i >= 0; i--) {
		var v=pal.charCodeAt(i);
		if ((65<=v && v<=90) || (97<=v && v<=122) || (160<=v && v<=165) || v==32) {
		}
		else{
			validar=false;
			window.event.preventDefault();
		}
	}
	if (validar==false){
		input.value="";	
	}
}

 