class Cat {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  atPodium() {
    return this.x > podiumStopX;
  }

  move() {
    this.x = this.x + 1.5;
  }

  display() {
    fill(this.col);
    if(!this.offScreen()){
    ellipse(this.x, this.y, 20, 20);
    }
  }

  offScreen() {
    return this.x >= offScreenX;
  }
}
