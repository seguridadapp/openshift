/*GEOLOCALIZACION*/
function getMapa(){
  var apikey="AIzaSyAVwOv5H3ATyMFhc2NqP7dF9mTLPPC_W9Y";
  var uluru = new google.maps.LatLng(-34.92277,-57.956253);
  var map = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  /*Localización del usuario*/
  $.post("https://www.googleapis.com/geolocation/v1/geolocate?key="+apikey,function(data){
    var marcador = new google.maps.Marker({
      position: new google.maps.LatLng(data.location.lat,data.location.lng),
      map: map
    });
  });
}