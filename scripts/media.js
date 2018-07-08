$(document).ready(function(){
	var idm=localStorage.getItem("idm");
	var mediaType=localStorage.getItem("mediaType");
	var token=localStorage.getItem("token");
	var hurl="https://api.tviso.com/v2/media/full_info?auth_token="+token+"&idm="+idm+"&mediaType="+mediaType;
	var historial=localStorage.getItem("historial");

	if (historial==null){
		historial='{"historial":[],"length":1}';
		historial=JSON.parse(historial);

	}
	else{
		historial=JSON.parse(historial);
		if(historial.length>9){
			historial.historial.splice(0,1);
			}
		else{
			historial.length++;
		}
	}
	historial.historial.push('{"url":"'+hurl+'"}');
	console.log(historial);
	localStorage.setItem("historial",JSON.stringify(historial));
	console.log(historial);
	/*MEDIA - getMediaFullInfo*/
	$.get(hurl,function(data){
		console.log(data);
		$("#inicioSeries").append('<div id="imgGrande"><img alt="Imagen no disponible :(" src="https://img.tviso.com/ES/poster/w430'+data.images.poster+
				'""></div><div id="divDescMedia"><h2>'+data.originalName+' / '+data.name+
				' ('+data.year+')</h2><p class="importantInfo">Género: '+ data.mainGenre +'</p><p class="importantInfo">Director: '+ data.directors[0].name+
				'</p><p id="descMedia">'+data.plot+'</p><ul id="actores"></ul></div>');
	});
	$("#btBuscar").click(function(){
		search();
	});
});