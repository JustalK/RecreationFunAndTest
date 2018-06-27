# Restify - REST Api

A simple document for compiling all the elements that I wanna keep about Restify.

My favorite tools for building an API are
* MongoDB
* Robo 3T
* Postman

### Some starters

```
npm init
npm install restify restify-plugins mongoose mongoose-timestamp mongoose-string-query restify-errors --save
```

### Methods

Simply add a methods inside the models
```
ArticleSchema.methods.reset = function(cb) {}
```

A good thing is to create static method inside the model that use them
```
ArticleSchema.statics.findAll = function(cb) {}
```

### Virtuals

For using the virtual with toJSON or toObject, I have to set two variables
```
ArticleSchema.set('toObject', { virtuals: true });
ArticleSchema.set('toJSON', { virtuals: true });
```

For creating a virtual for populating
```
ArticleSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'article'
});
```

For creating a virtual getter
```
ArticleSchema.virtual('stitle').get(function() {
	return this.status+" - "+this.title;
});
```

> Aliases is good for saving bandwidth - reducing the name of properties

### Mongoose - Cursor

A cursor is usefull for iterate on a queries
```
var cursor = Comment.find({}).cursor();
cursor.on('data',(doc) => {});
cursor.on('close',() => {})
```

### Mongoose - Middleware

All the default hooks
```
init, validate, save, remove
```
> see <a href="http://mongoosejs.com/docs/middleware.html">Documentation on middleware</a>

For doing something before the validate or save function
```
ArticleSchema.pre('validate', function(next) {});
ArticleSchema.pre('save', function(next) {});
```
> Dont forget the return next()
> If there are subdocument, the hook are call in a V style. I mean pre('validate') of parents, then pre('validate') of children, then we go back up with pre('save') of children and finally pre('save') of parent

For doing something after
```
ArticleSchema.post('validate', function(doc,next) {});
```
> Dont forget the return next()

It's important to define my model at the end of the file, if else some middleware will not be taken. I dont know why for the moment, I still searching...

### Mongoose - restify-errorrs plugins
> <a href="https://www.npmjs.com/package/restify-errors">Documentation on errors</a>

For writting an error
```
return next(new errors.<type of the errors>("message"));
```

### Restify - Order of search

Plain route > route with arguments
```
1 : server.get('/articles/all', (req, res, next) => {});
2 : server.get('/articles/:id', (req, res, next) => {});
```
> Restify search first in the plain route , so the one without any parameters.
So if I use '/articles/all', it's always the route 1 that gonna be executed. If two routes have the same method declare, that throw an error.

The order has an importance...If in my file, the route are written in this order
```
1 : server.get('/articles/:id1', (req, res, next) => {});
2 : server.get('/articles/:id2-aze', (req, res, next) => {});
```
In this case, the route '/articles/test-az' exists, it's the route 1.
But if I write them in this order
```
1 : server.get('/articles/:id2-aze', (req, res, next) => {});
2 : server.get('/articles/:id1', (req, res, next) => {});
```
The route '/articles/test-az' does not exist










