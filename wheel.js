export class Wheel {
  constructor(x, y, wheelSize) {
    this.x = x;
    this.y = y;
    this.wheelSize = wheelSize;
    this.wheelSides = 10;
    this.tireSize = wheelSize / 4;
    this.spokeSize = this.wheelSize - this.tireSize;

    this.rotate = 0;
  }

  animate(ctx, velocity) {
    //draw outer circle
    ctx.fillStyle = "#343a40";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.wheelSize, 0, 2 * Math.PI);
    ctx.fill();

    //draw inner circle
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.spokeSize, 0, 2 * Math.PI);
    ctx.fill();

    //draw spokes
    const angle = (2 * Math.PI) / this.wheelSides;
    ctx.save();
    ctx.strokeStyle = "#495057";
    ctx.translate(this.x, this.y);

    // console.log(velocity);
    this.rotate += velocity * 0.2;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.wheelSides; i++) {
      const x = this.spokeSize * Math.cos(angle * i);
      const y = this.spokeSize * Math.sin(angle * i);
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.restore();
  }
}
