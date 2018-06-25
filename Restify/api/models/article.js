const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const ARTICLES_NUMBER_MAX = 10;

const ArticleSchema = new mongoose.Schema (
	{
		visible: Boolean,
		status: {
			type: String,
			required: true,
			enum: ['starting','working','finished'],
			default: 'starting'
		},
		title: {
			type: String,
			required: true,
			trim: true,
			default: 'No title'
		},
		text: String
	},
	{
		minimize: true,
		strict: true
	}
);

// For adding the two field with the updateAt and createAt
ArticleSchema.plugin(timestamps);
// For parsing the query with the good type
ArticleSchema.plugin(mongooseStringQuery);


// Post hook of validation for checking the title
// If the article have my name, we throw an error
ArticleSchema.post('validate', function(doc, next) {
	// If the title contains my name
	if(this.title.includes('latsuj')) {		
		return next(new Error("The title cannot contains my pseudo."));
	} else {
		return next();
	}
});


// Pre hook of save
ArticleSchema.pre('save', function(next) {
	// Get the number of articles
	// The queries use the model and not the schema
	Article.count({},function(e,count) {
		// If there are more than ARTICLES_NUMBER_MAX articles
		if(count>ARTICLES_NUMBER_MAX) {
			// Remove all the object inside the collection
			Article.collection.drop();
		}
	});
	return next();
});

// Put that thing at the end for dodging the problem when the hook pre/post are not fired
const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article; 