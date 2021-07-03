export { Scoreboard };

function Scoreboard(x, y, score) {
  this.x = x || 0;
  this.y = y || 0;
  this.score = score || 0;
  this.font = "16px Courier New";
  this.align = "left";
}

Scoreboard.prototype = {
  fill: function (cxt) {
    cxt.save();
    cxt.textAlign = this.align;
    cxt.font = this.font;
    cxt.fillText(this.score, this.x, this.y);
    cxt.restore();
  },
};
