const Koa = require('koa');
const Router = require('koa-router');
const passport = require('koa-passport');

const app = new Koa();
const router = new Router();

require('./handlers/01_errorHandler').init(app);
// require('./handlers/09_sslify').init(app);
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
router.post('/auth/local', require('./routers/RegAndLog/login').post);
router.get('/auth/facebook', require('./routers/RegAndLog/loginFacebook').post);
router.get('/auth/vkontakte', require('./routers/RegAndLog/vk').post);
router.get('/auth/vkontakte/callback', require('./routers/RegAndLog/vk').post);
router.post('/logout', require('./routers/RegAndLog/logout').post);


// categories
router.post('/category/new', require('./routers/cat').post);
router.get('/category/exist', require('./routers/cat').get);
router.delete('/category/delete/:id', require('./routers/cat').delete);

// sum
router.post('/sum/new', require('./routers/sum').post);
router.get('/sum/category/:id', require('./routers/sum').get);
router.delete('/sum/delete/:id', require('./routers/sum').delete);

app.use(router.routes());

module.exports = app;