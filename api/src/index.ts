import express from "express";
import indexRouter from "./routes/index";
import userRouter from "./routes/users";
import shizuyaPositionRouter from "./routes/shizuya-positions";
import orderRouter from "./routes/orders";
var cors = require("cors");

const app = express();

import type { Request, Response, NextFunction } from "express";
import type { HttpError } from "http-errors";
import createHttpError from "http-errors";

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");

  res.setHeader("Access-Control-Allow-Origin", "*");
});

// JSONオブジェクトの受信設定
app.use(express.json());
// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));
// CORS
app.use(cors());

// ルーティング
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/shizuya-positions", shizuyaPositionRouter);
app.use("/orders", orderRouter);

// 3000ポートで受信
const port = process.env.PORT || 3000;

// APIサーバ起動
app.listen(port);
console.log("Express WebApi listening on port " + port);
