const Folders = require('./../models/folders');
const FoldersPage = require('./../models/foldersPage');

module.exports.getFolderByType = async (ctx, next) => {
	let type = ctx.params.type;
	let folders = await Folders.findAll({
			where: {
				type: type,
				trash: {
					$ne: 0
				}
			}
		});
	ctx.body = JSON.stringify(folders);
}
module.exports.getFolderById = async (ctx, next) => {
	let id = ctx.params.id;
	let folder = await Folders.findById(id);
	ctx.body = JSON.stringify(folder);
}
module.exports.createFolder = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await Folders.create(data);
	ctx.body = JSON.stringify(result);
}

module.exports.updateFolder = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await Folders.update(data,{ where : { id: { $eq : data.id } }}, {fields:['name']});
	ctx.body = JSON.stringify(result);
}
module.exports.deleteFolder = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await Folders.update(data, { where : { id: { $eq : data.id } }}, {fields:['trash']});
	ctx.body = JSON.stringify(result);
}