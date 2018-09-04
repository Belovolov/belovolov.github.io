window.onload = function () {

	if (document.getElementById("center") != null) document.getElementById("center").onchange = myAlign;
	if (document.getElementById("right") != null) document.getElementById("right").onchange = myAlign;
	if (document.getElementById("right") != null) document.getElementById("left").onchange = myAlign;
	if (document.getElementById("mycolor") != null) document.getElementById("mycolor").onchange = mySetFontColor;
	if (document.getElementById("mynumber") != null) document.getElementById("mynumber").onchange = mySetFontSize;

	document.restartCount = 0;
	var animationIter = setInterval(function() {

			var childs = document.getElementById("unitec-ad").children;
			document.getElementById("unitec-ad").style.animation = "0.3s forwards simple-fade-out";
			for (var i=0; i< childs.length; i++)
			{
				window.console.log(childs[i]);
				childs[i].style.animation = "none";
			}
			setTimeout(function () {
				document.getElementById("unitec-ad").style.animation = "";
				for (var i=0; i< childs.length; i++) {
					childs[i].style.animation = "";
				}
			}, 300);
			document.restartCount += 1;
			if (document.restartCount>=1) clearInterval(animationIter);
	}, 15000);

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

function myAlign() {
	if (this.checked){
		document.getElementById("test-check-box").style.textAlign = this.value;
	}
}

function mySetFontColor() {
	document.getElementById("test-check-box").style.color = this.value;
}

function mySetFontSize() {
	if (this.value>=0) {
		document.getElementById("test-check-box").style.fontSize = this.value + 'px';
	}	
}