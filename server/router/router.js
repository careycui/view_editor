const Router = require('koa-router');
const Page = require('./../apis/pageRelated.js');
const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.body = 'Hello Koa';
});

router.get('/pro/index/:type', Page.proIndex);

router.get('/topic/index/:type', Page.topicIndex);

router.post('/pro/save', Page.savePro);

router.post('/topic/save', Page.saveTopic);

router.post('/pro/update', Page.updatePro);

router.post('/topic/update', Page.updateTopic);

router.post('/pro/savepage', Page.savePagePro);

router.post('/topic/savepage', Page.savePageTopic);

router.get('/pro/getPage/:id', Page.getProPage);

router.get('/topic/getPage/:id', Page.getTopicPage);

module.exports = router;