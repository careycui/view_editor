const ProPage = require('./../models/proPage');
const TopicPage = require('./../models/topicPage');

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
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fieds:['title','img_cover','desc']});
	ctx.body = JSON.stringify(result);
}
module.exports.updateTopic = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fieds:['title','img_cover','desc']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePageTopic = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fieds:['html_data','page_data','form_data']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePagePro = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fieds:['html_data','page_data','form_data']});
	ctx.body = JSON.stringify(result);
}