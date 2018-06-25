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

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment; 

