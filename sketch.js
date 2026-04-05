let timeFinish = false;
let rufflesX = 20;
let catCurrent = 0;
let timer = 0;
let cat = [];
let compie;
function setup() {
  createCanvas(700, 600);
  for (let i = 0; i < 18; i++) cat[i] = new Cat(10, 580, color(155, 255, 255));
  angleMode(DEGREES);
}
function preload() {
  compie = loadImage("compie.png");
}
function draw() {
  background(235, 240, 245);
  //Banner
  fill(40, 70, 120);
  rect(0, 0, 700, 100);
  //Words on Banner
  textSize(30);
  textAlign(CENTER);
  fill(255);
  text("Catty University, Naptime", 350, 40);
  textSize(29);
  text("Graduation 2026", 350, 80);
  //Stage
  noStroke();
  fill(160, 120, 70);
  rect(0, 400, 700, 200);
  //Display laptop computer as presenter
  image(compie, 270, 440, 160, 130);
  // Podium
  fill(40, 70, 120);
  rect(300, 525, 100, 40);
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
  rect(370, 540, 10, 20);
  noFill();
  stroke(255);

  arc(384, 550, 10, 10, 45, 30);
}
