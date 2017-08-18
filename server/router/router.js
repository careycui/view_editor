const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.body = 'Hello Koa';
});

module.exports = router