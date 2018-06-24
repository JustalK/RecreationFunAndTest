const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ArticleSchema = new mongoose.Schema (
	{
		visible: Boolean,
		title: {
			type: String,
			required: true,
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

//Post hook for save
ArticleSchema.pre('save', function(next) {
	// If the title contains my name
	if(this.title.includes('latsuj')) {		
		return next(new Error("The title cannot contains my pseudo."));
	} else {
		return next();
	}
});


const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article; 