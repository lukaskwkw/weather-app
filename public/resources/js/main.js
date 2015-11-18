// =0;
$(document).ready(function() {
//http://all-free-download.com/free-photos/snow-mountain.html
$('.js-toggle-unit').on("click",toggleUnits)
getLanguage();
	getLocation();
 	//fetchData(json2); // for testing due to not exceed max limit of the api key
 });

function geoIpSend () {
	$.getJSON("https://freegeoip.net/json/",function (json) {
		query.city = json.city;
		query.request =
		"http://api.openweathermap.org/data/2.5/weather?q="+
		query.city+"&units="+query.system+
		"&appid="+query.appId;
		sendRequest();
	})
}

function setWallpaper() {
	var imagesMap = {
		'-10': 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/snow-mountain-842787_640_zps0qjbnpqq.jpg',
		'-5': 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/ice-953205_640_zpsakdahiba.jpg',
		0: 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/snow-mountain-700505_640_zpslido4pht.jpg',
		5: 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/landscape-227881_1920_zpsugex9jcp.jpg',
		10: 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/autumn-846779_1280_zpss7jfgkah.jpg',
		15: 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/autumn-986327_640_zpsypurtkzy.jpg',
		20: 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/qinghai-904584_640_zpscv4d4alj.jpg',
		25: 'http://i1204.photobucket.com/albums/bb420/lukaskwkw/fiji-293826_640_zpsugghmbda.jpg'

	}
	for (var i = -10; i <= 25; i+=5) {
		switch(true){
			case (data.temp<=(-10)):
			$(".js-background").css({'background-image': 'url("'+imagesMap['-10']+'")',
				'background-size': 'cover',
				'background-repeat':'no-repeat'});
			return;
			case (data.temp>=i && data.temp<(i+5)):
			{
				var whichOne = (Math.abs(i-data.temp)<Math.abs(i+5-data.temp))? i : i+5;
				$(".js-background").css({'background-image': 'url("'+imagesMap[whichOne]+'")',
					'background-size': 'cover',
					'background-repeat':'no-repeat'
				});
				
			}
			return;
			case (data.temp>=25):
			$(".js-background").css({'background-image': 'url("'+imagesMap[25]+'")',
				'background-size': 'cover',
				'background-repeat':'no-repeat'});
			return;
		}	
	}		
}

function convertToFahrenheit(val)
{
	return Math.round((val * 9/5 + 32)*10)/10;
}

function convertToCelsius (val) {
	return Math.round(((val - 32) * 5/9)*10)/10;
}

function fetchData(json) {
	if (typeof(json)==='undefined' || Boolean(json)!==true)
		return;

	console.log(JSON.stringify(json));
	data.temp = Math.round(json.main.temp*10)/10;
	data.tempMin = Math.round(json.main.temp_min*10)/10;
	data.tempMax  = Math.round(json.main.temp_max*10)/10;
	$(".js-city").html(json.name);
	$(".js-weather-icon").removeClass("wi-na").addClass("wi-owm-"+json.weather[0].id);;
	$(".js-temp-main").removeClass("wi-na").html(data.temp);
	$(".js-temp-max").removeClass("wi-na").html(data.tempMin);
	$(".js-temp-min").removeClass("wi-na").html(data.tempMax);
	$(".js-humidity").html(json.main.humidity+ " %")
	$(".js-barometer").html(json.main.pressure + " hpa")
	if (json.hasOwnProperty('rain') && json.rain.hasOwnProperty('3h'))
		$(".js-raindrops").html((json.rain['3h'])+" l/m2")
	$(".js-wind").html(json.wind.speed+" m/s")
	setWallpaper();
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
	$.getJSON(query.request, fetchData);
}

}

function getLanguage() {
	if (/us/i.test(navigator.language))
		query.system = "imperial";
}

function getLocation() {
	// var  timer = setTimeout(function(){
	// 	geoip2.city(onSuccessGeoIp2, onErrorGeoIp2);
	// }, 3000);
var  timer = setTimeout(function(){
	geoIpSend();
}, 2000);
if (navigator.geolocation)
	navigator.geolocation.getCurrentPosition(function (nav) {
		clearTimeout(timer);			
		query.longitude = nav.coords.longitude;
		query.latitude = nav.coords.latitude;
		console.log(query.longitude + " " + query.latitude);
		sendRequest();
	},function (error) { 
		if (error.code == error.PERMISSION_DENIED)
			console.log("you denied me :-(");
				clearTimeout(timer);
				data.navErr = true;
				geoIpSend();
			});
}

var onSuccessGeoIp2 = function(location){
 query.city = location.city.names.en;// + ", " + location.subdivisions[0].names.en;
 query.request =
 "http://api.openweathermap.org/data/2.5/weather?q="+
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
function toggleUnits() {

	if($(this).hasClass("wi-celsius"))
	{   
		data.temp = convertToFahrenheit(data.temp);
		data.tempMin = convertToFahrenheit(data.tempMin);
		data.tempMax = convertToFahrenheit(data.tempMax);
		$('.js-toggle-unit').removeClass("wi-celsius").addClass("wi-fahrenheit")
		$(".js-temp-main").html(data.temp);
		$(".js-temp-max").html(data.tempMin);
		$(".js-temp-min").html(data.tempMax);
	}		
	else
	{ 
		data.temp = convertToCelsius(data.temp)
		data.tempMin = convertToCelsius(data.tempMin)
		data.tempMax = convertToCelsius(data.tempMax)
		$('.js-toggle-unit').removeClass("wi-fahrenheit").addClass("wi-celsius")
		$(".js-temp-main").html(data.temp);
		$(".js-temp-max").html(data.tempMin);
		$(".js-temp-min").html(data.tempMax);


	}
}


var query = {
	city: '',
	system: "metric",
	longitude: 0,
	latitude: 0,
	appId: "47902d5ac7188967cf37a70171926c43",
	request: ''
}

var data = {
	temp: 0,
	tempMin: 0,
	tempMax: 0,
	navErr:false
}

var json2 = {"coord":{"lon":19.3,"lat":50.19},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"base":"cmc stations","main":{"temp":10.32,"pressure":984.71,"humidity":95,"temp_min":10.32,"temp_max":10.32,"sea_level":1021.72,"grnd_level":984.71},"wind":{"speed":11.17,"deg":275.001},"rain":{"3h":1.3575},"clouds":{"all":92},"dt":1447851775,"sys":{"message":0.0057,"country":"PL","sunrise":1447826470,"sunset":1447858457},"id":7531790,"name":"Jaworzno","cod":200}
