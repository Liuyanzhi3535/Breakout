import { Ball } from "./ball.js";
import { Box } from "./box.js";
import { Scoreboard } from "./scoreboard.js";

const stage = document.getElementById("stage");
const ctx = stage.getContext("2d");

// ticker
{
  const TICKER_INTERVAL = Math.ceil(1000 / 60);

  var ticker$ = rxjs
    .interval(TICKER_INTERVAL, rxjs.Scheduler.animationFrameScheduler)
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
    .pipe(rxjs.operators.map((_) => "none"));

  var key$ = rxjs
    .merge(keyup$, keydown$)
    .pipe(rxjs.operators.distinctUntilChanged());

  function covertToDirection(keyCode) {
    let key;

    if (keyCode === 38 || keyCode === 87) {
      key = "up";
    } else if (keyCode === 39 || keyCode === 68) {
      key = "right";
    } else if (keyCode === 40 || keyCode === 83) {
      key = "down";
    } else if (keyCode === 37 || keyCode === 65) {
      key = "left";
    } else if (keyCode === 13) {
      key = "enter";
    } else {
      key = "";
    }

    return key;
  }

  key$.pipe(rxjs.operators.filter((key) => key === "enter")).subscribe((_) => {
    if (sub.isStopped) {
      resetBall();
      resetPaddle();
      resetScore();
      resetbricks();

      sub = game$.pipe(rxjs.operators.takeUntil(restart)).subscribe(observer);
    }
  });
}

// ball
{
  const BALL_RADIUS = 7;
  var BALL_SPEED_X = 120;
  var BALL_SPEED_Y = 120;

  var ball = new Ball(
    stage.width / 2,
    stage.height / 2,
    BALL_RADIUS,
    "#C84B31"
  );
}
function resetBall() {
  ball.x = stage.width / 2;
  ball.y = stage.height / 2;
}

// paddle
{
  var PADDLE_WIDTH = 100;
  var PADDLE_HEIGHT = 10;
  var PADDLE_SPEED = 240;

  var paddle = new Box(
    stage.width / 2,
    stage.height - PADDLE_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    "#346751",
    5
  );

  var paddleRight$ = key$.pipe(
    rxjs.operators.filter((direction) => direction === "right"),
    rxjs.operators.map((direction) => 1)
  );

  var paddleLeft$ = key$.pipe(
    rxjs.operators.filter((direction) => direction === "left"),
    rxjs.operators.map((direction) => -1)
  );

  var paddleOther$ = key$.pipe(
    rxjs.operators.filter(
      (direction) =>
        direction !== "left" && direction !== "right" && direction !== "enter"
    ),
    rxjs.operators.map((direction) => 0)
  );

  var paddleStep$ = rxjs.merge(paddleRight$, paddleLeft$, paddleOther$);
}
function resetPaddle() {
  paddle.x = stage.width / 2;
  paddle.y = stage.height - PADDLE_HEIGHT;
}

// bricks
{
  var BRICK_ROWS = 5;
  var BRICK_COLUMNS = 7;
  var BRICK_HEIGHT = 20;
  var BRICK_GAP = 3;

  var bricks = createBricks();
}

function createBricks() {
  let width =
    (stage.width - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) / BRICK_COLUMNS;
  let bricks = [];

  for (let i = 0; i < BRICK_ROWS; i++) {
    for (let j = 0; j < BRICK_COLUMNS; j++) {
      bricks.push(
        new Box(
          j * (width + BRICK_GAP) + width / 2 + BRICK_GAP,
          i * (BRICK_HEIGHT + BRICK_GAP) + BRICK_HEIGHT / 2 + BRICK_GAP + 20,
          width,
          BRICK_HEIGHT,
          "#346751"
        )
      );
    }
  }

  return bricks;
}

function resetbricks() {
  bricks = createBricks();
}

// scoreboard
{
  const LEFT_BORDER = 3;
  var scoreboard = new Scoreboard(LEFT_BORDER, 15, 0);
  scoreboard.fill(ctx);
}

function resetScore() {
  scoreboard.score = 0;
}

function drawIntro() {
  ctx.clearRect(0, 0, stage.width, stage.height);
  ctx.textAlign = "center";
  ctx.font = "24px Courier New";
  ctx.fillStyle = "#0A1931";
  ctx.fillText("Press [<] and [>]", stage.width / 2, stage.height / 2);
}

function drawGameOver(text) {
  ctx.clearRect(
    stage.width / 4,
    stage.height / 3,
    stage.width / 2,
    stage.height / 3
  );
  ctx.textAlign = "center";
  ctx.font = "24px Courier New";
  ctx.fillStyle = "#ECDBBA";
  ctx.fillRect(
    stage.width / 4,
    stage.height / 3,
    stage.width / 2,
    stage.height / 3
  );
  ctx.fillStyle = "#0A1931";
  ctx.fillText(text, stage.width / 2, stage.height / 2);
}

// game
{
  var restart = new rxjs.Subject();

  var game$ = ticker$
    .pipe(
      rxjs.operators.tap((_) => drawIntro()),
      rxjs.operators.combineLatest(paddleStep$)
    )
    .pipe(
      rxjs.operators.map(([{ interval }, paddleStep]) => {
        // ball
        {
          const isHitRightBoundary = (ball) => {
            return ball.x > stage.width - ball.radius;
          };
          const isHitLeftBoundary = (ball) => {
            return ball.x < ball.radius;
          };
          const isHitTopBoundary = (ball) => {
            return ball.y < ball.radius;
          };
          var isHitBottomBoundary = (ball) => {
            return ball.y > stage.height - ball.radius;
          };
          const isHitPaddle = (ball, paddle) => {
            return (
              ball.y > paddle.y - paddle.height / 2 - ball.radius &&
              ball.x < paddle.x + paddle.width / 2 &&
              ball.x > paddle.x - paddle.width / 2
            );
          };

          ball.x += BALL_SPEED_X * interval;
          ball.y += BALL_SPEED_Y * interval;

          // x

          if (isHitRightBoundary(ball)) {
            ball.x = stage.width - ball.radius;
            BALL_SPEED_X = -BALL_SPEED_X;
          } else if (isHitLeftBoundary(ball)) {
            ball.x = ball.radius;
            BALL_SPEED_X = -BALL_SPEED_X;
          }

          // y

          if (isHitPaddle(ball, paddle)) {
            ball.y = paddle.y - PADDLE_HEIGHT / 2 - ball.radius;
            BALL_SPEED_Y = -BALL_SPEED_Y;
          } else if (isHitTopBoundary(ball)) {
            ball.y = ball.radius;
            BALL_SPEED_Y = -BALL_SPEED_Y;
          }
        }
        // paddle
        {
          const updatedX = paddle.x + +paddleStep * PADDLE_SPEED * +interval;
          const isHitBoundary = (paddle) =>
            updatedX - paddle.width / 2 < 0 - 5 ||
            updatedX + paddle.width / 2 > stage.width + 5;

          if (!isHitBoundary(paddle)) {
            paddle.x = updatedX;
          }
        }
        // bricks
        {
          const isHitBrick = (brick, ball) => {
            return (
              ball.y < brick.y + brick.height / 2 + ball.radius &&
              ball.y > brick.y - brick.height / 2 - ball.radius &&
              ball.x < brick.x + brick.width / 2 + ball.radius &&
              ball.x > brick.x - brick.width / 2 - ball.radius
            );
          };

          let remainingBricks = [];

          bricks.forEach((brick, index) => {
            if (isHitBrick(brick, ball)) {
              BALL_SPEED_Y = -BALL_SPEED_Y;
              scoreboard.score += 10;
            } else {
              remainingBricks.push(brick);
            }
          });

          bricks = remainingBricks;
        }

        if (isHitBottomBoundary(ball)) {
          return "lose";
        }

        if (bricks.length === 0) {
          return "win";
        }

        return "continue";
      }, null)
    );

  var observer = {
    next: (state) => {
      if (state === "continue") {
        ctx.clearRect(0, 0, stage.width, stage.height);
        ball.fill(ctx);
        paddle.fill(ctx);
        bricks.forEach((b) => b.fill(ctx));
        scoreboard.fill(ctx);
      }

      if (state === "win") {
        ctx.clearRect(0, 0, stage.width, stage.height);
        ball.fill(ctx);
        paddle.fill(ctx);
        bricks.forEach((b) => b.fill(ctx));
        scoreboard.fill(ctx);
        drawGameOver("Yeah!!!!");
        restart.next();
      }

      if (state === "lose") {
        ctx.clearRect(0, 0, stage.width, stage.height);
        ball.fill(ctx);
        paddle.fill(ctx);
        bricks.forEach((b) => b.fill(ctx));
        scoreboard.fill(ctx);
        drawGameOver("lose");
        restart.next();
      }
    },
  };

  var sub = game$.pipe(rxjs.operators.takeUntil(restart)).subscribe(observer);
}
