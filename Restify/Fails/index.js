'use strict'

/**
 * Module Dependencies
 */
const config  = require('./config'),
      restify = require('restify'),
      mongodb = require('mongodb').MongoClient

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    dtrace: true
})

/**
 * Bundled Plugins (http://restify.com/#bundled-plugins)
 */
server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())

server.use(function slowHandler(req, res, next) {
  setTimeout(function() {
    return next();
  }, 250);
});


/**
 * Lift Server, Connect to DB & Require Route File
 */
server.listen(config.port, () => {
	console.log(`Server is listening on port ${config.port}`);
	require('./routes')(server);
});

// When the server close, I remove everything from the database
/**
server.close( () => {
	console.log("Start the close function");
	mongodb.connect(config.db.uri, (err, client) => {
		if (err) {
            console.log('An error occurred while attempting to connect to MongoDB', err)
            process.exit(1)
		}
		db = client.db(config.db.name);
		
		//db.dropDatabase();
		/**
		db.listCollections().toArray(function(err, collections){
		    console.log(collections);
		});
		**/
		
		/**
		db.command({ listCollections: 1, authorizedCollections: true, nameOnly: true }).then((listCollections) => {
			listCollections.cursor.firstBatch.for
			console.log();
		})
		
	});
});
**/

