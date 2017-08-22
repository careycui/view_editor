const ProPage = require('./../models/proPage');
const TopicPage = require('./../models/topicPage');

module.exports.index = async (ctx, next) => {
	let type = ctx.accepts('json');
	let pages = await ProPage.findAll({
			include:[{
				model: ProPage,
				as: 'otherPlatform'
			}]
		});
	ctx.body = JSON.stringify(pages);
}