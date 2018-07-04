const mongodb = require('mongodb');
const config  = require('./config');

// establish connection to mongodb atlas
async function connection() {
	return new Promise((resolve,reject) => {
			mongodb.connect(config.db.uri,  { useNewUrlParser: true }, (err, client) => {
				if (err) {
					console.log('An error occurred while attempting to connect to MongoDB', err)
					process.exit(1)
				}
				
				resolve(client)
			})
		})
	}
})

module.exports = await connection();