document.getElementById("box-width").onChange = function () {
	document.getElementById("sandbox").style.width = document.getElementById("box-width").value;
};

document.getElementById("bg-color").onchange = function () {
	window.console.log(document.getElementById("bg-color").value);
	document.getElementById("sandbox").style.backgroundColor = document.getElementById("bg-color").value;
};

document.getElementById("font-color").onchange = function () {
	window.console.log(document.getElementById("bg-color").value);
	document.getElementById("sandbox").style.color = document.getElementById("font-color").value;
};

document.getElementById("box-width").onchange = function () {
	document.getElementById("sandbox").style.width = document.getElementById("box-width").value + 'px';
	document.getElementById("width-value").innerHTML=document.getElementById("box-width").value;	
};

document.getElementById("box-height").onchange = function () {
	document.getElementById("sandbox").style.height = document.getElementById("box-height").value + 'px';
	document.getElementById("height-value").innerHTML=document.getElementById("box-height").value;
};

window.onload = function () {
	document.getElementById("width-value").innerHTML=document.getElementById("box-width").value;
	document.getElementById("height-value").innerHTML=document.getElementById("box-height").value;
	document.getElementById("width-value").innerHTML=document.getElementById("box-width").value;
	document.getElementById("width-value").innerHTML=document.getElementById("box-width").value;
};