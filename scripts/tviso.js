/*Archivo JS que contiene las principales funciones para realizar peticiones a la API TViso.
Sim embargo tambien contiene un par de funciones comunes a la mayorias de los archivos .html*/

function getAuthToken(){
	console.log("GetAuthToken");
	$.ajax({
		url:"https://api.tviso.com/auth_token?id_api=3589&secret=ESssUNeaxvxkXb2P4TqA",
		type:"POST",
		dataType: "json",
		success: function(json){
			localStorage.setItem("token",json.auth_token);
		}
	});
}

function search(){
	/*MEDIA - GetMediaByTitle*/
	console.log("Entro al search");
	$.get("https://api.tviso.com/v2/media/search?auth_token="+localStorage.getItem("token")+"&q="+$("#buscador").val(),function(data){
		console.log(data)
		$("#inicioSeries").empty();
		if (data.results.length==0) {
			$("#inicioSeries").append("<p>No hay resultados :(</p>");
		}
		else{
			$("#inicioSeries").append("<ul id='listaElementos'></ul>");
			var elementos=data.results;
			$.each(elementos,function(i,val){
				var rating= redondearDecimal(val.rating,2);
				$("#listaElementos").append("<li class='elemenBusqueda'><div class='imgElem'><img alt='No hay imagen disponible :(' src='https://img.tviso.com/ES/backdrop/w600"+
					val.images.backdrop+"'></div><div class='infoElem'><h2>"+val.originalName+" / "+val.name+
					" ("+val.year+")"+"</h2><p class='infoGenero'>"+val.mainGenre+"</p><p>"+val.shortPlot+
					" </p><p>Rating: "+rating+"</p><button class='btVerMas' onclick='buscarImdb()' idm='"+val.idm+
					 "' mediaType='"+ val.mediaType+"''>Ver más</button></div></li>");
			});
		}
	});
}

function buscarImdb() {
	/*Media - GetMediaFullInfo*/
	/*NO BUSCA POR IMDB, BUSCA POR IDM Y MEDIA TYPE. Despues redirecciona*/
	var obj=$(event.target);
	console.log("Buscar IMDB: "+obj.val());
	localStorage.setItem("idm",obj.attr("idm"));
	localStorage.setItem("mediaType",obj.attr("mediaType"));
	window.location.href ="media.html";
}
function populares(){
	$.ajax({
		url:"https://api.tviso.com/auth_token?id_api=3589&secret=ESssUNeaxvxkXb2P4TqA",
		type:"POST",
		dataType: "json",
		success: function(json){
			localStorage.setItem("token",json.auth_token);
			var token=json;
			/*MEDIA BROWSE-MEDIA*/
			$.get("https://api.tviso.com/v2/media/browse?auth_token="+localStorage.getItem("token"), function(data){
				console.log(data.results.medias);
				var org=true;
				var medias=data.results.medias;
				var iddiv=1;
				/*Por cada media agrego un div con la informacion mas relevante de cada una*/
				$.each(medias, function(i, val){
					var rating= redondearDecimal(val.rating,2);
					if (org) {
						$("#inicioSeries").append("<div class='dosSeries' id='"+iddiv+
							"'><div class='divSerieIzq'><img alt='No hay imagen disponible :(' src='https://img.tviso.com/ES/backdrop/w600"+
							 (medias[i]).images.backdrop+"'><h2 class='titSerie'>"+val.originalName+" / "+val.name+"</h2><p class='descSerie'>"+
							 val.shortPlot+" </p><p class='descSerie'>Rating: "+rating+"</p><button class='btVerMas' onclick='buscarImdb()' idm='"+val.idm+
						 "' mediaType='"+ val.mediaType+"'>Ver más</button></div></div>");
						org=false;
					}
					else{
						org=true;
						$("#"+iddiv).append("<div class='divSerieDer'><img alt='No hay imagen disponible :(' src='https://img.tviso.com/ES/backdrop/w600"+
						 (medias[i]).images.backdrop+"'><h2 class='titSerie'>"+val.originalName+" / "+val.name+
						 "</h2><p class='descSerie'>"+val.shortPlot+" </p><p class='descSerie'>Rating: "+rating+
						 "</p><button class='btVerMas' onclick='buscarImdb()' idm='"+val.idm+
						 "' mediaType='"+ val.mediaType+"'>Ver más</button></div>");
						iddiv++;
					}
				});
				var estrellas=$(".stars-inner");
				$.each(estrellas, function(i,val){
					editarEstrellas(val.value);
				});
			});	
		}
	});
}

function historial(){
	console.log(localStorage.getItem("prueba"));
	window.location.href="historial.html";
}
function compartirAmigo(){
 	/*Redirecciona a la pagina "compartir con un amigo" enviando como parametros la descripcion completa del media que se eligio y su nombre*/
 	var obj=$(event.target);
 	var token=localStorage.getItem("token");
 	var idm=obj.attr("idm");
 	var mediaType=obj.attr("mediaType");
 	console.log(obj.mediaType);
 	var descripcion;
 	$.get("https://api.tviso.com/v2/media/full_info?auth_token="+token+"&idm="+idm+"&mediaType="+mediaType,function(data){
 		console.log(data);
		localStorage.setItem("nombreMedia",obj.attr("nombre"));
		localStorage.setItem("descMedia",data.plot);
		window.location.href ="compartir-con-amigo.html";
 	});
}
function redondearDecimal(numero,decimales){
	var aux=Math.pow(10,decimales);
	var resultado=numero*aux;
	resultado=Math.round(resultado);
	resultado=resultado/ aux;
	return resultado;
}