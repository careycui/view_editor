const ProPage = require('./../models/proPage');
const TopicPage = require('./../models/topicPage');

module.exports.index = async (ctx, next) => {
	let type = ctx.accepts('json');
	let pages = await ProPage.findAll();

	ctx.body = JSON.stringify(pages);
}