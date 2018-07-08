$(document).ready(function(){
	$("#btBuscarAvanzado").click(busquedaAvanzada);
	$("#btBuscar").click(search);
	$("#btHistorial").click(historial);
	ultimaConsulta();
});

function busquedaAvanzada(){
	getAuthToken();
	var genero=$("#genero");
	var anio=$("#anio");
	var mediaTypes=document.getElementsByName("media");
	var mediaType;
	var hurl="https://api.tviso.com/v2/media/browse?auth_token="+localStorage.getItem("token");
	if (genero.val()!="none") {
		hurl=hurl+"&genre="+genero.val();
	}
	if (anio.val()!="") {
		hurl=hurl+"&min_year="+anio.val()+"&max_year="+anio.val();
	}
	$.each($(mediaTypes),function(index, value){
		if (value.checked) {
			mediaType= $(value).val();
		}
	});

	if (mediaType!=0){
		hurl=hurl+"&mediaType="+mediaType;
	}
	
	getBrowseMedia(hurl);	
}

 function ultimaConsulta(){
 	var ultima=localStorage.getItem("ultimaBusqueda");
 	if (ultima==null){}
 	else{
		getBrowseMedia(ultima);
 	}
 }

 function getBrowseMedia(hurl){
 	/*MEDIA BROWSE-MEDIA*/
 	localStorage.setItem("ultimaBusqueda",hurl);
	$.get(hurl, function(data){
		console.log(data);
		$("#inicioSeries").empty();
		if (data.results.medias.length==0) {
			$("#inicioSeries").append("<p>No hay resultados :(</p>");
		}
		else{
			$("#inicioSeries").append("<ul id='listaElementos'></ul>");
			var elementos=data.results.medias;
			$.each(elementos,function(i,val){
				var rating= redondearDecimal(val.rating,2);
				$("#listaElementos").append("<li class='elemenBusqueda'><div class='imgElem'><img alt='No hay imagen disponible :(' src='https://img.tviso.com/ES/backdrop/w600"+
					val.images.backdrop+"'></div><div class='infoElem'><h2>"+val.originalName+" / "+val.name+
					" ("+val.year+")"+"</h2><p class='infoGenero'>"+val.mainGenre+"</p><p>"+val.shortPlot+
					" </p><p>Rating: "+rating+"</p><button class='btVerMas2' onclick='buscarImdb()' idm='"+val.idm+
					 "' mediaType='"+ val.mediaType+
					 "''>Ver más</button><button class='btCompartir' onclick='compartirAmigo()' nombre='"+val.name+
					 "' idm='"+val.idm+"' mediaType='"+val.mediaType+"'>¡Compartir con un amigo!</button></div></li>");
			});
		}
	});
 }