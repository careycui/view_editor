const Router = require('koa-router');
const Page = require('./../apis/pageRelated.js');
const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.body = 'Hello Koa';
});

router.get('/pro/index/:type', Page.proindex);

router.get('/topic/index/:type', Page.topicindex);

router.post('/pro/save', Page.savepro);

router.post('/topic/save', Page.savetopic);

router.post('/pro/update', Page.updatepro);

router.post('/topic/update', Page.updatetopic);

module.exports = router;