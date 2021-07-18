import { Ball } from './ball';
import { Box } from './box';
import { BALL_COLOR, CANVAS_HEIGHT, CANVAS_WIDTH, PADDLE_BORDER_RADIUS, PADDLE_COLOR } from './constants';

// 顏色配置
const TEXT_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.7)';
const BACKGROUND_COLOR = '#0A1931';

export function createCanvasEl() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

export function renderIntro(ctx) {
  ctx.fillStyle = TEXT_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let textX = CANVAS_WIDTH / 2;
  let textY = CANVAS_HEIGHT / 2;
  drawText(ctx, 'Press [enter]', textX, textY, 'black', 25);
}

export function renderBackground(ctx) {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function renderGameOver(ctx) {
  ctx.fillStyle = TEXT_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let textX = CANVAS_WIDTH / 2;
  let textY = CANVAS_HEIGHT / 2;

  drawText(ctx, 'GAME OVER!', textX, textY, 'black', 25);
}

export function renderBall(ctx, ball) {
  const b = new Ball(ball.x, ball.y, ball.radius, BALL_COLOR);
  b.fill(ctx);
}

export function renderPaddle(ctx, paddle) {
  const p = new Box(paddle.x, paddle.y, paddle.width, paddle.height, PADDLE_COLOR, PADDLE_BORDER_RADIUS);
  p.fill(ctx);
}

export function renderBricks(ctx, bricks) {
  bricks.forEach((brick) => renderBrick(ctx, brick));
}

function renderBrick(ctx, brick) {
  const b = new Box(brick.x, brick.y, brick.width, brick.height, brick.color);
  b.fill(ctx);
}

export function renderScore(ctx, score) {
  let textX = CANVAS_WIDTH / 2;
  let textY = 12;

  drawText(ctx, score.toString(), textX, textY, '#EFEFEF', 15);
}

function drawText(ctx, text, x, y, fillStyle, fontSize, horizontalAlign = 'center', verticalAlign = 'middle') {
  ctx.fillStyle = fillStyle;
  ctx.font = `bold ${fontSize}px sans-serif`;

  let textX = x;
  let textY = y;

  ctx.textAlign = horizontalAlign;
  ctx.textBaseline = verticalAlign;

  ctx.fillText(text, textX, textY);
}
