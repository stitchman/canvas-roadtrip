import { Car } from "./car.js";
import { Hill } from "./hill.js";

const CAR_WIDTH = 400;
const CAR_HEIGHT = 250;
const WHEELSIZE = 60;
const ACCELERATION = 0.5;

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.velocity = 0;
    this.hills = [
      new Hill("#fff3bf", 7, 10),
      new Hill("#ffec99", 3, 7),
      new Hill("#ffe066", 1, 5),
    ];

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.car = new Car(
      this.stageWidth / 2,
      this.stageHeight - WHEELSIZE,
      CAR_WIDTH,
      CAR_HEIGHT,
      WHEELSIZE
    );

    window.addEventListener("keydown", this.onDown.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.hills.forEach((hill) => {
      hill.resize(this.stageWidth, this.stageHeight);
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.velocity *= 0.92;

    this.hills.forEach((hill) => {
      hill.draw(this.ctx, this.velocity);
    });

    this.car.draw(this.ctx, this.velocity);
  }

  onDown(e) {
    if (e.key === "ArrowRight") {
      this.velocity += ACCELERATION;
    } else if (e.key === "ArrowLeft") {
      this.velocity -= ACCELERATION;
    }
  }
}

window.onload = () => {
  new App();
};
