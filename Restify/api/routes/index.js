/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Article = require('../models/article');
const Comment = require('../models/comment');

const sendStatus = (res,status) => res.send(status);
const sendErrors = (res,err) => res.send({errors: err});
const sendContentType = (res,type) => res.contentType = type;
const emptyReq = (req) => Object.keys(req.body).length === 0;
const reqIsType = (req, type) => req.is(type);
const sendMsg = (req,res,status,err,type) => {
	sendContentType(res,type);
	sendStatus(res,status);
	sendErrors(res,err);
}

module.exports = (server) => {

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
		
		article.save((err) => {
			if (err) {
				return next(new errors.InternalError(err.message));
			}

			sendStatus(res,201);
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
		Article.findOne({'title': article}, (err,a) => {

			// If the article does not exist, we create it
			if(a==null) {
				// we create a default item
				var articleDefault = new Article({
					visible: true,
					title: article
				});
				// And we save it
				articleDefault.save((err,as) => {
					comment.article = as._id;
					comment.save();
				});
			} else {
				comment.article = a._id;
				comment.save();
			}
		});
		
		sendStatus(res,201);
		next();
	});
	
	// Getter for the articles
	server.get('/articles/all', (req, res, next) => {
		Article.find({}, (err,articles) => {
			if(err) {
				return next(new errors.InvalidContentError(err.errors.name.message));
			}
			res.send(articles);
			next();
		});
	});
	
	// Getter for the articles with the apiQuery
	server.get('/articles/all2', (req, res, next) => {
		Article.apiQuery(req.params, (err, articles) => {
			if(err) {
				return next(new errors.InvalidContentError(err.errors.name.message));
			}
			res.send(articles);
			next();
		});		
	});
	
	// Get comments and populate them for having the informations about the articles
	server.get('/comments', (req, res, next) => {
		Comment.find({}).populate('article').exec((err, comment) => {
			res.send(200,comment);
			next();
		});
	});
	
	// get all the comment and populate them with the title of the article
	server.get('/comments/title', (req, res, next) => {
		Comment.find({}).populate('article','title').exec((err, comment) => {
			res.send(200,comment);
			next();
		});
	});
		
	// Get all the comments from the parents by using the virtual populate
	server.get('/articles/:title', (req, res, next) => {
		Article.find({'title':req.params.title}).populate('comments').exec((err, article) => {
			res.send(200,article);
			next();
		});
	});
	
	
};  


















