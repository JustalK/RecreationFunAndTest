/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Article = require('../models/article');

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

	server.post('/articles', (req, res, next) => {
		
		// If the request is not using the good hearder
		if (!reqIsType(req,'application/json')) {
			sendMsg(req,res,501, "Expected application json","application/json");
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
};  