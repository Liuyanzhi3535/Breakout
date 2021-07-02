const stage = document.getElementById("stage");
const context = stage.getContext("2d");
context.fillStyle = "green";

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;

const BALL_RADIUS = 10;

const BRICK_ROWS = 5;
const BRICK_COLUMNS = 7;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 3;

function drawIntro() {
  context.clearRect(0, 0, stage.width, stage.height);
  context.textAlign = "center";
  context.font = "24px Courier New";
  context.fillText("Press [<] and [>]", stage.width / 2, stage.height / 2);
}

function drawGameOver(text) {
  context.clearRect(
    stage.width / 4,
    stage.height / 3,
    stage.width / 2,
    stage.height / 3
  );
  context.textAlign = "center";
  context.font = "24px Courier New";
  context.fillText(text, stage.width / 2, stage.height / 2);
}

function drawScore(score) {
  context.textAlign = "left";
  context.font = "16px Courier New";
  context.fillText(score, BRICK_GAP, 16);
}

function drawPaddle(position) {
  context.beginPath();
  context.rect(
    position - PADDLE_WIDTH / 2,
    context.canvas.height - PADDLE_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  context.fill();
  context.closePath();
}

function drawBall(ball) {
  context.beginPath();
  context.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
  context.fill();
  context.closePath();
}

function drawBrick(brick) {
  context.beginPath();
  context.rect(
    brick.x - brick.width / 2,
    brick.y - brick.height / 2,
    brick.width,
    brick.height
  );
  context.fill();
  context.closePath();
}

function drawBricks(bricks) {
  bricks.forEach((brick) => drawBrick(brick));
}

// 計時器
const TICKER_INTERVAL = Math.ceil(1000 / 60);

const ticker$ = rxjs
  .interval(TICKER_INTERVAL, rxjs.Scheduler.requestAnimationFrame)
  .pipe(
    rxjs.operators.map(() => ({
      time: Date.now(),
      deltaTime: null,
    })),
    rxjs.operators.scan((previous, current) => ({
      time: current.time,
      deltaTime: (current.time - previous.time) / 1000,
    }))
  );

// 按鍵
const PADDLE_CONTROLS = {
  ArrowLeft: -1,
  ArrowRight: 1,
};

const key$ = rxjs
  .merge(
    rxjs
      .fromEvent(document, "keydown")
      .pipe(rxjs.operators.map((event) => PADDLE_CONTROLS[event.key] || 0)),
    rxjs.fromEvent(document, "keyup").pipe(rxjs.operators.map((event) => 0))
  )
  .pipe(rxjs.operators.distinctUntilChanged());

// 球拍
const PADDLE_SPEED = 240;

const createPaddle$ = (ticker$) =>
  ticker$.pipe(
    rxjs.operators.withLatestFrom(key$),
    rxjs.operators.scan((position, [ticker, direction]) => {
      const nextPosition =
        position + direction * ticker.deltaTime * PADDLE_SPEED;
      return Math.max(
        Math.min(nextPosition, stage.width - PADDLE_WIDTH / 2),
        PADDLE_WIDTH / 2
      );
    }, stage.width / 2),
    rxjs.operators.distinctUntilChanged()
  );

// 球與球拍碰撞
function isHit(paddle, ball) {
  return (
    ball.position.x > paddle - PADDLE_WIDTH / 2 &&
    ball.position.x < paddle + PADDLE_WIDTH / 2 &&
    ball.position.y > stage.height - PADDLE_HEIGHT - BALL_RADIUS / 2
  );
}

// 磚與磚塊碰撞
function isCollision(brick, ball) {
  return (
    ball.position.x + ball.direction.x > brick.x - brick.width / 2 &&
    ball.position.x + ball.direction.x < brick.x + brick.width / 2 &&
    ball.position.y + ball.direction.y > brick.y - brick.height / 2 &&
    ball.position.y + ball.direction.y < brick.y + brick.height / 2
  );
}

// 磚塊
function createBricks() {
  let width =
    (stage.width - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) / BRICK_COLUMNS;
  let bricks = [];

  for (let i = 0; i < BRICK_ROWS; i++) {
    for (let j = 0; j < BRICK_COLUMNS; j++) {
      bricks.push({
        x: j * (width + BRICK_GAP) + width / 2 + BRICK_GAP,
        y: i * (BRICK_HEIGHT + BRICK_GAP) + BRICK_HEIGHT / 2 + BRICK_GAP + 20,
        width: width,
        height: BRICK_HEIGHT,
      });
    }
  }

  return bricks;
}

const initState = () => ({
  ball: {
    position: {
      x: stage.width / 2,
      y: stage.height / 2,
    },
    direction: {
      x: 2,
      y: 2,
    },
  },
  bricks: createBricks(),
  score: 0,
});

const BALL_SPEED = 60;

// 狀態
const createState$ = (ticker$, paddle$) =>
  ticker$.pipe(
    rxjs.operators.withLatestFrom(paddle$),
    rxjs.operators.scan(({ ball, bricks, score }, [ticker, paddle]) => {
      let remainingBricks = [];
      const collisions = {
        paddle: false,
        floor: false,
        wall: false,
        ceiling: false,
        brick: false,
      };

      ball.position.x =
        ball.position.x + ball.direction.x * ticker.deltaTime * BALL_SPEED;
      ball.position.y =
        ball.position.y + ball.direction.y * ticker.deltaTime * BALL_SPEED;

      bricks.forEach((brick) => {
        if (!isCollision(brick, ball)) {
          remainingBricks.push(brick);
        } else {
          collisions.brick = true;
          score = score + 10;
        }
      });

      collisions.paddle = isHit(paddle, ball);

      if (
        ball.position.x < BALL_RADIUS ||
        ball.position.x > stage.width - BALL_RADIUS
      ) {
        ball.direction.x = -ball.direction.x;
        collisions.wall = true;
      }

      collisions.ceiling = ball.position.y < BALL_RADIUS;

      if (collisions.brick || collisions.paddle || collisions.ceiling) {
        ball.direction.y = -ball.direction.y;
      }

      return {
        ball: ball,
        bricks: remainingBricks,
        collisions: collisions,
        score: score,
      };
    }, initState())
  );

// 更新畫面
function updateView([ticker, paddle, state]) {
  context.clearRect(0, 0, stage.width, stage.height);

  drawPaddle(paddle);
  drawBall(state.ball);
  drawBricks(state.bricks);
  drawScore(state.score);

  if (state.ball.position.y > stage.height - BALL_RADIUS) {
    drawGameOver("GAME OVER");
    restart.error("game over");
  }

  if (state.bricks.length === 0) {
    drawGameOver("Congradulations!");
    restart.error("cong");
  }
}

let restart;

const game$ = new rxjs.Observable((observer) => {
  drawIntro();

  restart = new rxjs.Subject();

  const paddle$ = createPaddle$(ticker$);
  const state$ = createState$(ticker$, paddle$);

  ticker$
    .pipe(
      rxjs.operators.withLatestFrom(paddle$, state$),
      rxjs.operators.merge(restart)
    )
    .subscribe(observer);
});

game$
  .pipe(
    rxjs.operators.retryWhen((err$) => {
      return err$.pipe(rxjs.operators.delay(1000));
    })
  )
  .subscribe(updateView);
