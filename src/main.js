import './style.css';

import {
  animationFrameScheduler,
  BehaviorSubject,
  distinctUntilChanged,
  EMPTY,
  filter,
  first,
  fromEvent,
  interval,
  map,
  mapTo,
  merge,
  mergeWith,
  of,
  scan,
  share,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeWhile,
  timeInterval,
  withLatestFrom,
} from 'rxjs';

import {
  createCanvasEl,
  renderBackground,
  renderBall,
  renderBricks,
  renderGameOver,
  renderIntro,
  renderPaddle,
  renderScore,
} from './canvas.js';
import {
  BALL_INIT,
  BALL_SPEED_X,
  BALL_SPEED_Y,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FPS,
  PADDLE_INIT,
  PADDLE_INIT_POSTION,
  PADDLE_SPEED,
  PADDLE_STEP_MAP,
  PADDLE_WIDTH,
  PRE_HIT_SCORE,
} from './constants';
import {
  createInitBricks,
  isHitBottomBoundary,
  isHitBrick,
  isHitLeftBoundary,
  isHitPaddle,
  isHitRightBoundary,
  isHitTopBoundary,
  isPaddleHitBoundary,
} from './utils';

// 建立畫布
let canvas = createCanvasEl();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// 按鈕事件

const keydown$ = fromEvent(document, 'keydown');
const keyup$ = fromEvent(document, 'keyup');

const reset$ = keydown$.pipe(
  filter((e) => e.key === 'r'),
  mapTo('RESET')
);
const start$ = keydown$.pipe(
  filter((e) => e.key === 'Enter'),
  mapTo('START')
);
const pause$ = keydown$.pipe(
  filter((e) => e.key === ' '),
  mapTo('PAUSE')
);
const paddleStep$ = merge(keydown$, keyup$).pipe(
  map((e) => {
    if (e.type === 'keyup' && PADDLE_STEP_MAP.has(e.key)) {
      return 0;
    }
    return PADDLE_STEP_MAP.get(e.key);
  }),
  filter((step) => step !== null && step !== undefined),
  startWith(0),
  share()
);

// timer
const ticker$ = start$.pipe(
  mergeWith(pause$, reset$),
  switchMap((action) => {
    switch (action) {
      case 'START':
        return interval(FPS, animationFrameScheduler).pipe(
          timeInterval(),
          map((value) => value.interval / 1000)
        );
      case 'PAUSE':
        return EMPTY;
      case 'RESET':
        return of(0);
    }
  }),
  share()
);

// game
function createGame(ticker$) {
  const paddle$ = ticker$.pipe(
    withLatestFrom(paddleStep$),
    scan((paddle, [interval, step]) => {
      let updatedX = paddle.x + +step * PADDLE_SPEED * +interval;
      updatedX = isPaddleHitBoundary(updatedX, paddle) ? paddle.x : updatedX;

      return { ...paddle, x: updatedX };
    }, PADDLE_INIT),
    startWith(PADDLE_INIT),
    shareReplay(1)
  );

  // ball

  const ballSpeedX$ = new BehaviorSubject(BALL_SPEED_X);
  const ballSpeedY$ = new BehaviorSubject(BALL_SPEED_Y);

  const ball$ = ticker$.pipe(
    withLatestFrom(paddle$, ballSpeedX$, ballSpeedY$),
    scan(
      ([ball, previousPaddle], [interval, paddle, speedX, speedY]) => {
        let updatedX = ball.x + speedX * interval;
        let updatedY = ball.y + speedY * interval;

        if (isHitRightBoundary(ball)) {
          updatedX = CANVAS_WIDTH - ball.radius;
          ballSpeedX$.next(-speedX);
        }

        if (isHitLeftBoundary(ball)) {
          updatedX = ball.radius;
          ballSpeedX$.next(-speedX);
        }

        if (isHitPaddle(ball, paddle)) {
          updatedY = paddle.y - paddle.height / 2 - ball.radius;
          ballSpeedY$.next(-speedY);

          const paddleSpeed = (previousPaddle.x - paddle.x) / interval;
          ballSpeedX$.next(speedX - paddleSpeed * 0.08);
        }

        if (isHitTopBoundary(ball)) {
          updatedY = ball.radius;
          ballSpeedY$.next(-speedY);
        }

        return [{ ...ball, x: updatedX, y: updatedY }, paddle];
      },
      [BALL_INIT, PADDLE_INIT]
    ),
    startWith([BALL_INIT, PADDLE_INIT]),
    map(([ball]) => ball),
    shareReplay(1)
  );

  // bricks
  const hitBrick$ = new Subject();

  const bricks$ = ball$.pipe(
    scan((bricks, ball) => {
      let remainingBricks = [];

      bricks.forEach((brick, index) => {
        if (isHitBrick(brick, ball)) {
          hitBrick$.next();

          const ballSpeedY = ballSpeedY$.getValue();
          ballSpeedY$.next(-ballSpeedY);
        } else {
          remainingBricks.push(brick);
        }
      });

      return remainingBricks;
    }, createInitBricks()),
    startWith(createInitBricks()),
    shareReplay(1)
  );

  // score
  const score$ = hitBrick$.pipe(
    mapTo(1),
    scan((score, hit) => score + hit * PRE_HIT_SCORE, 0),
    startWith(0)
  );

  // game state
  const gameState$ = ticker$.pipe(withLatestFrom(paddle$, ball$, bricks$, score$));

  return gameState$;
}

const game$ = of('start').pipe(
  map(() => ticker$),
  switchMap(createGame),
  takeWhile(([interval, paddle, ball, bricks]) => !isHitBottomBoundary(ball) && interval !== 0 && bricks.length > 0)
);

const observer = {
  next: ([_, paddle, ball, bricks, score]) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    renderBackground(ctx);
    renderPaddle(ctx, paddle);
    renderBall(ctx, ball);
    renderBricks(ctx, bricks);
    renderScore(ctx, score);
  },
  complete: () => {
    renderGameOver(ctx);
    start$.pipe(first()).subscribe(startGame);
  },
};

function startGame() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  game$.subscribe(observer);
  renderBackground(ctx);
  renderIntro(ctx);
}

startGame();
