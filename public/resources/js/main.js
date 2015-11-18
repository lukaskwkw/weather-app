$(document).ready(function() {
//http://all-free-download.com/free-photos/snow-mountain.html
	// $(".weather-panel__city").html(json.name);
	// $(".wi--main").addClass("wi wi-owm-"+json.weather[0].id);
  $('.js-toggle-unit').on("click",function()
  {
    if($(this).hasClass("wi-celsius"))
	{   
		data.temp = Math.round((data.temp * 9/5 + 32)*10)/10;
		data.tempMin = Math.round((data.tempMin * 9/5 + 32)*10)/10;
		data.tempMax = Math.round((data.tempMax * 9/5 + 32)*10)/10;
 		$('.js-toggle-unit').removeClass("wi-celsius").addClass("wi-fahrenheit")
        $(".js-temp-main").html(data.temp);
		$(".js-temp-max").html(data.tempMin);
		$(".js-temp-min").html(data.tempMax);
  // this.text trzeba albo ze zmiennej utworzonej
	}	
    else
      { 
      	data.temp = Math.round(((data.temp - 32) * 5/9)*10)/10;
		data.tempMin = Math.round(((data.tempMin - 32) * 5/9)*10)/10;
		data.tempMax = Math.round(((data.tempMax - 32) * 5/9)*10)/10;
        $('.js-toggle-unit').removeClass("wi-fahrenheit").addClass("wi-celsius")
        $(".js-temp-main").html(data.temp);
		$(".js-temp-max").html(data.tempMin);
		$(".js-temp-min").html(data.tempMax);


      }
  })
	getLanguage();
/*	getLocation();*/
  /* geoip2.city(onSuccessGeoIp2, onErrorGeoIp2);*/
 fetchData(json2); // for testing due to not exceed max limit of the api key
// console.log(query);
});

function fetchData(json) {
	// console.log(JSON.stringify(json));
	data.temp = Math.round(json.main.temp*10)/10;
	data.tempMin = Math.round(json.main.temp_min*10)/10;
	data.tempMax  = Math.round(json.main.temp_max*10)/10;
	$(".js-city").html(json.name);
	$(".js-weather-icon").addClass("wi wi-owm-"+json.weather[0].id);;
	$(".js-temp-main").html(data.temp);
	$(".js-temp-max").html(data.tempMin);
	$(".js-temp-min").html(data.tempMax);
	$(".js-humidity").html(json.main.humidity)
	$(".js-barometer").html(json.main.pressure)
	if (json.hasOwnProperty('rain'))
	$(".js-raindrops").html((json.rain['3h']*100)+"%")
	$(".js-wind").html(json.wind.speed)
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
	tempMax: 0
}

var json2 = {"coord":{"lon":19.92,"lat":50.08},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"cmc stations","main":{"temp":12.66,"pressure":980.05,"humidity":91,"temp_min":12.66,"temp_max":12.66,"sea_level":1019.32,"grnd_level":980.05},"wind":{"speed":11.06,"deg":240.501},"clouds":{"all":56},"dt":1447835565,"sys":{"message":0.0091,"country":"PL","sunrise":1447826279,"sunset":1447858345},"id":3094802,"name":"Krakow","cod":200}


/*

latitude: 50.163702699999995
longitude: 19.3003386

*/