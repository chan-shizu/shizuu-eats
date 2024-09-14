"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
// // catch 404 and forward to error handler
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   next(createHttpError(404));
// });
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// JSONオブジェクトの受信設定
app.use(express_1.default.json());
// 配列側のオブジェクトの受信設定
app.use(express_1.default.urlencoded({ extended: true }));
// ルーティング
app.use('/', index_1.default);
app.use('/users', users_1.default);
// 3000ポートで受信
const port = process.env.PORT || 3000;
// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);
