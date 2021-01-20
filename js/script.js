// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

function onPageLoad()
{
	splitFunction();
}

function splitFunction()
{
	var url = window.location.search;
	console.log();
	var result = url.split("=");
	document.getElementById("myGamerTag").innerHTML = result[1];
}

function moveright()
{
	//x = x += 5;
	gamerInput = new GamerInput("Right");
}
function moveleft()
{
	gamerInput = new GamerInput("Left");
}
function moveup()
{
	gamerInput = new GamerInput("Up");
}
function movedown()
{
	gamerInput = new GamerInput("Down");
}

function clearmove()
{
	gamerInput = new GamerInput("None");
}

function gotogame()
{
	window.location='https://play.google.com/store/apps/details?id=com.BCI.ForestCrusader';
}

function toggleMusic()
{
	var myAudio = document.getElementById("bg_music");
	
	return myAudio.paused ? myAudio.play() : myAudio.pause();
}

var options = 
	[
		{
			"text": "Select Input",
			"value": "No Input",
			"selected": true
		},
		{
			"text": "Arrow Keys",
			"value": "Arrows"
		},
		{
			"text": "UI Buttons",
			"value": "Buttons"
		}
	];

var selectBox = document.getElementById('inputSelect');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}

function selectInput()
{
	var selection = document.getElementById("inputSelect").value;
	if(option.value = 'Arrows')
		{
			document.getElementById("btUp").setAttribute('disabled', 'enabled');
			document.getElementById("btLeft").disabled = true;
			document.getElementById("btRight").disabled = true;
			document.getElementById("btDown").disabled = true;
			console.log(selection);
		}
	else if(option.value = 'Button')
	{
		document.getElementById("btUp").setAttribute('disabled', 'disabled');
	document.getElementById("btLeft").disabled = false;
	document.getElementById("btRight").disabled = false;
	document.getElementById("btDown").disabled = false;
	console.log(selection);
	}
}

function GameObject(name, image, health) {
    this.name = name;
    this.img = image; // this can be used to hold image filename
    this.health = health;
    this.x = 0; // initialised at 0 ***
    this.y = 0; // initialised at 0 ***
	this.speedY = 0;
	this.speedX = 0;
}

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var image = new Image();
image.src = "./img/Player.png";

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

var sprite = new Image();
sprite.src = "./img/Player.png";

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", "./img/Player.png", 100);

// Gameobjects is a collection of the Actors within the game
// this is an Array
var gameobjects = [player, new GameObject("NPC", "./img/Eye.png", 100)];

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);
    console.log("Keycode: " + event.keyCode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
				x = x -5;
                break; //Left key
            case 38: // Up Arrow
                gamerInput = new GamerInput("Up");
				y = y -5;
                break; //Up key
            case 39: // Right Arrow
                gamerInput = new GamerInput("Right");
				x = x +5;
                break; //Right key
            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
				y = y +5;
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    // console.log("Gamer Input :" + gamerInput.action);
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

         if (gamerInput.action === "Up") {
			y = y -= 5;
            // console.log("Up");
        }
		if(gamerInput.action === "Down")
		{
			y = y += 5;
		}
		if(gamerInput.action === "Left")
		{
			x = x -= 5;
		}
		if(gamerInput.action === "Right")
		{
			x = x += 5;
		}

        if (gameobjects[i].health >= 1) {
            //gameobjects[i].health = gameobjects[i].health - 1;
            // console.log("Health :" + gameobjects[i].health);

            // *** This is where X and Y are being updated
            if (gamerInput.action === "Down") {
                gameobjects[i].x += 1;
                gameobjects[i].y += 1;
				y = y += 5;
                // console.log("Down");
            }

        }else {
            //console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  Y: " + gameobjects[i].y + " looks like its not alive :'(");
        }
    }
}

var x = 0;
var y = 0;
var frames = 6;
var currentFrame = 0;

var sprite_x = 0;
var intial = new Date().getTime();
var current;
// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
	
	current = new Date().getTime();
	if(current - intial >= 500)
		{
			currentFrame = (currentFrame + 1) % frames;
			intial = current;
		}
    for (i = 0; i < gameobjects.length; i++) {
        if (gameobjects[i].health > 0) {
            //console.log("Image :" + gameobjects[i].img);
			var image = new Image();
			image.src = gameobjects[0].img;
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(image, (image.width / 6) * currentFrame, 0, 106, 110, x, y, 256, 256);
        }
    }
	var enemyImage = new Image();
		enemyImage.src = gameobjects[1].img;
		context.drawImage(enemyImage, 550, 650, 150, 100);
}

function gameloop() {
    update();
    draw();
	
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed "keyup" or "keydown"
// this is is being handled by the method input()
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);