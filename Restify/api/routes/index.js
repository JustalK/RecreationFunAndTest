/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Article = require('../models/article');
const Comment = require('../models/comment');

const sendStatus = (res,status) => res.status(status)
const sendErrors = (res,err) => res.send({errors: err});
const sendContentType = (res,type) => res.contentType = type;
const emptyReq = (req) => Object.keys(req.body).length === 0;
const reqIsType = (req, type) => req.is(type);
const sendMsg = (req,res,status,err,type) => {
	sendContentType(res,type);
	sendStatus(res,status);
	sendErrors(res,err);
}

module.exports = function(server) {

	// POST Method for the articles
	server.post('/articles', (req, res, next) => {
		
		// If the request is not using the good hearder
		// See the request api of restify : http://restify.com/docs/request-api/
		if (!reqIsType(req,'application/json')) {
			sendMsg(req,res,404, "Expected application json","application/json");
			return next();
		}
		
		let data = req.body;
		let article = new Article(data);
		
		article.save(function(err) {
			if (err) {
				return next(new errors.InternalError(err.message));
				next();
			}

			res.send(201);
			next();
		});
	});
	
	// POST Method for the comments
	server.post('/comments/:article', (req, res, next) => {
		
		if (!reqIsType(req,'application/json')) {
			sendMsg(req,res,404, "Expected application json","application/json");
			return next();
		}
		
		let data = req.body;
		let comment = new Comment(data);
		let article = req.params.article;
		
		// Look in the collection if one article correspond
		Article.findOne({'title': article}, function(err,a) {

			// If the article does not exist, we create it
			if(a==null) {
				// we create a default item
				var articleDefault = new Article({
					visible: true,
					title: article
				});
				// And we save it
				articleDefault.save(function(err,as) {
					comment.article = as._id;
					comment.save(function(err) {
						//Things to do
					});
				});
			}
		});
		
		res.send(201);
		next();
	});
};  