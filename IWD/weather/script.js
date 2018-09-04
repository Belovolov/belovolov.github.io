const key = '852e813d38507705c82e73cf2cc0c755'

class Temperature {
	constructor(value) {
		this.value = +value;
	}
	toF() {
		return Math.round(this.value * 9 / 5 - 459.67)
	}
	toC() {
		return Math.round(this.value - 273.15)
	}
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		let lat = position.coords.latitude
		let lng = position.coords.longitude
		
		$.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`, function(data) {
			switch (data.weather[0].icon.slice(-1)){
				case 'n':
					$('body').addClass('body--night');
					break;
				case 'd':
					$('body').addClass('body--day');
					break;	
			}
			$("#location").html(`${data.name}, ${data.sys.country}`);
			$("#weather-icon").attr('src',`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
			$("#condition").html(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
			$("#wind").html(`Wind ${data.wind.speed} m/s (${degreesToCompass(data.wind.deg)})`)

			document.temp = new Temperature(data.main.temp)
			$("#temp").html(document.temp.toC())
			$(".content").css('display','block')
		})
	}, function(error) {
		console.log(error)
	})
	
}

function degreesToCompass(inDegrees) {
	let degree = (inDegrees % 360 + 360) % 360
	if (((degree>=0)&&(degree<22.5))||((degree>=337.5)&&(degree<=360))) return 'N'
	else if ((degree>=22.5)&&(degree<67.5)) return 'NE'
	else if ((degree>=67.5)&&(degree<112.5)) return 'E'
	else if ((degree>=112.5)&&(degree<157.5)) return 'SE'
	else if ((degree>=157.5)&&(degree<202.5)) return 'S'
	else if ((degree>=202.5)&&(degree<247.5)) return 'SW'
	else if ((degree>=247.5)&&(degree<292.5)) return 'W'
	else if ((degree>=292.5)&&(degree<337.5)) return 'NW'
}

//function kelvinTo

$(document).ready(function() {
	$("#notation").on('click', function () {
		if ($(this).html() == '°C') {
			$(this).html('°F')
			$('#temp').html(document.temp.toF())
		}
		else {
			$(this).html('°C')
			$('#temp').html(document.temp.toC())
		}				
	})
})

