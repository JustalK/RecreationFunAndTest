'use strict'

module.exports = function(ctx) {

    // extract context from passed in object
    const db     = ctx.db, server = ctx.server

    // assign collection to variable for further use
    const collection = db.collection('todos');
    const article = require('../models/article')(db);
    const user = require('../models/user')(db);
    
    server.post('/article/:title', (req, res, next) => {
    	if(!req.is('application/json')) {
    		res.send(404,"Error not application/json");
    		next();
    	}
    	
    	let data = {
    			title: req.params.title,
                created: new Date(),
                updated: new Date()
    	}
    	
    	article.insertOne(data).then(doc => { 
    		res.send(200, doc.ops[0]);
    	}).catch(err => {
    		res.send(500, err);
    	})
    	
    	next();
    });
    
    server.post('/user/:name', (req, res, next) => {
    	if(!req.is('application/json')) {
    		res.send(404,"Error not application/json");
    		next();
    	}
    	
    	let data = {
    		name: req.params.name,
    		notes: req.params.notes,
    	}
    	console.log(data);
    	user.insertOne(data).then(doc => {
    		res.send(200, doc.ops[0]);
    	}).catch(err => {
    		res.send(500, err);
    	});
    	
    	next();
    });
    
    server.post('/article/:title/:name', (req, res, next) => {
    	if(!req.is('application/json')) {
    		res.send(404,"Error not application/json");
    		next();
    	}
    	
    	user.findOne({name: req.params.name}, (err, rsl) => {
    		
    		let data = {
        			title: req.params.title,
        			writer: rsl._id,
        			created: new Date(),
        			updated: new Date()
        	}
    		
    		article.insertOne(data).then(doc => { 
    			res.send(200, doc.ops[0]);
    		}).catch(err => {
    			res.send(500, err);
    		})
    		
    		next();
    	})
    });
    
    // Getting all the articles throught the article query find
    // But if you look closely, you dont have the informations of the writer
    server.get('/articles', (req, res, next) => {
    	// there is a toArray for finding everything
    	article.find({}).toArray( (err, docs) => {
    		if(err) res.send(500, "Error on articles");
    		res.send(200, docs);
    	});
    });
    
    // Getting all the articles with the informations of the writer
    // I'm doing this by using an aggregate
    server.get('/articles2', (req, res, next) => {
    	article.aggregate([
    		{
    			$lookup:
    				{
    					from: 'user',
    					localField: 'writer',
    					foreignField: '_id',
    					as: 'writer'
    				}
    		}
    	]).toArray((err,docs) => {
    		if(err) res.send(500, "Error on articles");
    		res.send(200, docs);
    	})
    	
    	next();
    });
    
    server.get('/article3', (req, res, next) => {
    	// For letting the user use some custom query 
    	let limit = parseInt(req.query.limit, 10) || 5,
    		skip = parseInt(req.query.skip, 10) || 0,
    		query = req.query || {};
    		
    	article.find({}).limit(limit).skip(skip).toArray( (err, docs) => {
    		if(err) res.send(500, "Error on articles");
    		res.send(200, docs);
    	});	
    	next();
    });

    /**
    server.get('/article4', (req, res, next) => {
    	article.mapReduce( function() {
    		emit(this.title)
    	},
    	function(key, value) {
    		return value;
    	},
    	{
    		out: 'order_totals'
    	}).then((docs) => {
    		console.log(docs);
    	})
    	next();
    });
    **/
    
    // Using an aggregate for adding a new virtual properties to the result
    server.get('/users', (req, res, next) => {
    	user.aggregate( [
        {
        	$addFields: {
        		totalNote: { $sum: "$notes" },
        		totalNoteSecond: { $reduce: {
        				input: "$notes",
        				initialValue: { m: 1, s:0 },
        				in: { 
        					m: { $multiply: ["$$value.m", "$$this"] },
        					s: { $sum: ["$$value.s", "$$this"] }
        				}
        			} 
        		},
        		positif: { $lt: ["$notes",0] }
        	}
        },
        {
        	$addFields: {
        		total: {
        			$sum: ["totalNoteSecond.m","totalNoteSecond.s"]
        		}
        	}
        }
    	] ).toArray((err,docs) => {
    		if(err) {
    			res.send(500, err);
    		} else {    			
    			res.send(200, docs);
    		}
    	})
    	
    	next();
    });
    
    
    /**
     * Update
     */
    server.put('/todos/:id', (req, res, next) => {

        // extract data from body and add timestamps
        const data = Object.assign({}, req.body, {
            updated: new Date()
        })

        // build out findOneAndUpdate variables to keep things organized
        let query = { _id: req.params.id },
            body  = { $set: data },
            opts  = {
                returnOriginal: false,
                upsert: true
            }

        // find and update document based on passed in id (via route)
        collection.findOneAndUpdate(query, body, opts)
            .then(doc => res.send(204))
            .catch(err => res.send(500, err))

        next()

    })

    /**
     * Delete
     */
    server.del('/todos/:id', (req, res, next) => {

        // remove one document based on passed in id (via route)
        collection.findOneAndDelete({ _id: req.params.id })
            .then(doc => res.send(204))
            .catch(err => res.send(500, err))

        next()

    })

}