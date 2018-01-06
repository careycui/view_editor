const timestamp = require('time-stamp');
const ProPage = require('./../models/proPage');
const TopicPage = require('./../models/topicPage');

module.exports.getProPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await ProPage.findById(id);
	ctx.body = JSON.stringify(page);
}
module.exports.getTopicPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await TopicPage.findById(id);
	ctx.body = JSON.stringify(page);
}
module.exports.proIndex = async (ctx, next) => {
	let type = ctx.accepts('json');
	let platform = ctx.params.type;
	platform = (platform==='PC'?0:1);
	let pages = await ProPage.findAll({
			include:[{
				model: ProPage,
				as: 'otherPlatform'
			}],
			where: {
				platform_type: platform,
				trash: {
					$ne: 1
				}
			},
			order: [['create_time', 'DESC']]
		});
	ctx.body = JSON.stringify(pages);
}
module.exports.topicIndex = async (ctx, next) => {
	let type = ctx.accepts('json');
	let platform = ctx.params.type;
	platform = (platform==='PC'?0:1);
	let pages = await TopicPage.findAll({
			include:[{
				model: TopicPage,
				as: 'otherPlatform'
			}],
			where: {
				platform_type: platform,
				trash: {
					$ne: 1
				}
			},
			order: [['create_time', 'DESC']]
		});
	ctx.body = JSON.stringify(pages);
}
module.exports.savePro = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await ProPage.create(data);
	ctx.body = JSON.stringify(result);
}
module.exports.saveTopic = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await TopicPage.create(data);
	ctx.body = JSON.stringify(result);
}
module.exports.updatePro = async (ctx, next) => {
	let data = ctx.request.body;
	data.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['title','img_cover','desc','update_time']});
	ctx.body = JSON.stringify(result);
}
module.exports.updateTopic = async (ctx, next) => {
	let data = ctx.request.body;
	data.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['title','img_cover','desc','update_time']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePageTopic = async (ctx, next) => {
	let data = ctx.request.body;
	data.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['html_data','page_data','css','update_time']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePagePro = async (ctx, next) => {
	let data = ctx.request.body;
	data.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['html_data','page_data','css','update_time']});
	ctx.body = JSON.stringify(result);
}
module.exports.copyProPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await ProPage.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);
	delete page.id;
	delete page.create_time;
	page.title = page.title + '_副本';
	let result = await ProPage.create(page);
	ctx.body = JSON.stringify(result);
}
module.exports.copyTopicPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await TopicPage.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);
	delete page.id;
	delete page.create_time;
	page.title = page.title + '_副本';
	let result = await TopicPage.create(page);
	ctx.body = JSON.stringify(result);
}
module.exports.deleteProPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await ProPage.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);

	page.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	page.trash = 1;
	let result = await ProPage.update(page,{ where : { id: { $eq : id } }}, {fields:['update_time', 'trash']});
	ctx.body = JSON.stringify(result);
}
module.exports.deleteTopicPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await TopicPage.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);

	page.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	page.trash = 1;
	let result = await TopicPage.update(page,{ where : { id: { $eq : id } }}, {fields:['update_time', 'trash']});
	ctx.body = JSON.stringify(result);
}
module.exports.proAppendFolder = async (ctx, next) => {
	let transIds = ctx.request.body;
	let result = await ProPage.update(transIds,{ where : { id: { $eq : transIds.page_id } }}, {fields:['folder_id']});
	ctx.body = JSON.stringify(result);
}
module.exports.topicAppendFolder = async (ctx, next) => {
	let transIds = ctx.request.body;
	let result = await TopicPage.update(transIds,{ where : { id: { $eq : transIds.page_id } }}, {fields:['folder_id']});
	ctx.body = JSON.stringify(result);
}