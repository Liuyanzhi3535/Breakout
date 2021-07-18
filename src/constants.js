export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 320;

export const FPS = Math.ceil(1000 / 60);

// ball
export const BALL_RADIUS = 7;
export const BALL_COLOR = '#FFC947';
export const BALL_INIT = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
  radius: BALL_RADIUS,
  color: BALL_COLOR,
};
export const BALL_SPEED_X = 120;
export const BALL_SPEED_Y = 120;

// paddle
export const PADDLE_WIDTH = 100;
export const PADDLE_HEIGHT = 12;
export const PADDLE_SPEED = 240;
export const PADDLE_COLOR = '#EFEFEF';
export const PADDLE_BORDER_RADIUS = 5;
export const PADDLE_STEP_MAP = new Map();
PADDLE_STEP_MAP.set('ArrowLeft', -1);
PADDLE_STEP_MAP.set('ArrowRight', 1);

export const PADDLE_INIT_POSTION = [CANVAS_WIDTH / 2, CANVAS_HEIGHT - PADDLE_HEIGHT * 1.4];
export const PADDLE_INIT = {
  x: PADDLE_INIT_POSTION[0],
  y: PADDLE_INIT_POSTION[1],
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  color: PADDLE_COLOR,
  borderRadius: PADDLE_BORDER_RADIUS,
};

// brick
export const BRICK_ROWS = 5;
export const BRICK_COLUMNS = 7;
export const BRICK_HEIGHT = 20;
export const BRICK_GAP = 3;
export const BRICK_COLOR = '#185ADB';

// score
export const PRE_HIT_SCORE = 10;
