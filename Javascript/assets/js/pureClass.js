//class Person {
//  constructor(name) {
//    this._name = name
//    this.greeting = 'Hey there!'
//  }
//  setName(strName) {
//	  this._name = strName
//  }
//  getName() {
//    return this._getPrefixedName('Name')
//  }
//  getGreetingCallback() {
//    const {greeting, _name} = this
//    return (subject) => `${greeting} ${subject}, I'm ${_name}`
//  }
//  _getPrefixedName(prefix) {
//    return `${prefix}: ${this._name}`
//  }
//}

//var person = new Person('Jane Doe')
//var person2 = new Person('Lat suj')
//person.setName('Sarah Doe')
//person.greeting = 'Hello'
//person.getName() // Name: John Doe
//person.getGreetingCallback()('Jeff')
//console.log(person);

const createPerson = (n,g = 'Hey there!') => ({_name: n,greeting: g});
var person = createPerson('Jane Doe')
var person2 = createPerson('Lat suj')

const setNamePerson = (p,n) => Object.assign({},p,{_name: n});
person = setNamePerson(person, "Moi")
console.log(person);

const getNamePerson = (p) => p._name;
console.log(getNamePerson(person))

const getGreetingPerson = (p,o) => p.greeting+" "+getNamePerson(o)+", I'm "+getNamePerson(p);
console.log(getGreetingPerson(person,person2));