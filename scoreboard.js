export { Scoreboard };

function Scoreboard(x, y, score) {
  this.x = x || 0;
  this.y = y || 0;
  this.score = score || 0;
  this.font = "16px Courier New";
  this.align = "left";
}

Scoreboard.prototype = {
  fill: function (ctx) {
    ctx.save();
    ctx.textAlign = this.align;
    ctx.font = this.font;
    ctx.fillText(this.score, this.x, this.y);
    ctx.restore();
  },
};
