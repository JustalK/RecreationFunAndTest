/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Article = require('../models/article');

module.exports = function(server) {

	// 
	server.post('/articles', (req, res, next) => {
		res.contentType = 'json';
		
		// If the request is not using the good hearder
		if (!req.is('application/json')) {
			res.status(501);
			res.send({errors: "Expected application json"});
			return next();
		}

		/**
		if(!req.body) {
			res.status(502);
			res.send({errors: "There is no data send"});
			return next();
		}
		**/
		let data = req.body;

		let article = new Article(data);
		console.log(article);
		article.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}

			res.send(201);
			next();
		});
	});
};  