	
window.addEventListener("DOMContentLoaded", function(event) {
	
	document.getElementById('start').addEventListener("click", move);
});

function move(){

	var point = 0;
	snd = new Audio('crab.mp3');
	snd.load();
	var crabElement = document.getElementById('mycrab');
	var crabStyle = window.getComputedStyle(crabElement, null);
	var leftPos = crabStyle.left.match(/(\d+)/)[0];
	var topPos = crabStyle.top.match(/(\d+)/)[0];
	function moveCrab()
	{			
		snd.play();
		if (point == 0) {			
			if (leftPos<150) point = 1;
			else leftPos -= 2;
		}
		else if (point == 1) {
			if (topPos<150) point = 2
			else topPos -= 2;
		}
		else if (point == 2) {			
			if (leftPos>450) 
			{		
				clearInterval(crabMotion);
				snd.pause();
			}
			else leftPos += 2;
		}
		
		document.getElementById('mycrab').style.left = leftPos + 'px';
		document.getElementById('mycrab').style.top = topPos + 'px';
	}
	var crabMotion = setInterval(moveCrab,30);
}