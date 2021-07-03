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
  stroke: function (cxt) {
    cxt.save();
    cxt.strokeStyle = this.color;
    cxt.beginPath();

    if (this.borderRadius > 0) {
      createRoundRect.bind(this)(cxt);
    } else {
      cxt.rect(this.x, this.y, this.width, this.height);
    }

    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  },
  fill: function (cxt) {
    cxt.save();
    cxt.fillStyle = this.color;
    cxt.beginPath();

    if (this.borderRadius > 0) {
      createRoundRect.bind(this)(cxt);
    } else {
      cxt.rect(this.x, this.y, this.width, this.height);
    }

    cxt.closePath();
    cxt.fill();
    cxt.restore();
  },
};

function createRoundRect(cxt) {
  cxt.translate(this.x, this.y);

  cxt.moveTo(-(this.width / 2) + this.borderRadius, -(this.height / 2));

  cxt.lineTo(this.width / 2 - this.borderRadius, -(this.height / 2));
  cxt.arcTo(
    this.width / 2,
    -(this.height / 2),
    this.width / 2,
    -(this.height / 2) + this.borderRadius,
    this.borderRadius
  );

  cxt.lineTo(this.width / 2, this.height / 2 - this.borderRadius);
  cxt.arcTo(
    this.width / 2,
    this.height / 2,
    this.width / 2 - this.borderRadius,
    this.height / 2,
    this.borderRadius
  );

  cxt.lineTo(-this.width / 2 + this.borderRadius, this.height / 2);
  cxt.arcTo(
    -this.width / 2,
    this.height / 2,
    -this.width / 2,
    -this.height / 2 + this.borderRadius,
    this.borderRadius
  );

  cxt.lineTo(-this.width / 2, -this.height / 2 + this.borderRadius);
  cxt.arcTo(
    -this.width / 2,
    -this.height / 2,
    -this.width / 2 + this.borderRadius,
    -this.height / 2,
    this.borderRadius
  );
}
