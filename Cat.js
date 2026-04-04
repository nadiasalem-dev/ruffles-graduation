class Cat{
  constructor(x, y, col){
        this.x = x;
        this.y = 580;
        this.col = col;
  }
  atPodium(){
    return this.x > 350;
  }
  move(){
     this.x++;
  }
  display(){
    fill(this.col);
    ellipse(this.x, this.y, 20, 20);
  }
  offScreen(){
    return this.x >= 740;
  }
}
