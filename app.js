const Koa = require('koa');
const config = require('./config');

const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const staticFiles = require('koa-static')

const app = new Koa();

app.use(staticFiles(__dirname + '/'));

app.use(logger());

app.use(cors());

// mongoose.connect(config.db, { 
//   auth: { "authSource": "cms" },
//   user: config.db_user,
//   pass: config.db_pwd,
//   poolSize: 10,
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
//   }, err => {
//   if (err) {
//     console.error('数据库连接失败 :-( ', err);
//   } else {
//     console.log('数据库连接成功 \(^o^)！');
//   }
// });

app.use(bodyParser());

// ice转发
const forwarded_router = require('./routes/api/forwarded_router');
// 模版
const template_router = require('./routes/api/template_router');
// 一块学院
const onek_college_router = require('./routes/api/onek_college');

const onek_router = require('./routes/api/onek');

app.use(forwarded_router.routes()).use(forwarded_router.allowedMethods());

app.use(template_router.routes()).use(template_router.allowedMethods());

app.use(onek_college_router.routes()).use(onek_college_router.allowedMethods());

app.use(onek_router.routes()).use(onek_router.allowedMethods());

app.listen(config.port);