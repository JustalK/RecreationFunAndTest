# MongoDB

A simple document for compiling all the elements that I wanna keep about MongoDB.

### Access the mongo with the terminal

For starting the server
```
mongod
```

For showing the database of the actual dbs
```
showdbs
```

This function will show all the collection of the database
```
show collections
```

This function will create a database only if I create a collection
```
use <dbName>
```

### Playing with a collection

For creating a new collection
```
db.createCollection('<collectionName>')
```
> Error 73 : If there are no name for the database

For adding an object in a collection
```
db.<collectionName>.insert({nom: 'Latsuj',techno: 'mongoDB'})
```

For updating the value matching the first argument
```
// This line update only the first object matching
db.<collectionName>.update({name: 'latsuj'},{name: 'latsuj dev'})
// For every objects, we have to use multi and the $set
db.<collectionName>.update({name: 'latsuj'},{$set: {name: 'latsuj dev'}},{multi: true})
```

For finding the objects matching the first argument
```
db.<collectionName>.find({name: 'latsuj'})
```
> Using .pretty() at the end for printing the result with something more readable

For removing the objects matching the first argument
```
db.<collectionName>.remove({namse: 'latsuj'})
```

