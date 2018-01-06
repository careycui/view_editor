const Router = require('koa-router');
const Page = require('./../apis/pageRelated.js');
const Folder = require('./../apis/foldersRelated.js');
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

router.get('/pro/copy/:id', Page.copyProPage);

router.get('/topic/copy:id', Page.copyTopicPage);

router.get('/pro/delete/:id', Page.deleteProPage);

router.get('/topic/delete:id', Page.deleteTopicPage);

router.post('/pro/appendto/folder', Page.proAppendFolder);

router.post('/topic/appendto/folder', Page.topicAppendFolder);

router.get('/folder/get/:type', Folder.getFolderByType);

router.post('/folder/create', Folder.createFolder);

router.post('/folder/update', Folder.updateFolder);

router.post('/folder/delete', Folder.updateFolder);

module.exports = router;