window.onload = function () {
	document.getElementById("replay").onclick = function() {

		var arrLast = document.getElementsByClassName("restart-slide-away");
		window.console.log(arrLast);
		for (var i=0; i< arrLast.length; i++) {
			arrLast[i].style.animation = "0.4s forwards restart-slide-away";
		}		

		arrLast = document.getElementsByClassName("restart-fade-out");
		window.console.log(arrLast);
		for (i=0; i< arrLast.length; i++) {
			arrLast[i].style.animation = "0.4s forwards reverse simple-fade-in";
		}

		var arr = document.body.getElementsByTagName('*');

		setTimeout(function() {			
			for (i=0; i< arr.length; i++) {
				arr[i].style.animation = "none";
			}
		}, 400);

		
		setTimeout(function () {
			for (var i=0; i< arr.length; i++) {
				arr[i].style.animation = "";
			}
		}, 430);
	}
}