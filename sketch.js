let bannerH, stageY, podiumX, podiumY, podiumW, podiumH;
let catStartX, catY, podiumStopX, offscreenX;
let timeFinish = false;
let rufflesX = 20;
let catCurrent = 0;
let timer = 0;
let pauseTime = 20;
let cat = [];
let compie;
let catImages;
let audienceY;
let audienceRows = 10;
let audienceGap;
let adj;
let sceneWidth;
let catAudienceSize;
let zoeyRow;
let zoeySeat;
let zoeyImg;
let RosieSprite;
let distinctionSound;
let compieShow = false;
let reachedRuffles = false;
let moveArms = false;
let armsUp = false;
let pushRuffles = false;
let rosieTimer = 0;

let catFrames = [
  { sx: 20, sy: 45, sw: 220, sh: 370 },
  { sx: 275, sy: 45, sw: 220, sh: 370 },
  { sx: 530, sy: 45, sw: 220, sh: 370 },
  { sx: 785, sy: 45, sw: 220, sh: 370 },
  { sx: 1030, sy: 45, sw: 220, sh: 370 },
  { sx: 1230, sy: 45, sw: 220, sh: 370 },

  { sx: 20, sy: 360, sw: 220, sh: 300 },
  { sx: 275, sy: 360, sw: 220, sh: 300 },
  { sx: 530, sy: 360, sw: 220, sh: 300 },
  { sx: 785, sy: 360, sw: 220, sh: 300 },
  { sx: 1030, sy: 360, sw: 220, sh: 300 },
  { sx: 1230, sy: 360, sw: 220, sh: 300 },

  { sx: 20, sy: 615, sw: 220, sh: 300 },
  { sx: 275, sy: 615, sw: 220, sh: 300 },
  { sx: 530, sy: 615, sw: 220, sh: 300 },
  { sx: 785, sy: 615, sw: 220, sh: 300 },
  { sx: 1030, sy: 615, sw: 220, sh: 300 },
  { sx: 1230, sy: 615, sw: 220, sh: 300 },
];

let catDrawW;
let catDrawH;

let names = [
  "Ada",
  "Byte",
  "Bit",
  "Pixel",
  "Kernel",
  "Stack",
  "Cache",
  "Vector",
  "Pointer",
  "Cipher",
  "Syntax",
  "Loop",
  "Logic",
  "Turing",
  "Hopper",
  "Linus",
  "Pascal",
  "Ruffles",
];

function setup() {
  sceneWidth = Math.min(windowWidth, (windowHeight * 7) / 6);
  createCanvas(sceneWidth, (sceneWidth * 6) / 7);

  podiumW = width * 0.14;
  podiumH = height * 0.07;
  podiumX = width * 0.44;
  podiumY = height * 0.79;

  catStartX = width * 0.015;
  catDrawW = width * 0.085;
  catDrawH = catDrawW * 1.3;
  stageY = height * 0.7;
  catY = height - catDrawH;

  for (let i = 0; i < 18; i++) {
    cat[i] = new Cat(
      -100,
      catY,
      color(155, 255, 255),
      catImages,
      i,
      "waiting",
      false
    );
  }

  cat[cat.length] = new Cat(
    -100,
    catY,
    color(155, 255, 255),
    RosieSprite,
    cat.length,
    "waiting",
    false
  );

  cat[cat.length - 2].isRuffles = true;

  for (let i = 0; i < 18; i++) {
    let ran = ceil(random(2));
    if (ran === 1) {
      cat[i].award = true;
    }
  }

  cat[0].state = "walkingToPodium";
  cat[cat.length - 2].speed = 2.5;
  cat[0].x = catStartX;

  angleMode(DEGREES);

  bannerH = height * 0.17;
  catAudienceSize = width * 0.025;
  podiumStopX = podiumX + podiumW / 2;
  offScreenX = width + podiumW;

  audienceY = stageY - height * 0.03;
  audienceGap = (stageY - bannerH * 1.1) / audienceRows;
  zoeyRow = floor(random(audienceRows));
  zoeySeat = ceil(random(10));
}

function preload() {
  compie = loadImage("images/compie.png");
  catImages = loadImage("images/spriteGrad.png");
  zoeyImg = loadImage("images/Zoey.png");
  distinctionSound = loadSound("audio/distinction_award.wav");
  RosieSprite = loadImage("images/RosieSprite.png");
}

function draw() {
  background(235, 240, 245);

  fill(40, 70, 120);
  rect(0, 0, width, bannerH);

  textSize(bannerH * 0.3);
  textAlign(CENTER);
  fill(255);
  text("Catty University, Naptime", width / 2, bannerH * 0.3);

  textSize(bannerH * 0.29);
  text("Graduation 2026", width / 2, bannerH * 0.6);

  noStroke();
  fill(160, 120, 70);
  rect(0, stageY, width, height - stageY);

  image(
    compie,
    podiumX - podiumW * 0.3,
    podiumY - podiumH * 1.8,
    podiumW * 1.6,
    podiumH * 3
  );

  fill(40, 70, 120);
  rect(podiumX, podiumY, podiumW, podiumH);

  if (cat[cat.length - 2].state === "leaving") {
    cat[cat.length - 2].speed = 1.0;
  }

  if (catCurrent < cat.length) {
    for (let i = 0; i < cat.length; i++) {
      let c = cat[i];

      if (c.state !== "waiting" && c.state !== "done") {
        c.update();
      }

      if (
        c.state === "pausing" &&
        i + 1 < cat.length &&
        cat[i + 1].state === "waiting" &&
        i + 1 !== cat.length - 1
      ) {
        cat[i + 1].state = "walkingToPodium";
      }
    }
  }
if (compieShow) {

  if (!reachedRuffles) {

    cat[cat.length - 1].state = "walking to Ruffles";
    cat[cat.length - 1].displayRosie();

    if (
      cat[cat.length - 1].x >=
      cat[cat.length - 2].x - catDrawW * 0.8
    ) {

      reachedRuffles = true;
      moveArms = true;
      cat[cat.length - 1].state = "raise arms";
    }
  }

  else if (moveArms) {

    cat[cat.length - 1].state = "raise arms";
    cat[cat.length - 1].displayRosie();
    rosieTimer++;
    if(rosieTimer == 12){
    armsUp = true;
    moveArms = false;
    }
  }
  else if(armsUp){
    cat[cat.length-1].state = "arms at middle";
    cat[cat.length-1].displayRosie();
    rosieTimer++;
    if(rosieTimer == 24){
    armsUp = false;
    pushRuffles = true;
    }
  }
  else if(pushRuffles){
    cat[cat.length-1].state = "push";
    cat[cat.length-1].displayRosie();
    cat[cat.length-2].state = "leaving";
    cat[cat.length-1].speed = cat[cat.length-2].speed;
  }

}

 /* if (
    cat[cat.length - 1].x >
    cat[cat.length - 2].x - catDrawW * 0.8
  ) {
    cat[cat.length - 2].state = "leaving";
    cat[cat.length - 1].speed =
      cat[cat.length - 2].speed;
  }*/
 
 
  for (let i = 0; i < cat.length; i++) {
    if (i === cat.length - 1) {
    } else if (cat[i].state !== "waiting") {
      cat[i].display();
    }
  }

  fill(255);
  rect(
    podiumX + podiumW * 0.7,
    podiumY + podiumH * 0.35,
    podiumW * 0.14,
    podiumH * 0.5
  );

  noFill();
  stroke(255);
  arc(
    podiumX + podiumW * 0.84,
    podiumY + podiumH * 0.6,
    podiumW * 0.12,
    podiumH * 0.45,
    300,
    600
  );
  noStroke();

  for (let j = 0; j < audienceRows; j++) {
    for (let i = 10; i > 0; i--) {
      if (j % 2 === 0) {
        adj = 0;
      } else {
        adj = width * 0.02;
      }

      xPosition = (width * (105 - i * 10)) / 100 + adj;
      yPosition = audienceY - j * audienceGap;

      if (j === zoeyRow && i === zoeySeat) {
        drawZoey(xPosition, yPosition, catAudienceSize * 1.3);
      } else {
        drawCatSilhouette(xPosition, yPosition, catAudienceSize);
      }
    }
  }
}

function drawCatSilhouette(x, y, size) {
  noStroke();
  fill(0);
  circle(x, y, size);

  fill(255, 0, 0);
  triangle(
    x - size * 0.65,
    y - size * 0.35,
    x - size * 0.15,
    y - size * 0.35,
    x - size * 0.3,
    y - size * 0.75
  );

  triangle(
    x + size * 0.65,
    y - size * 0.35,
    x + size * 0.15,
    y - size * 0.35,
    x + size * 0.3,
    y - size * 0.75
  );

  fill(255, 0, 0);
  circle(x - size * 0.3, y - size * 0.35, size * 0.18);
  circle(x + size * 0.3, y - size * 0.35, size * 0.18);

  fill(255);
  circle(x - size * 0.25, y - size * 0.2, size / 4);
  circle(x + size * 0.25, y - size * 0.2, size / 4);

  stroke(0);
  strokeWeight(1);
  line(x - size * 0.2, y - size * 0.2, x - size * 1.0, y - size * 0.2);
  line(x + size * 0.2, y - size * 0.2, x + size * 1.0, y - size * 0.2);
  line(x - size * 0.2, y, x - size * 1.0, y);
  line(x + size * 0.2, y, x + size * 1.0, y);
  line(x - size * 0.2, y + size * 0.2, x - size * 1.0, y + size * 0.2);
  line(x + size * 0.2, y + size * 0.2, x + size * 1.0, y + size * 0.2);

  fill(255);
  circle(x, y + size * 0.6, size * 0.4);
}

function drawZoey(x, y, size) {
  push();

  noStroke();
  fill(255, 240, 180, 120);
  circle(x, y, size * 1.8);

  imageMode(CENTER);
  image(zoeyImg, x, y, size, size);

  pop();
}
