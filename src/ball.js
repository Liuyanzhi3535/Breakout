export { Ball };

function Ball(x, y, radius, color) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 12;
  this.color = color || "#6699FF";

  this.scaleX = 1;
  this.scaleY = 1;
}

Ball.prototype = {
  stroke: function (ctx) {
    ctx.save();
    ctx.scale(this.scaleX, this.scaleY);
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },
  fill: function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  getRect: function () {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  },
};
