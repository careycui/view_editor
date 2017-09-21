const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./router/router');
const kb = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');

const APP = new Koa();


APP.use(logger());
APP.use(cors());
APP.use(kb({
	onerror: (err, ctx) => {
		ctx.throw('Error parsing the body information', 422);
	}
}));
APP.use(json());

APP.use(router.routes());
APP.use(router.allowedMethods());

APP.on('error', (err, ctx) => {
	console.log('server error : ', err);
});

APP.listen(3030, () => {
	console.log('Server start add 3030........');
});

module.exports = APP;