const seq = require('./../db/db');
const Sequelize = require('sequelize');
const ProPage = require('./proPage');
const TopicPage = require('./topicPage');

const PageConcat = seq.define('page_concat', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
	},
	page_id: Sequelize.STRING,
	concat_id: Sequelize.STRING
});
