module.exports = function(db) {
	
	// Create a validator for the collection with a schema
	// Be creful, this line work only at the creation of the collection, if it already exist, we should use collMod
	db.createCollection('user');
	
	// For changing the schema of an existing collection
	db.command( { collMod: "user",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["name"],
				properties: {
					name: {
						bsonType: "string",
						description: "Must be a string and is required"
					}
				}
			}
		}
	})
	
	return db.collection("user");
}