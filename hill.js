export class Hill {
  constructor(color, distance, total) {
    this.color = color;
    this.distance = distance;
    this.total = total;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.gap = this.stageWidth / (this.total - 3);
    this.points = [];
    for (let i = 0; i < this.total; i++) {
      const point = {
        x: this.gap * (i - 1),
        y: this.getY(),
      };
      this.points[i] = point;
    }
  }

  draw(ctx, velocity) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    let dots = [];

    this.speed = (velocity / this.distance) * 40;

    if (this.speed > 0) {
      cur.x -= this.speed;
      if (
        this.points[this.points.length - 1].x <
        this.stageWidth + this.gap * 2
      ) {
        this.points.push({
          x: this.stageWidth + this.gap * 3,
          y: this.getY(),
        });
      } else if (cur.x < -this.gap * 3) {
        this.points.shift();
      }
    } else {
      cur.x -= this.speed;
      if (cur.x > -this.gap * 2) {
        this.points.unshift({
          x: -(this.gap * 3),
          y: this.getY(),
        });
      } else if (
        this.points[this.points.length - 1].x >
        this.stageWidth + this.gap * 2
      ) {
        this.points.pop();
      }
    }

    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];
      cur.x -= this.speed;

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(prev.x, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();

    return dots;
  }

  getY() {
    const min = this.stageHeight / 8;
    const max = this.stageHeight - min;
    return min + Math.random() * max;
  }
}
