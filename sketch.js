let bannerH, stageY, podiumX, podiumY, podiumW, podiumH;
let catStartX, catY, podiumStopX, offscreenX;
let timeFinish = false;
let rufflesX = 20;
let catCurrent = 0;
let timer = 0;
let pauseTime = 120;
let cat = [];
let compie;
let audienceY;
let audienceRows = 10;
let audienceGap;
let adj;
let sceneWidth = min(windowWidth, windowHeight * 7 / 6);
function setup() {
createCanvas(sceneWidth, sceneWidth * 6 / 7);
  podiumW = width * 0.14;
  podiumH = height * 0.07;
  podiumX = width * 0.44;
  podiumY = height * 0.805;
  catStartX = width * 0.015;
  catY = podiumY + podiumH * 1.2;
  for (let i = 0; i < 18; i++)
    cat[i] = new Cat(catStartX, catY, color(155, 255, 255));
  angleMode(DEGREES);
  bannerH = height * 0.17;


  podiumStopX = width * .5;
  offScreenX = width + podiumW;
  stageY = height * 0.67;
  audienceY = stageY - height * .03;
audienceGap = (stageY - bannerH * 1.1) / audienceRows;
}
function preload() {
  compie = loadImage("compie.png");
}

function draw() {
  background(235, 240, 245);
  //Banner
  fill(40, 70, 120);
  rect(0, 0, width, bannerH);
  //Words on Banner
  textSize(bannerH * .3);
  textAlign(CENTER);
  fill(255);
  text("Catty University, Naptime", width/2, bannerH * .4);
  textSize(bannerH * .29);
  text("Graduation 2026", width/2, bannerH * .8);
  //Stage
  noStroke();
  fill(160, 120, 70);
  rect(0, stageY, width, height -stageY);
  //Display laptop computer as presenter
  image(compie, podiumX-podiumW * .3, podiumY-podiumH *1.8, podiumW * 1.6, podiumH * 3);
  // Podium
  fill(40, 70, 120);
  rect(podiumX, podiumY, podiumW, podiumH);
  //Cats Movement
  if (catCurrent < cat.length) {
    if (!cat[catCurrent].atPodium()) {
      cat[catCurrent].move();
    } else if (timeFinish === false) {
      timer++;
      if (catCurrent + 1 < cat.length && !cat[catCurrent + 1].atPodium())
        cat[catCurrent + 1].move();

      if (timer === pauseTime) {
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
  rect(podiumX + podiumW * .7, podiumY + podiumH * .35, podiumW * .14, podiumH *.5);
  noFill();
  stroke(255);
  //coffee handle
  arc(podiumX + podiumW * .84, podiumY + podiumH * .6, podiumW * .12, podiumH * .45, 300, 600);
  noStroke();
  for(let j = 0; j < audienceRows; j++){
  for(let i = 10; i > 0; i--){
    if(j % 2 === 0){
      adj = 0;
    }
    else{
      adj = width * .02;
    }
  fill(255, 0, 0);
  circle(width * (105-i* 10)/100 + adj, audienceY -j *audienceGap, 20 );
  }
  }
}
