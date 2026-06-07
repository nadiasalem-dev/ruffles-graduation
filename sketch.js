let bannerH, stageY, podiumX, podiumY, podiumW, podiumH;
let catStartX, catY, podiumStopX, offscreenX;
let timeFinish = false;
let rufflesX = 20;
let catCurrent = 0;
let timer = 0;
let pauseTime = 80;
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
let zoeyX;
let zoeyY;
let zoeySize
let zoeyImg;
let RosieSprite;
let distinctionSound;
let closeEnough;
let compieShow = false;
let reachedRuffles = false;
let moveArms = false;
let armsUp = false;
let pushRuffles = false;
let rosieTimer = 0;
let nameSound = [];
let majorIn;
let majors = [];
let steams = [];
let debugMode = true;
let catDebug = 0;
let rufflesPeakChange;

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
let rosieArm;

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
  rufflesPeaks = new Cat(
    offscreenX,
    catY,
    color(155, 255, 255),
    rufflesPeak,
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

cat[catDebug].state = "walkingToPodium";
cat[catDebug].x = catStartX;
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
  for(let i = 0; i < 16; i++){
    steams.push({
      yOffset: random(0, 40),
      noiseOffset: random(1000),
      size: random(4,9),
      speed: random(.3, .7)
    });
  }
  rufflesPeakChange = false;
}

function preload() {
  compie = loadImage("images/compie.png");
  catImages = loadImage("images/spriteGrad.png");
  zoeyImg = loadImage("images/Zoey.png");
  rosieArm = loadImage("images/rosieArm.png");
  rufflesPeak = loadImage("images/rufflespeak.png");
  distinctionSound = loadSound("audio/awards/distinction_award.wav");
  RosieSprite = loadImage("images/RosieSprite.png");
  closeEnough = loadSound("audio/awards/close_enough.wav");
  nameSound[0] = loadSound("audio/names/ada.wav");
  nameSound[1] = loadSound("audio/names/byte.wav");
  nameSound[2] = loadSound("audio/names/bit.wav");
  nameSound[3] = loadSound("audio/names/pixel.wav");
  nameSound[4] = loadSound("audio/names/kernal.wav");
  nameSound[5] = loadSound("audio/names/stack.wav");
  nameSound[6] = loadSound("audio/names/cache.wav");
  nameSound[7] = loadSound("audio/names/vector.wav");
  nameSound[8] = loadSound("audio/names/pointer.wav");
  nameSound[9] = loadSound("audio/names/cipher.wav");
  nameSound[10] = loadSound("audio/names/syntax.wav");
  nameSound[11] = loadSound("audio/names/loop.wav");
  nameSound[12] = loadSound("audio/names/logic.wav");
  nameSound[13] = loadSound("audio/names/turing.wav");
  nameSound[14] = loadSound("audio/names/hopper.wav");
  nameSound[15] = loadSound("audio/names/linus.wav");
  nameSound[16] = loadSound("audio/names/pascal.wav");
  nameSound[17] = loadSound("audio/names/ruffles.wav");
  majorIn = loadSound("audio/majors/majorIn.wav");
  majors[0] = loadSound("audio/majors/appliedRodentPersuit.wav");
  majors[1] = loadSound("audio/majors/humanSeatingRetention.wav");
  majors[2] = loadSound("audio/majors/yarnTheory.wav");
  majors[3] = loadSound("audio/majors/advancedNappingStudies.wav");
  majors[4] = loadSound("audio/majors/avianObservationStudies.wav");
  majors[5] = loadSound("audio/majors/appliedGravityResearch.wav");
  majors[6] = loadSound("audio/majors/solarComfortStudies.wav");
  majors[7] = loadSound("audio/majors/strategicCardboardArchitecture.wav");
    majors[8] = loadSound("audio/majors/humanBehavioralModification.wav");
    majors[9] = loadSound("audio/majors/emergencyResponseAttractionStudies.wav");
  majors[10] = loadSound("audio/majors/catNapping.wav");
  majors[11] = loadSound("audio/majors/bedJumping.wav");
  majors[12] = loadSound("audio/majors/restroomSurveilances.wav");
  majors[13] = loadSound("audio/majors/advancedHousehold.wav");
  majors[14] = loadSound("audio/majors/humanFood.wav");
  majors[15] = loadSound("audio/majors/hideAndSeek.wav");
  majors[16] = loadSound("audio/majors/purrTheory.wav");
  majors[17] = loadSound("audio/majors/humanTraining.wav");
  
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
    for (let i = catDebug; i < cat.length; i++) {
      let c = cat[i];

      if (c.state !== "waiting" && c.state !== "done") {
        c.update();
      }

      if (
        c.state === "leaving" && c.audioDone &&
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
      cat[cat.length - 2].x - catDrawW * 0.85
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

 
if (cat[cat.length - 1].offScreen()) {
  if (!rufflesPeakChange) {
    rufflesPeaks.x = width;
    rufflesPeaks.y = catY - 20;
    rufflesPeaks.speed = -1;
    rufflesPeakChange = true;
  }

  rufflesPeaks.move();

 

  image(rufflesPeak, rufflesPeaks.x, rufflesPeaks.y, catDrawW, catDrawH);
 if (rufflesPeaks.x <= width - 48) {
    rufflesPeaks.speed = 0;
    //displayRosiesArm();
  }
}
 
  for (let i = catDebug; i < cat.length; i++) {
    if (i === cat.length - 1) {
    } else if (cat[i].state !== "waiting") {
      cat[i].display();
    }
  }
  //Draw Mug and mug shadow
  fill(0, 0, 0, 80);

// Compie's red coaster
noStroke();
fill(255, 0, 0);
ellipse(
  podiumX + podiumW * 0.87,
  podiumY + podiumH * 0.29,
  podiumW * 0.28,
  podiumH * 0.10
);
// Compie's mug
fill(255);
rect(
  podiumX + podiumW * 0.8,
  podiumY - podiumH * .25,
  podiumW * 0.14,
  podiumH * 0.5,
  4
);
drawSteam();
noFill();
stroke(255);
arc(
  podiumX + podiumW * 0.94,
  podiumY,
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
        zoeyX = xPosition;
        zoeyY = yPosition;
        zoeySize = catAudienceSize * 1.3;
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
function drawSteam() {
  let mugX = podiumX + podiumW * 0.87;
  let mugY = podiumY - podiumH * 0.25;

  noStroke();

  for (let puff of steams) {
    let drift = map(noise(puff.noiseOffset), 0, 1, -8, 8);
    let x = mugX + drift;
    let y = mugY - puff.yOffset;

    fill(255, 255, 255, 90);
    circle(x, y, puff.size);

    puff.yOffset += puff.speed;
    puff.noiseOffset += 0.01;

    if (puff.yOffset > 55) {
      puff.yOffset = 0;
      puff.size = random(4, 9);
      puff.speed = random(0.3, 0.7);
    }
  }
}
function mouseClicked(){
  if(debugMode){
    zoeyCenter = zoeySize/2;
    if(abs(mouseX - zoeyX) < zoeyCenter && abs(mouseY - zoeyY) < zoeyCenter){
      catDebug = 17;
      cat[catDebug].state = "walkingToPodium";
    }
  }
}
function displayRosiesArm(){
  image(rosieArm, rufflesPeaks.x, rufflesPeaks.y, catDrawW, catDrawH);
  
}
