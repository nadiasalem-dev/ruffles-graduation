class Cat {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  atPodium() {
    return this.x > 350;
  }

  move() {
    this.x++;
  }

  display() {
    fill(this.col);
    ellipse(sx * this.x, sy * this.y, sx * 20, sy * 20);
  }

  offScreen() {
    return this.x >= 740;
  }
}
