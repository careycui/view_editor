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
				platform_type: platform
			}
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
				platform_type: platform
			}
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
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['html_data','page_data','form_data','css','update_time']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePagePro = async (ctx, next) => {
	let data = ctx.request.body;
	data.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['html_data','page_data','form_data','css','update_time']});
	ctx.body = JSON.stringify(result);
}