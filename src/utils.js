import {
  BRICK_COLOR,
  BRICK_COLUMNS,
  BRICK_GAP,
  BRICK_HEIGHT,
  BRICK_ROWS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from './constants';

// ball
export function isHitRightBoundary(ball) {
  return ball.x > CANVAS_WIDTH - ball.radius;
}

export function isHitLeftBoundary(ball) {
  return ball.x < ball.radius;
}

export function isHitTopBoundary(ball) {
  return ball.y < ball.radius;
}

export function isHitBottomBoundary(ball) {
  return ball.y > CANVAS_HEIGHT - ball.radius;
}

export function isHitPaddle(ball, paddle) {
  return (
    ball.y > paddle.y - paddle.height / 2 - ball.radius &&
    ball.x < paddle.x + paddle.width / 2 &&
    ball.x > paddle.x - paddle.width / 2
  );
}

// paddle
export function isPaddleHitBoundary(updatedX, paddle) {
  return updatedX - paddle.width / 2 < 0 - 5 || updatedX + paddle.width / 2 > CANVAS_WIDTH + 5;
}
// brick
export function createInitBricks() {
  let width = (CANVAS_WIDTH - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) / BRICK_COLUMNS;
  let bricks = [];

  for (let i = 0; i < BRICK_ROWS; i++) {
    for (let j = 0; j < BRICK_COLUMNS; j++) {
      bricks.push({
        x: j * (width + BRICK_GAP) + width / 2 + BRICK_GAP,
        y: i * (BRICK_HEIGHT + BRICK_GAP) + BRICK_HEIGHT / 2 + BRICK_GAP + 20,
        width,
        height: BRICK_HEIGHT,
        color: BRICK_COLOR,
      });
    }
  }

  return bricks;
}

export function isHitBrick(brick, ball) {
  return (
    ball.y < brick.y + brick.height / 2 + ball.radius &&
    ball.y > brick.y - brick.height / 2 - ball.radius &&
    ball.x < brick.x + brick.width / 2 + ball.radius &&
    ball.x > brick.x - brick.width / 2 - ball.radius
  );
}
