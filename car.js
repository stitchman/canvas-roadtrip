import { Wheel } from "./wheel.js";

export class Car {
  constructor(x, y, carWidth, carHeight, wheelSize) {
    this.x = x;
    this.initY = y;
    this.y = this.initY;

    this.wb1 = carWidth / 2;
    this.wb2 = carWidth / 2;
    this.wt1 = (carWidth * 5) / 8;
    this.wt2 = carWidth / 8;
    this.wt3 = carWidth / 4;
    this.h1 = carHeight / 2;
    this.h2 = carHeight / 6;
    this.h3 = carHeight / 3;

    this.wheelSize = wheelSize;
    this.frontWheel = new Wheel(this.x + this.wb2 / 2, this.y, this.wheelSize);
    this.rearWheel = new Wheel(this.x - this.wb1 / 2, this.y, this.wheelSize);

    this.wobble = 0;
  }

  update(velocity) {
    this.wobble += velocity / 2;
    this.y = this.initY + 2 * Math.sin(this.wobble);
  }

  draw(ctx, velocity) {
    this.update(velocity);
    //draw car
    ctx.fillStyle = "#4263eb";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.wb1, this.y);
    ctx.lineTo(this.x - this.wb1, this.y - this.h2 - this.h3);
    ctx.lineTo(
      this.x - this.wb1 + this.wt2,
      this.y - this.h1 - this.h2 - this.h3
    );
    ctx.lineTo(
      this.x - this.wb1 + this.wt1 + this.wt2,
      this.y - this.h1 - this.h2 - this.h3
    );
    ctx.lineTo(
      this.x - this.wb1 + this.wt1 + this.wt2 * 2,
      this.y - this.h2 - this.h3
    );
    ctx.lineTo(
      this.x - this.wb1 + this.wt1 + this.wt2 * 2 + this.wt3,
      this.y - this.h3
    );
    ctx.lineTo(this.x - this.wb1 + this.wt1 + this.wt2 * 2 + this.wt3, this.y);
    ctx.closePath();
    ctx.fill();

    //draw wheels
    this.frontWheel.animate(ctx, velocity);
    this.rearWheel.animate(ctx, velocity);
  }
}
