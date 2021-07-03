import { Ball } from "./ball.js";
import { Box } from "./box.js";
import { Scoreboard } from "./scoreboard.js";

const stage = document.getElementById("stage");
const cxt = stage.getContext("2d");

// ball
{
  const BALL_RADIUS = 10;

  var ball = new Ball(
    stage.width / 2,
    stage.height / 2,
    BALL_RADIUS,
    "#FF6699"
  );

  ball.fill(cxt);
}

// paddle
{
  const PADDLE_WIDTH = 100;
  const PADDLE_HEIGHT = 20;

  var paddle = new Box(
    stage.width / 2,
    stage.height - PADDLE_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    "#114752",
    10
  );

  paddle.fill(cxt);
}

// bricks
{
  const BRICK_ROWS = 5;
  const BRICK_COLUMNS = 7;
  const BRICK_HEIGHT = 20;
  const BRICK_GAP = 3;

  var bricks = createBricks();

  bricks.forEach((b) => b.fill(cxt));

  function createBricks() {
    let width =
      (stage.width - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) / BRICK_COLUMNS;
    let bricks = [];

    for (let i = 0; i < BRICK_ROWS; i++) {
      for (let j = 0; j < BRICK_COLUMNS; j++) {
        bricks.push(
          new Box(
            j * (width + BRICK_GAP) + BRICK_GAP,
            i * (BRICK_HEIGHT + BRICK_GAP) + BRICK_GAP + 20,
            width,
            BRICK_HEIGHT,
            "#114752"
          )
        );
      }
    }

    return bricks;
  }
}

// scoreboard
{
  const LEFT_BORDER = 3;
  var scoreboard = new Scoreboard(LEFT_BORDER, 15, 0);
  scoreboard.fill(cxt);
}

// ticker
{
  const TICKER_INTERVAL = Math.ceil(1000 / 60);

  var ticker$ = rxjs
    .interval(TICKER_INTERVAL, rxjs.Scheduler.requestAnimationFrame)
    .pipe(
      rxjs.operators.timeInterval(),
      rxjs.operators.map(({ interval }) => ({
        time: Date.now(),
        interval: interval / 1000,
      }))
    );
}

// keyboard event
{
  const keydown$ = rxjs
    .fromEvent(document, "keydown")
    .pipe(rxjs.operators.map(({ keyCode }) => covertToDirection(keyCode)));

  const keyup$ = rxjs
    .fromEvent(document, "keyup")
    .pipe(rxjs.operators.map((_) => "stop"));

  var key$ = rxjs
    .merge(keyup$, keydown$)
    .pipe(rxjs.operators.distinctUntilChanged());

  function covertToDirection(keyCode) {
    let key = {};

    if (keyCode === 38 || keyCode === 87) {
      key.direction = "up";
    } else if (keyCode === 39 || keyCode === 68) {
      key.direction = "right";
    } else if (keyCode === 40 || keyCode === 83) {
      key.direction = "down";
    } else if (keyCode === 37 || keyCode === 65) {
      key.direction = "left";
    } else {
      key.direction = "";
    }

    return key.direction;
  }
}


