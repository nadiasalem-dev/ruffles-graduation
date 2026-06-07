class Cat {
  constructor(x, y, col, img, spriteIndex, state, isRuffles) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.img = img;
    this.spriteIndex = spriteIndex;
    this.state = state;
    this.pauseTimer = 0;
    this.speed = 1.5;
    this.award = false;
    this.awardType = "";
    this.awardException = "- With Disctinction close enough";
    this.name = names[this.spriteIndex];
    this.isRuffles = isRuffles;
    this.audioDone = false;
    this.audioStarted = false;
  }

  atPodium() {
    return this.x + catDrawW / 2 >= podiumX + podiumW / 2;
  }

  move() {
    this.x += this.speed;
  }

  display() {
    let frame = catFrames[this.spriteIndex];

    let cropH = frame.sh - 80;
    let baseHeight = 370;
    let scale = frame.sh / baseHeight;

    let drawH = catDrawH * scale;
    let drawW = catDrawW;

    let y = height - drawH;

    if (this.spriteIndex >= 6) {
      y -= height * 0.01;
    }

    image(this.img, this.x, y, drawW, drawH, frame.sx, frame.sy, frame.sw, cropH);

    noStroke();
    fill(0, 0, 0, 60);
    ellipse(this.x + drawW / 2, height - 8, drawW * 0.8, 12);

    this.awardType = "";

    if (this.isRuffles) {
      this.awardType = this.awardException;
    } else if (this.award) {
      this.awardType = "- Distinction Award";
    }

    if (this.state === "pausing") {
      this.displayAward();
    }
  }

  offScreen() {
    return this.x >= offScreenX + 80;
  }

  update() {
    if (this.state === "waiting") return;

    if (this.state === "walkingToPodium") {
      this.move();

      if (this.atPodium()) {
        this.x = podiumX + podiumW / 2 - catDrawW / 2;
        this.state = "pausing";
        this.pauseTimer = 0;
        this.audioDone = false;
        this.audioStarted = false;
      }
    } else if (this.state === "pausing") {
      this.pauseTimer++;

      if (!this.audioStarted) {
        this.audioStarted = true;
        this.playCeremonyAudio();
      }

      if (this.audioDone && !this.isRuffles) {
        this.state = "leaving";
      } else if (this.audioDone && this.isRuffles) {
        compieShow = true;
        this.state = "rufflesRefuseToLeave";
      }
    } else if (this.state === "leaving") {
      this.move();

      if (this.offScreen()) {
        this.state = "done";
      }
    } else if (this.state === "rufflesRefuseToLeave") {
      // Ruffles waits here until Rosie starts pushing.
    }
  }

  displayAward() {
    textSize(bannerH * 0.28);
    textAlign(CENTER);
    fill(255);
    text(this.name + " " + this.awardType, width / 2, bannerH * 0.85);
  }

  playCeremonyAudio() {
    let name = nameSound[this.spriteIndex];

    if (name) {
      name.play();
      name.onended(() => {
        this.playAwardAudio();
      });
    } else {
      this.playAwardAudio();
    }
  }

  playAwardAudio() {
    if (this.awardType !== "") {
      let sound = this.isRuffles ? closeEnough : distinctionSound;

      sound.play();
      sound.onended(() => {
        this.playMajorIntro();
      });
    } else {
      this.playMajorIntro();
    }
  }

  playMajorIntro() {
    majorIn.play();

    majorIn.onended(() => {
      this.playMajorAudio();
    });
  }

  playMajorAudio() {
    let major = majors[this.spriteIndex];

    if (major) {
      major.play();
      major.onended(() => {
        this.audioDone = true;
      });
    } else {
      this.audioDone = true;
    }
  }

  displayRosie() {
    let frameW = RosieSprite.width / 4;
    let frameH = RosieSprite.height;

    let rosieScale = 1.5;
    let rosieDrawW = catDrawW * 0.97;
    let rosieDrawH = catDrawH * rosieScale;

    rosieDrawH += catDrawH * 0.35;

    let rosieFloorOffset = catDrawH * 0.45;
    let RosieY = height - rosieDrawH + rosieFloorOffset;

    let sourceX = 0;

    if (this.state === "walking to Ruffles") {
      sourceX = 0;
    } else if (this.state === "raise arms") {
      sourceX = frameW;
    } else if (this.state === "arms at middle") {
      sourceX = frameW * 2;
    } else if (this.state === "push") {
      sourceX = frameW * 3;
    } else {
      return;
    }

    image(
      RosieSprite,
      this.x,
      RosieY,
      rosieDrawW,
      rosieDrawH,
      sourceX,
      0,
      frameW,
      frameH
    );

    if (this.state === "walking to Ruffles" || this.state === "push") {
      this.move();
    }
  }
}
