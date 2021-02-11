var balloon,balloonImg1,balloonImg2,balloonImg3;
var backgroundImg;
var database,position;

function preload(){

  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImg1 = loadImage("Hot Air Ballon-02.png");
  balloonImg2 = loadImage("Hot Air Ballon-03.png");
  balloonImg3 = loadImage("Hot Air Ballon-04.png"); 
}

function setup() {
  createCanvas(600,600);
  balloon = createSprite(10, 250, 50, 50);
  balloon.scale = 0.4;

  database = firebase.database();
  var balloonposition = database.ref("balloon/position");
    balloonposition.on("value",readposition,showError);
}

function draw() {
  background(backgroundImg); 
  fill(255,0,255); 
  textSize(15)
  text("**Use arrow keys to move Hot Air Balloon!",10,18);
  stroke(255,0,255);

  if(keyDown(UP_ARROW)){
      updateposition(0,-10);
      balloon.addAnimation("hotAirBalloon",balloonImg2);
      balloon.scale = balloon.scale -0.01;
  }

    if(keyDown(DOWN_ARROW)){
      updateposition(0,10);
      balloon.addAnimation("hotAirBalloon",balloonImg1);
      balloon.scale = balloon.scale +0.01;
  }

  if(keyDown(LEFT_ARROW)){
    updateposition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg3);
  }

  if(keyDown(RIGHT_ARROW)){
    updateposition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg1);
  }

  drawSprites();
}

//function updateposition(x,y){
  



function readposition(data){
    //console.log(position);
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}