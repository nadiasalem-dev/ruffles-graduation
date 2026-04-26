class Cat {
  constructor(x, y, col, img, spriteIndex, state) {
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
  }

  atPodium() {
    return this.x + catDrawW / 2 >= podiumX + podiumW / 2;
  }

  move() {
    this.x += this.speed;
  }

  display() {
    let frame = catFrames[this.spriteIndex];
    image(
      this.img,
      this.x,
      this.y,
      catDrawW,
      catDrawH,
      frame.sx,
      frame.sy,
      frame.sw,
      frame.sh -80
    );
    this.awardType = "";
    if (this.spriteIndex === 17) this.awardType = this.awardException;
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
        this.x = podiumX + podiumW / 2 - catDrawW/2;
        this.state = "pausing";
        this.pauseTimer = 0;
      }
    } else if (this.state === "pausing") {
      this.pauseTimer++;

      if (this.pauseTimer >= pauseTime) {
        this.state = "leaving";
      }
    } else if (this.state === "leaving") {
      this.move();

      if (this.offScreen()) {
        this.state = "done";
      }
    }
  }
  displayAward() {
    textSize(bannerH * 0.28);
    textAlign(CENTER);
    fill(255);
    text(this.name + " " + this.awardType, width / 2, bannerH * 0.85);
  }
}
