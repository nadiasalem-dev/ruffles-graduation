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
  }

  atPodium() {
    return this.x + catDrawW / 2 >= podiumX + podiumW / 2;
  }

  move() {
    this.x += this.speed;
  }
  display() {
    let frame = catFrames[this.spriteIndex];

    // Remove hat space
    let cropH = frame.sh - 80;

    // Reference sprite height (row 1)
    let baseHeight = 370;

    // Scale based on actual sprite height
    let scale = frame.sh / baseHeight;

    let drawH = catDrawH * scale;
    let drawW = catDrawW;

    let y = height - drawH;
    if (this.spriteIndex >= 6) {
      const rowOffset = height * 0.01;
      y -= rowOffset;
    }
    image(
      this.img,
      this.x,
      y,
      drawW,
      drawH,
      frame.sx,
      frame.sy,
      frame.sw,
      cropH
    );
    // draw shadow on stage floor
    noStroke();
    fill(0, 0, 0, 60); // soft transparent shadow
    ellipse(this.x + drawW / 2, height - 8, drawW * 0.8, 12);
    this.awardType = "";
    if (this.isRuffles) this.awardType = this.awardException;
    else if (this.award) {
      this.awardType = "- Distinction Award";
    }

    if (this.state === "pausing") this.displayAward();
  }

  offScreen() {
    return this.x >= offScreenX + 80;
  }
  update() {
    if (this.state === "waiting") {
      return;
    }

    if (this.state === "walkingToPodium") {
      this.move();

      if (this.atPodium()) {
        // Snap exactly to center once
        this.x = podiumX + podiumW / 2 - catDrawW / 2;
        this.state = "pausing";
        this.pauseTimer = 0;
        this.playDistinction();
      }
    } else if (this.state === "pausing") {
      this.pauseTimer++;

      if (this.pauseTimer >= pauseTime && !this.isRuffles) {
        this.state = "leaving";
      } else if (this.pauseTimer >= pauseTime + 15 && this.isRuffles) {
        compieShow = true;
        this.state = "rufflesRefuseToLeave";
        //compieShow = true;
      }
    } else if (this.state === "leaving") {
      this.move();

      if (this.offScreen()) {
        this.state = "done";
      }
    } else if (this.state === "rufflesRefuseToLeave") {
      //this.state = "leaving";
    }
  }
  displayAward() {
    textSize(bannerH * 0.28);
    textAlign(CENTER);
    fill(255);
    text(this.name + " " + this.awardType, width / 2, bannerH * 0.85);
  }
  playDistinction() {
    if (this.awardType != "") {
      distinctionSound.play();
    }
  }
  displayRosie() {
  let rosieScale = 1.5;

  let rosieW = catDrawW * rosieScale;
  let rosieH = catDrawH * rosieScale;

  let rosieDrawW = rosieW - catDrawW * 0.18;
  let rosieDrawH = rosieH + height * 0.04;

  let rosieFloorOffset = height * 0.055;
  let RosieY = height - rosieDrawH + rosieFloorOffset;

  let frameW = RosieSprite.width / 4;
  let frameH = RosieSprite.height;

  if (this.state == "walking to Ruffles") {
    image(
      RosieSprite,
      this.x,
      RosieY,
      rosieDrawW,
      rosieDrawH,
      0,
      0,
      frameW,
      frameH
    );

    this.move();
  } else if (this.state === "raise arms") {
    image(
      RosieSprite,
      this.x,
      RosieY,
      rosieDrawW,
      rosieDrawH,
      frameW,
      0,
      frameW,
      frameH
    );
  } else if (this.state === "arms at middle") {
    image(
      RosieSprite,
      this.x,
      RosieY,
      rosieDrawW,
      rosieDrawH,
      frameW * 2,
      0,
      frameW,
      frameH
    );
  } else if (this.state === "push") {
    image(
      RosieSprite,
      this.x,
      RosieY,
      rosieDrawW,
      rosieDrawH,
      frameW * 3,
      0,
      frameW,
      frameH
    );

    this.move();
  }

  }
}
