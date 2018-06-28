module.exports = function(db) {
	
	// Create a validator for the collection with a schema
	// Be creful, this line work only at the creation of the collection, if it already exist, we should use collMod
	db.createCollection('article');
	
	// For changing the schema of an existing collection
	db.command( { collMod: "article",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["title"],
				properties: {
					title: {
						bsonType: "string",
						description: "Must be a string and is required"
					},
					writer: {
						bsonType: "object"
					}
				}
			}
		}
	})
	
	return db.collection("article");
}