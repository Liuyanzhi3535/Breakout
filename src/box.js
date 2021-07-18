export { Box };

function Box(x, y, width, height, color, borderRadius) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width;
  this.height = height;
  this.color = color || "#6699FF";
  this.borderRadius = borderRadius || 0;
}

Box.prototype = {
  stroke: function (ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();

    if (this.borderRadius > 0) {
      createRoundRect.bind(this)(ctx);
    } else {
      createRect.bind(this)(ctx);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },
  fill: function (ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();

    if (this.borderRadius > 0) {
      createRoundRect.bind(this)(ctx);
    } else {
      createRect.bind(this)(ctx);
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
};

function createRect(ctx) {
  ctx.translate(this.x, this.y);
  ctx.moveTo(-(this.width / 2), -(this.height / 2));
  ctx.lineTo(this.width / 2, -(this.height / 2));
  ctx.lineTo(this.width / 2, this.height / 2);
  ctx.lineTo(-(this.width / 2), this.height / 2);
}

function createRoundRect(ctx) {
  ctx.translate(this.x, this.y);

  ctx.moveTo(-(this.width / 2) + this.borderRadius, -(this.height / 2));

  ctx.lineTo(this.width / 2 - this.borderRadius, -(this.height / 2));
  ctx.arcTo(
    this.width / 2,
    -(this.height / 2),
    this.width / 2,
    -(this.height / 2) + this.borderRadius,
    this.borderRadius
  );

  ctx.lineTo(this.width / 2, this.height / 2 - this.borderRadius);
  ctx.arcTo(
    this.width / 2,
    this.height / 2,
    this.width / 2 - this.borderRadius,
    this.height / 2,
    this.borderRadius
  );

  ctx.lineTo(-this.width / 2 + this.borderRadius, this.height / 2);
  ctx.arcTo(
    -this.width / 2,
    this.height / 2,
    -this.width / 2,
    -this.height / 2 + this.borderRadius,
    this.borderRadius
  );

  ctx.lineTo(-this.width / 2, -this.height / 2 + this.borderRadius);
  ctx.arcTo(
    -this.width / 2,
    -this.height / 2,
    -this.width / 2 + this.borderRadius,
    -this.height / 2,
    this.borderRadius
  );
}
