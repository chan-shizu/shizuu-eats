import express from 'express';
import indexRouter from './routes/index';
import userRouter from './routes/users'

const app = express();

import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from 'http-errors';
import createHttpError from 'http-errors';

// // catch 404 and forward to error handler
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   next(createHttpError(404));
// });

// error handler
app.use(function(err: HttpError ,req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// JSONオブジェクトの受信設定
app.use(express.json())
// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/', indexRouter);
app.use('/users', userRouter);

// 3000ポートで受信
const port = process.env.PORT || 3000;

// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);