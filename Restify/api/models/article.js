const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ArticleSchema = new mongoose.Schema (
	{
		visible: Boolean,
		title: {
			type: String,
			require: true,
			trim: true
		},
		text: String
	},
	{
		minimize: true,
		strict: true
	}
);

ArticleSchema.plugin(timestamps);
ArticleSchema.plugin(mongooseStringQuery);

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article; 