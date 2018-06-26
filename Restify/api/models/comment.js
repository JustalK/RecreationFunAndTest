const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
	{
		author: {
			type: String,
			require: true,
			default: 'Unknown'
		},
		text: {
			type: String,
			validate: /\S+/
		},
		article: {
			type: Schema.Types.ObjectId,
			ref: 'Article'
		}
	}
);

commentSchema.plugin(timestamps);
commentSchema.plugin(mongooseStringQuery);

// Comments static methods for find every comment with population with article
commentSchema.statics.findAllWithPopulate = function(cb) {
	return this.find({}, cb).populate('article');
}

commentSchema.statics.findAllWithPopulateOnlyTitle = function(cb) {
	return this.find({}, cb).populate('article', 'title');
}



const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment; 

