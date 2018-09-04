var frameCount = 0; //counts frame for player movement for animation
var reverseCount = 0;   //counts frame before reversing player
var dt = 0;              //time counter
var oranges = [];       // oranges array
var successes = [];       //array of success animations
var score = 0;          //game score
var min = -1;            //game timer
var sec = 0;
var hit = false;        //detect collision with players head
var volume = 1;         //sound volume level
var music = null;       //store music
var sound = null;       //store sounds
//class for drawing rectangles
function rect(color, x, y, width, height) {
    this.color = color; 
    this.x = x; 
    this.y = y; 
    this.width = width; 
    this.height = height; 
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

//draw background
function grad (startColor, endColor, x0, y0, x1, y1){
    this.startColor = startColor;
    this.endColor = endColor;
    this.x0 = x0;
    this.y0 = y0;    
    this.x1 = x1;
    this.y1 = y1;


    this.draw = function() {
        var grd=context.createLinearGradient(this.x0, this.y0, this.x1, this.y1);
        grd.addColorStop(0, this.startColor);
        grd.addColorStop(1, this.endColor);

        context.fillStyle = grd;
        context.fillRect(0,0,game.width,game.height);
    }
}

//draw player
function sprite (sx, sy, x, y, width, height, rev, i){
    this.sx = sx;
    this.sy = sx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rev = rev;
    this.i = i;

    this.draw = function() {
            image = new Image();  // "Create" image for sprite
            image.src  = "img/sprite.png"; 
            context.drawImage(image, this.sx, this.sy, this.width, this.height, 
                this.x, this.y, this.width, this.height);
    }

    this.hitDraw = function() {
        //animation of hit
        if (this.i>=0 && this.i < 5){
            context.drawImage(exp, 0, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=5 && this.i < 10){
            context.drawImage(exp, 135, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=10 && this.i < 15){
            context.drawImage(exp, 270, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=15 && this.i < 20){
            context.drawImage(exp, 405, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=20 && this.i < 25){
            context.drawImage(exp, 270, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=25 && this.i < 30){
            context.drawImage(exp, 405, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=30 && this.i < 35){
            context.drawImage(exp, 270, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=35 && this.i < 40){
            context.drawImage(exp, 405, 270, 135, 135, 
                this.x-66.5+this.width/2, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (i==40) {
            hit = false;
        }
    }
}

//class for drawing and animating oranges takes coordinates and time counter;
function orange(x,y,i) {
    exp = new Image();  // "Create" image for explosion
    exp.src  = "img/exp.png"; 
    this.x = x;
    this.y = y;
    this.i = i;
    this.initY = y;
    this.draw = function() {

        //animation of growth
        if (this.i>=0 && this.i<50*5) {
            context.beginPath();
            context.arc(this.x, this.y, 6 + (30-6)*this.i/250, 0, 2*Math.PI, false);
            context.fillStyle = "green";
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.stroke();
            this.i++;
        }

        //animation of changin color
        else if (this.i>=50*5 && this.i<50*5+50*4){
            context.beginPath();
            context.arc(this.x, this.y, 30, 0, 2*Math.PI, false);
            var grd=context.createRadialGradient(this.x, this.y, 29-(29*(this.i-50*5)/(50*4)), 
                this.x, this.y, 40-(29*(this.i-50*5)/(50*4)),
                this.x , this.y, 30);
            grd.addColorStop(0, "green");
            grd.addColorStop(0.5, "orange");
            grd.addColorStop(1, "orange");

            context.fillStyle = grd;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.stroke();
            this.i++;
        }

        //delay
        else if (this.i>=50*5+50*4 && this.i<50*(5+4+3) ){
            context.beginPath();
            context.arc(this.x, this.y, 30, 0, 2*Math.PI, false);
            context.fillStyle = "orange";
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.stroke();
            this.i++;
        }

        //animation of falling
        else if (this.i>=50*(5+4+3) && this.i<50*(5+4+3+6)){
            this.y = this.initY + ((game.height-this.initY-50)*(this.i-50*12)/(50*6));
            context.beginPath();
            context.arc(this.x, this.y, 30, 0, 2*Math.PI, false);
            context.fillStyle = "orange";
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.stroke();
            this.i++;
        }

        //animation of explosion

        else if (this.i>=50*18 && this.i < 50*18 +10){
            context.drawImage(exp, 0, 0, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            if ( this.i == 50*18) playSound('explosion.mp3');
            this.i++;
        }

        else if (this.i>=50*18+10 && this.i < 50*18 +20){
            context.drawImage(exp, 135, 0, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=50*18+20 && this.i < 50*18 +30){
            context.drawImage(exp, 270, 0, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=50*18+30 && this.i < 50*18 +40){
            context.drawImage(exp, 405, 0, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

    }

}

//class for drawing and animating sparkles when oranges  picked takes coordinates and time counter;
function success(x,y,i) {
    exp = new Image();  // "Create" image for sucsess sparkle
    exp.src  = "img/exp.png"; 
    this.x = x;
    this.y = y;
    this.i = i;
    this.draw = function() {

        //animation of success
        if (this.i>=0 && this.i < 5){
            context.drawImage(exp, 0, 135, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=5 && this.i < 10){
            context.drawImage(exp, 135, 135, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=10 && this.i < 15){
            context.drawImage(exp, 270, 135, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

        else if (this.i>=15 && this.i < 20){
            context.drawImage(exp, 405, 135, 135, 135, 
                this.x-66.5, this.y-66.5, 135, 135);
            this.i++;
        }

    }

}

// function check wheter objA (player's head or basket's top) and objB (orange) is crossing

function collision(objA, objB) {
    if (objA.x + objA.width > objB.x -30 && objA.x < objB.x + 30 && objA.y + 50 > objB.y -30 && objA.y < objB.y + 30) {
        return true;
    }
    else {
        return false;
    }
}

// player moves

function playerMove(e) {

    if((input.isDown('DOWN') || input.isDown('s')) && player.y < game.height - player.height) {
        player.y += player.vY;
        basket.y += basket.vY;
        frameCount++;
    }

    if((input.isDown('UP') || input.isDown('w')) && player.y > game.height - player.height-50) {
        player.y -= player.vY;
        basket.y -= basket.vY;
        frameCount++;
    }

    if((input.isDown('LEFT') || input.isDown('a')) && player.x > 0) {
        player.x -= player.vX;
        basket.x -= basket.vX;
        frameCount++;
    }

    if((input.isDown('RIGHT') || input.isDown('d')) && player.x < game.width - player.width) {
        player.x += player.vX;
        basket.x += basket.vX;
        frameCount++;
    }

    if(input.isDown('SPACE')) {
        reverseCount++;
    }

    //aminate movement
    if (frameCount > 5){
        player.sx = 125;
        if (frameCount > 10) {
            player.sx = 0;
            frameCount = 0;
        }
    }

    //reverse player
    if (reverseCount == 5){
        player.sy = 207;
        basket.sy = 207;
        basket.x += 175;
        reverseCount++;
    }

    if (reverseCount == 11) {
        player.sy = 0;
        basket.sy = 0;
        basket.x -= 175;
        reverseCount = 0;
    }
}


function startGame() {
    if (!start) {
        //set speed, zeroes scores, timer, oranges;
        player.vX = 2;
        player.vY = 2;
        basket.vX = 2;
        basket.vY = 2;
        dt = 0;
        score = 0;
        min = 6;
        sec = 59;


        playMusic('music.mp3');

        start = true;
    }
}


// draw everything on canvas
function draw() {
    game.draw(); // game field

    sky.draw(); //backgound with sky

    ground.draw(); //ground

    pic = new Image();  // "Create" image for background
    pic.src  = "img/tree.png";  
    context.drawImage(pic, 0, 0); 

    //draws array of oranges with delay in 2 sec
    if (dt >= 100){
        for (var i = 0; i < oranges.length; i++) {
            oranges[i].orange.draw();
        }
    }

    //draws success animations
    for (var i = 0; i < successes.length; i++) {
            successes[i].success.draw();
        }



    player.draw(); // Player

    basket.draw(); //basket

    //draws hit animation 
    if (hit) player.hitDraw();
    //timer
    if (dt%50 == 0){
        if(sec > 0) sec--;
        else {
            if (min > 0){
                min--;
                sec = 59;
            }
            else if (min == 0) {
                min = -1; //for "unlooping" sound playing
                oranges.splice(0,oranges.length);
                start = false;
                stopMusic();
                playSound('end.m4a');
            }
        }
    } 


    // draw time left and score on field
    context.font = 'bold 25px courier';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillStyle = '#000';
    context.fillText("Your score: " + score, 10, 10);
    context.fillText("Time left: " + min + ":" + sec, game.width - 250, 10);


    //display start screen if game doesn't run
    if (!start) {
        // start screen
        context.fillStyle = "#ccc";
        context.fillRect(0, 0, game.width, game.height);
        context.textAlign = 'center';
        context.font = 'bold 60px courier';
        context.textBaseline = 'top';
        context.fillStyle = 'black';
        context.fillText("Orange Reaper The Game", game.width / 2, game.height / 2 - 75);
        context.font = 'bold 20px courier';
        context.textBaseline = 'top';
        context.fillStyle = 'black';
        context.fillText("Your last score is " + score, game.width / 2, game.height / 2);
        context.font = 'bold 18px courier';
        context.textBaseline = 'top';
        context.fillStyle = 'black';
        context.fillText("CONTROLS:", game.width / 2, game.height / 2 + 75);
        context.fillText("Click to start", game.width / 2, game.height / 2 + 95);
        context.fillText("Use arrow keys or 'WASD' to move", game.width / 2, game.height / 2 + 115);
        context.fillText("Use space to reverse the player", game.width / 2, game.height / 2 + 135);
        context.fillText("GAME RULES:", game.width / 2, game.height / 2 + 175);
        context.fillText("Collect as many oranges as possible!", game.width / 2, game.height / 2 + 195);
        context.fillText("Catch oranges in the basket and avoid oranges falling on the head", game.width / 2, game.height / 2 + 215);
    }
}

// update coordinates for player, check collisions
function update() {
    playerMove(); // change player coordinares
    
    //chek collisions
    if (dt >= 100){
        for (var i = 0; i < oranges.length; i++) {
            if (collision(player, oranges[i].orange)) {
                score--;
                hit = true;
                player.i = 0;
                oranges.splice(i,1);
                playSound('ouch.mp3');
            }

            else if (collision(basket, oranges[i].orange)) {
                score++;
                successes.push({success: new success(oranges[i].orange.x, oranges[i].orange.y, 0)});
                oranges.splice(i,1);
                playSound('yes.mp3');
            }
        }
    }


}

function play() {
    if (dt%100 == 0 && start && dt > 1) { 
        //create new orange every 2 sec and add it to the array     
        oranges.push({orange: new orange(150 + Math.random()*610, 160 + Math.random()*140, 0)});
        dt++;
    }
    else dt++;
    draw(); // draw everything on canvas
    update(); // update coordinates for player, check collisions
    changeVolume();
    if (music != null) music.volume = volume;
    if (sound != null) sound.volume = volume;
}

//functions for playing sound and music
function playSound(soundfile) 
    {
        document.getElementById("sound_dummy").innerHTML=
        "<audio src=\""+soundfile+"\" hidden=\"true\" autoplay id = 'sound'></audio>";  
        sound = document.getElementById("sound");      
    }                   

function playMusic(soundfile) 
    {
        document.getElementById("music_dummy").innerHTML=
        "<audio src=\""+soundfile+"\" hidden=\"true\" autoplay loop id = 'music'></audio>";
        changeVolume();
        music = document.getElementById("music");
    }

function stopMusic() {
        document.getElementById("music_dummy").innerHTML="";
    }

// Inicialize variables

function init() {
    start = false;

    // create field
    game = new rect("#fff", 0, 0, 912, 635);
    ground = new rect("brown", 0, game.height - 100, game.width, 100);
    sky = new grad("#7AACF1", "#fff", 0, 0, 0, game.height);

    // create player
    player = new sprite(0, 0, game.width - 135, game.height  - 217, 125, 207, 1, 0);
    // player speed
    player.vX = 0;
    player.vY = 0; 

    //create basket
    basket = new sprite(0, 0, game.width - player.width -75, game.height  - 200, 90, 207, 1, 0);
    basket.sx = 250;
    basket.vX = 0;
    basket.vY = 0; 


    var canvas = document.getElementById("canvas");
    canvas.width = game.width;
    canvas.height = game.height;
    context = canvas.getContext("2d");
    canvas.onclick = startGame;

    setInterval(play, 1000 / 50); //give us 50 frames per second
}


init();