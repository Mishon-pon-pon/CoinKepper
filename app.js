const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

require('./handlers/01_errorHandler').init(app);
require('./handlers/02_templates').init(app);
require('./handlers/03_static').init(app);
require('./handlers/04_bodyparser').init(app);

router.get('/login', require('./routers/login').get);
router.get('/registration', require('./routers/registration').get);

app.use(router.routes());

module.exports = app;