const ProPage = require('./../models/proPage');
const TopicPage = require('./../models/topicPage');

module.exports.proindex = async (ctx, next) => {
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
module.exports.topicindex = async (ctx, next) => {
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
module.exports.savepro = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await ProPage.create(data);
	ctx.body = JSON.stringify(result);
}
module.exports.savetopic = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await TopicPage.create(data);
	ctx.body = JSON.stringify(result);
}
module.exports.updatepro = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fieds:['title','img_cover','desc']});
	ctx.body = JSON.stringify(result);
}
module.exports.updatetopic = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fieds:['title','img_cover','desc']});
	ctx.body = JSON.stringify(result);
}