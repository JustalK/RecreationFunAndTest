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









