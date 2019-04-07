const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

require('./handlers/01_errorHandler').init(app);
require('./handlers/02_templates').init(app);
require('./handlers/03_static').init(app);
require('./handlers/04_bodyparser').init(app);
require('./handlers/08_session').init(app);
require('./handlers/06_log').init(app);
require('./handlers/07_passport').init(app);

// registration and login
router.get('/registration', require('./routers/RegAndLog/registration').get);
router.post('/registration', require('./routers/RegAndLog/registration').post);
router.get('/confirmemail/:id', require('./routers/RegAndLog/confirmEmail').get);
router.get('/', require('./routers/RegAndLog/frontPage').get);
router.post('/', require('./routers/RegAndLog/login').post);

// categories
router.post('/category/new', require('./routers/Categories/new').post);

app.use(router.routes());

module.exports = app;