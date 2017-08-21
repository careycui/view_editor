const seq = require('./../db/db');
const Sequelize = require('sequelize');

const ProPage = seq.define('pro_page', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	title : Sequelize.STRING,
	desc: Sequelize.STRING,
	platform_type: {
		type: Sequelize.ENUM,
		values: [0,1], //0 pc ; 1 mobile
		defaultValue: 0
	},
	page_type: {
		type: Sequelize.ENUM,
		values: [0,1], //0 普通 ; 1 海报
		defaultValue: 0
	},
	create_time:{
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	update_time: Sequelize.DATE,
	form_data: Sequelize.TEXT,
	page_data: Sequelize.TEXT,
	html_data: Sequelize.TEXT,
	concat_id: Sequelize.STRING
},{
	freezeTableName: true,
	timestamps: false
});

module.exports = ProPage;