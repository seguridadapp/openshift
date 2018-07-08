$(document).ready(function(){
	/*Creo una lista del historial de busqueda del usuario*/
	var historial=localStorage.getItem("historial");
	historial=JSON.parse(historial);
	if (historial==null) {
		$("#inicioSeries").append("<p>No hay historial :(</p>");
		console.log("null");
	}
	else{
		$("#inicioSeries").append("<ul id='listaElementos'></ul>");
		var elementos=historial.historial;
		console.log(elementos);
		$.each(elementos,function(i,value){
			url=value.slice(8,-2);
			$.get(url,function(val){
				$("#listaElementos").append("<li class='elemenBusqueda'><div class='imgElem'><img alt='No hay imagen disponible :(' src='https://img.tviso.com/ES/backdrop/w600"+
				val.images.backdrop+"'></div><div class='infoElem'><h2>"+val.originalName+" / "+val.name+
				" ("+val.year+")"+"</h2><p class='infoGenero'>"+val.mainGenre+"</p><p>"+val.shortPlot+
				" </p><p>Rating: "+val.rating+"</p><button class='btVerMas2' onclick='buscarImdb()' idm='"+val.idm+
				 "' mediaType='"+ val.mediaType+
				 "''>Ver más</button><button class='btCompartir' onclick='compartirAmigo()' nombre='"+val.name+
				 "' idm='"+val.idm+"' mediaType='"+val.mediaType+"'>¡Compartir con un amigo!</button></div></li>");
			});
			
		});
	}
	
});