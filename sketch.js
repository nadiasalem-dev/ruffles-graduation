let timeFinish = false;
let rufflesX = 20;
let catCurrent = 0;
let timer = 0;
let cat = [];
let compie;
let sx;
let sy;
function setup() {
createCanvas(windowWidth, windowWidth * (6 / 7));
  for (let i = 0; i < 18; i++) cat[i] = new Cat(10, 580, color(155, 255, 255));
  angleMode(DEGREES);
  sx = width/700;
  sy = height/600;
}
function preload() {
  compie = loadImage("compie.png");
}
function windowResized() {
  resizeCanvas(windowWidth, windowWidth * (6 / 7));
}
function draw() {
  background(235, 240, 245);
  //Banner
  fill(40, 70, 120);
  rect(0, 0, sx* 700, sy *100);
  //Words on Banner
  textSize(30);
  textAlign(CENTER);
  fill(255);
  text("Catty University, Naptime", sx * 350, sy * 40);
  textSize(29);
  text("Graduation 2026", sx * 350, sy * 80);
  //Stage
  noStroke();
  fill(160, 120, 70);
  rect(0, sx * 400, sy * 700, sy * 200);
  //Display laptop computer as presenter
  image(compie, sx * 270, sx * 440, sy * 160, sy * 150);
  // Podium
  fill(40, 70, 120);
  rect(sx * 300, sx * 525, sy * 100, sy * 40);
  //Cats Movement
  if (catCurrent < cat.length) {
    if (!cat[catCurrent].atPodium()) {
      cat[catCurrent].move();
    } else if (timeFinish === false) {
      timer++;
      if (catCurrent + 1 < cat.length && !cat[catCurrent + 1].atPodium())
        cat[catCurrent + 1].move();

      if (timer === 100) {
        timeFinish = true;
      }
    } else {
      cat[catCurrent].move();
      if (catCurrent + 1 < cat.length && !cat[catCurrent + 1].atPodium()) {
        cat[catCurrent + 1].move();
      }
    }
    if (cat[catCurrent].offScreen()) {
      catCurrent++;
      timer = 0;
      timeFinish = false;
    }
  }
  //Cats display
  for (let i = 0; i < cat.length; i++) {
    cat[i].display();
  }
  //Coffee Cup
  fill(255);
  rect(sx * 370, sx * 540, sy * 10, sy * 20);
  noFill();
  stroke(255);

  arc(sx * 384, sy *  550, 10, 10, 45, 30);
}
