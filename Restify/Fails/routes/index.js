'use strict'

module.exports = function(server) {
    
	const City = require('../models/city')
	
    server.get({path: '/hello/:name', name: 'GetFoo'}, function respond(req, res, next) {
    		console.log(db);
    	  res.send(200, {
    	    hello: req.params.name
    	  });
    	  return next();
    });
}