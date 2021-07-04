console.log("load p5")

var yoff = 0;
var level1=600;
var level2=450;    


var host = '192.168.0.28:8080';

var socket;


function setup() {

  socket = new WebSocket('ws://'+host,'echo-protocol')
  socket.onopen = sendIntro;
  
  socket.onmessage = readMessage;

  var width = 600,
      height = 600;
  createCanvas(width, height);
}

function sendIntro(){
    socket.send("connect machine");
    console.log("message was send")
}

function readMessage(event){
    var msg = event.data;
    console.log(msg);

}



function draw() {

  drawwater();
  if (mouseIsPressed) {
  if (level2>50){ 
       /*  if (! snd2.isPlaying() ) { // .isPlaying() returns a boolean
    snd2.play();} */
  level1 -= 1.5;
  level2 -= 1.5;}
  }
}

function drawwater() {

    background(254,254,255);

    fill(100,200,255,200);
    // We are going to draw a polygon out of the wave points
    beginShape();

    var xoff = 0; // Option #1: 2D Noise
    // float xoff = yoff; // Option #2: 1D Noise

    // Iterate over horizontal pixels
    for (var x = 0; x <= width; x += 10) {
        // Calculate a y value according to noise, map to 

        // Option #1: 2D Noise
        var y = map(noise(xoff, yoff), 0, 1, level1, level2);

        // Option #2: 1D Noise
        // var y = map(noise(xoff), 0, 1, 200,300);

        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff += 0.01;
    }
    // increment y dimension for noise
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}