const seq = require('./../db/db');
const Sequelize = require('sequelize');
const ProPage = require('./proPage');
const TopicPage = require('./TopicPage');

const Folders = seq.define('folders', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	name : Sequelize.STRING,
	type: {
		type: Sequelize.ENUM,
		values: ['pro','topic'], 
		defaultValue: 'pro'
	},
	trash: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
},{
	freezeTableName: true,
	timestamps: false
});
Folders.hasMany(ProPage, { foreignKey: 'folder_id', as: 'ProPage'});
Folders.hasMany(TopicPage, { foreignKey: 'folder_id',  as: 'TopicPage'});
module.exports = Folders;