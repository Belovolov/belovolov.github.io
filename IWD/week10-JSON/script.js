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
if ((window.location.protocol != 'https:')&&(window.location.protocol != 'file:')) {
	$(".content").html(`Please, use HTTPS protocol to load this page`)
}
else {
	if (navigator.geolocation) {
		$(".content").html(`<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
		      					<span class="sr-only">Loading...</span> `)
		navigator.geolocation.getCurrentPosition(function(position) {
			let lat = position.coords.latitude
			let lng = position.coords.longitude
			
			$.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`, function(data) {
				switch (data.weather[0].icon.slice(-1)){
					case 'n':
						$('body').addClass('body--night');
						break;
					case 'd':
						$('body').addClass('body--day');
						break;	
				}
				$(".content").html(`<h2><i class="fa fa-location-arrow" aria-hidden="true"></i> <span id="location"></span></h2>
			          <div id="data">
			              <img id="weather-icon" src="http://openweathermap.org/img/w/01d.png">
			              <span id="temp">13</span>
			              <span id="notation">°C</span>
			              <div id="text-info">
			                <p id="condition">Heavy rain</span>
			                <p id="wind">Wind 9 m/s (East)</span>
			              </div>                            
			          </div>`)
				$("#location").html(`${data.name}, ${data.sys.country}`);
				$("#weather-icon").attr('src',`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
				$("#condition").html(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
				$("#wind").html(`Wind ${data.wind.speed} m/s (${degreesToCompass(data.wind.deg)})`)

				document.temp = new Temperature(data.main.temp)
				$("#temp").html(document.temp.toC())
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
		$(".content").on('click',"#notation", function () {
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
}

