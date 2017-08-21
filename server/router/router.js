const Router = require('koa-router');
const Page = require('./../apis/pageRelated.js');
const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.body = 'Hello Koa';
});

router.get('/pro/index', Page.index);

module.exports = router;