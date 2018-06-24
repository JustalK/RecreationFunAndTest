/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');

// Create the server throught the restify API
const server = restify.createServer({
	name: config.name
});

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
	mongoose.Promise = global.Promise;

	// For building the connection with differents properties
	// It's a good pratice to keep the connection alive only for few milliseconds
	mongoose.connect(config.db.uri, { 
		useMongoClient: true,
		autoIndex: true,
		reconnectTries: 10,
		reconnectInterval: 500,
		keepAlive: 1000 });
	
	// With .connection, we can access the default connection
	const db = mongoose.connection;

	// Catch the errors during the connection
	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
	    require('./routes')(server);
	    console.log(`Server is listening on port ${config.port}`);
	});
});