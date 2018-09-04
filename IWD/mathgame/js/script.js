function Game (time) {
	this.max = 9;
	this.min = 1;
	this.playing = false;
	this.numberOfOptions = 4
	this.time=time;
	this.score=0;
	this.trueBox=0;
	this.boxesValues=[];
	document.getElementById("gameover").style.display = "none";
	document.getElementById("scorevalue").innerHTML=this.score;
}

function fadeOutAndIn(element,duration) {
	try {
		var x=0;
		var time=0;
		var tempTimer = setInterval(function() {
			if (time<=duration) {
				element.style.opacity=Math.round(-4*time*(time-duration)/100000)/10;
			}
			else clearInterval(tempTimer);
			time+=10;
		}, 10)
	}
	catch (e) {
		window.console.log(e)
	}
}

Game.prototype.newSet = function () {
	var m1=Math.round(Math.random()*(this.max-this.min)+this.min);
	var m2=Math.round(Math.random()*(this.max-this.min)+this.min);
	var m = m1 * m2;
	this.trueBox = Math.round(Math.random()*(this.numberOfOptions-1)+1);
	for (i=0;i<this.numberOfOptions;i++) {
		if (i==this.trueBox-1) {
			this.boxesValues[i] = m;
		}
		else {
			do {
				this.boxesValues[i] = Math.round(Math.random()*(this.max*this.max-this.min*this.min)+this.min*this.min);
			} while (this.boxesValues[i]== m)
			
		}
		document.getElementById("choices").getElementsByClassName("option")[i].innerHTML=this.boxesValues[i];
	}
	document.getElementById("question").innerHTML=m1+"x"+m2;
}
  
Game.prototype.checkOption = function (box) {
	if (this.trueBox==box.substr(box.search(/(\d+)$/g))) {
		fadeOutAndIn(document.getElementById("correct"),1000);
		this.scoreUp();
		this.newSet();
	}
	else {
		fadeOutAndIn(document.getElementById("wrong"),1000);
	}
}

Game.prototype.gameOver = function () {
	this.playing = false;
	optionBoxes = document.getElementById("choices").getElementsByClassName("option");
	for (i=0; i<optionBoxes.length; i++) {
		optionBoxes[i].onclick = Function.prototype;
	}
	document.getElementById("startreset").innerHTML = "Play again";
	document.getElementById("finalscore").innerHTML=this.score;		
	document.getElementById("gameover").style.display = "block";
}

Game.prototype.scoreUp = function () {
	this.score++;
	document.getElementById("scorevalue").innerHTML=this.score;
  document.getElementById("question").innerHTML = '';
  
}

document.getElementById("startreset").onclick = function () {
	if (document.thisGame && document.thisGame.playing == true) {
    document.thisGame = null;
    this.innerHTML="Play!";
    document.getElementById("scorevalue").innerHTML=0;
    document.getElementById("question").innerHTML='';
    document.getElementById("timeremaining").style.display = 'none';
    document.getElementById("timeremainingvalue").innerHTML=60;
    clearInterval(document.gameTimer);
    [].forEach.call(document.getElementById("choices").getElementsByClassName("option"), (e) => e.innerHTML = '');
	}
	else {
		document.thisGame = new Game(60);
		this.innerHTML="Reset";
		document.getElementById("timeremaining").style.display = "block";
		var timeleft = document.getElementById("timeremainingvalue");
		document.gameTimer = setInterval(function() 
							{
								document.thisGame.time--;
								if (document.thisGame.time<0) {
									clearInterval(myTimer);
									document.thisGame.gameOver();
								}
								else							
									{timeleft.innerHTML=document.thisGame.time;}
							},
								400);
		document.thisGame.newSet();
		document.thisGame.playing = true;
		optionBoxes = document.getElementById("choices").getElementsByClassName("option");
		for (i=0; i<optionBoxes.length; i++) {
			optionBoxes[i].onclick = function () {
				document.thisGame.checkOption(this.id);
			}
		}	
	}
	
}
