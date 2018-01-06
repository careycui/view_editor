const seq = require('./../db/db');
const Sequelize = require('sequelize');

const FoldersPage = seq.define('folders_page', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	folders_id: {
		type: Sequelize.STRING,
	},
	page_id: {
		type: Sequelize.STRING,
	}
},{
	freezeTableName: true,
	timestamps: false
});

module.exports = FoldersPage;