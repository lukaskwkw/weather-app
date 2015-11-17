$(document).ready(function() {

	// $(".weather-panel__city").html(json.name);
	// $(".wi--main").addClass("wi wi-owm-"+json.weather[0].id);
	getLanguage();
	getLocation();
	// sendRequest();
// console.log(query);
   geoip2.city(onSuccessGeoIp2, onErrorGeoIp2);
});

function fetchDataCity(json) {
	console.log(JSON.stringify(json));
	$(".weather-panel__city").html(json.list[0].name);
	$(".wi--main").addClass("wi wi-owm-"+json.list[0].weather[0].id);
}

function sendRequest () {
	if (query.latitude !== 0 && query.longitude !== 0)
		{		query.request = "http://api.openweathermap.org/data/2.5/weather?"+
	"lat="+query.latitude+
	"&lon="+query.longitude+
	"&appid="+query.appId+
	"&units="+query.system;

	$.getJSON(query.request, fetchData);
}
else
{
console.log("sending this way: ", query.request)
$.getJSON(query.request, fetchDataCity);
}

}

function getLanguage() {
	if (/us/i.test(navigator.language))
		query.system = "imperial";
}

function getLocation() {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition
	(function (nav) {
			query.longitude = nav.coords.longitude;
			query.latitude = nav.coords.latitude;
			console.log(query.longitude + " " + query.latitude);
			sendRequest();
		},function (error) { 
			if (error.code == error.PERMISSION_DENIED)
				console.log("you denied me :-(");
			});
}

var onSuccessGeoIp2 = function(location){
	// console.log(
	// 	"Lookup successful:\n\n"
	// 	+ JSON.stringify(location, undefined, 4)
	// 	);
 query.city = location.city.names.en;// + ", " + location.subdivisions[0].names.en;
 query.request =
  "http://api.openweathermap.org/data/2.5/find?q="+
  query.city+"&units="+query.system+
	"&appid="+query.appId;
 
	sendRequest();
};

var onErrorGeoIp2 = function(error){
	console.log(
		"Error:\n\n"
		+ JSON.stringify(error, undefined, 4)
		);
};


var query = {
	city: '',
	system: "metric",
	longitude: 0,
	latitude: 0,
	appId: "47902d5ac7188967cf37a70171926c43",
	request: ''
}

var json2 = {"coord":{"lon":19.3,"lat":50.19},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"base":"cmc stations","main":{"temp":282.665,"pressure":988.15,"humidity":95,"temp_min":282.665,"temp_max":282.665,"sea_level":1025.38,"grnd_level":988.15},"wind":{"speed":6.91,"deg":227.501},"rain":{"3h":0.28},"clouds":{"all":88},"dt":1447756528,"sys":{"message":0.0092,"country":"PL","sunrise":1447739964,"sunset":1447772135},"id":7531790,"name":"Jaworzno","cod":200}

/*

latitude: 50.163702699999995
longitude: 19.3003386

*/