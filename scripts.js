	getWeather = function (data) {
		var city=data.name;
		var country=data.sys.country;
		var temperature=data.main.temp.toFixed(2);
		var unit="C";
		var status=data.weather[0].main;
		setBackground(status);
		console.log(data);
		$("#location").text(city + ", "+country);
		$("#temp").html("<span id='temperature'>"+temperature  +"</span> &deg;<a id='tempUnit' href='#'>C</a>");
		$("#icon").attr('src',data.weather[0].icon);
		$("#icon").attr('title',data.weather[0].description);
		$("#status").text(status);
		$("#wind").html("Wind: <span id='windSpeed'>"+data.wind.speed+ "</span><span id='speedUnit'> mph</span>");
		$("#humidity").text("Humidity: "+data.main.humidity+"%");
		$('#tempUnit').click(function(e){e.preventDefault(); toggleTempUnit(); toggleSpeedUnit(); return false; });
		toggleTempUnit(); // set default to Farenheight
	}

	function toggleTempUnit(){
		var unit=$("#tempUnit").text();
		var temp=$("#temperature").text();
		if (unit == "C") {
			convertedTemp = temp * 9 / 5 + 32;
			$("#tempUnit").text("F");
		} else {
			convertedTemp = (temp -32) * 5 / 9;
			$("#tempUnit").text("C");
		}
		$("#temperature").text(convertedTemp.toFixed(2));

	}

	function toggleSpeedUnit(){
		var unit=$("#speedUnit").text();
		var speed=$("#windSpeed").text();
		if (unit == " mph") {
			convertedSpeed = speed/0.62;
			$("#speedUnit").text(" km/h");
		} else {
			convertedSpeed = speed*0.62;
			$("#speedUnit").text(" mph");
		}
		$("#windSpeed").text(convertedSpeed.toFixed(1));

	}

	function setBackground(status){
		//set background based off the status of temperature (Clear, Cloud, Rainy, Snow)
		var imgs = {
			"Clear": "https://cdn.pixabay.com/photo/2014/03/27/23/57/blue-sky-299765_960_720.jpg",
			"Clouds": "http://publicdomainq.net/images/201707/19s/publicdomainq-0011297gqj.jpg",
			"Rain": "https://static.pexels.com/photos/69927/rain-floor-water-wet-69927.jpeg",
			"Snow": "https://static.pexels.com/photos/326152/pexels-photo-326152.jpeg",
			"Default": "https://cdn.pixabay.com/photo/2016/01/02/00/42/cloud-1117279_960_720.jpg"
		};
		if(status in imgs){
			$('body').css('backgroundImage','url('+imgs[status]+')');
		} else {
			$('body').css('backgroundImage','url('+imgs["Default"]+')');
		}
		
	}

	$(document).ready(function(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				var lat=position.coords.latitude;
				var long=position.coords.longitude;
				console.log("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long);
				$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long,getWeather);
				$("#loading").remove();
			});
		}
		navigator.geolocation.watchPosition(function(position) {},
			function (error) { 
				if (error.code == error.PERMISSION_DENIED)
					$("#loading").html("<h3>Could not determine your location</h3>");
		});
	});