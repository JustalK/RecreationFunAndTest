// https://javascript.info/advanced-functions
// https://medium.com/dailyjs/functional-js-with-es6-recursive-patterns-b7d0813ef9e3

const def = x => typeof x !== 'undefined';
const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs),x] : [];
const head = ([x]) => x;
// rest parameters
const tail = ([, ...xs]) => xs;
const last = x => head(reverse(x));
const addOne = x => x + 1 ;
const slice = ([x, ...xs], i, y, curr = 0) => def(x) ? curr == i ? [y, x, ...slice(xs, i, y, curr + 1)] : [x, ...slice(xs, i, y, curr + 1)] : [];
const swap = (a, i, j) => (
		a.map((x,y) => {
			if(y == i) return a[j];
			if(y == j) return a[i];
			return x;
		})
	)
// Shorten a function
const isArray = x => Array.isArray(x);
const filter = ([x, ...xs], fn) => def(x) 
	? fn(x) 
			? [x, ...filter(xs, fn)] : [...filter(xs, fn)]
	: [];
const reject = ([x, ...xs], fn) => def(x)
	? !fn(x)
			? [x, ...reject(xs, fn)] : [...reject(xs, fn)]
	: [];
const even = x => x%2 === 0;	
const sum = (memo, x) => memo + x
const flatten = (memo, x) => memo.concat(x)
const partition = (x, fn) => [[...filter(x,fn)],[...reject(x,fn)]];
const reduce = ([x, ...xs], sum, rsl) => def(x) ? reduce(xs, sum, sum(rsl,x)) : rsl;
const reduceRight = (x, fn, rsl) => reduce(reverse(x), fn, rsl);

const add = (x,y) => x + y;
const partial = (fn, ...args) => (...newArgs) => fn(...args, ...newArgs);

const spreadArg = (fn) => (...args) => fn(args);

document.addEventListener("DOMContentLoaded", function() {
	const defined = 'test';
	console.log(def(defined));
	
	const array = [1,2,3,4,5,6,7,8,9];
//	console.log(addOne(...array));
//	console.log(...array);
//	console.log(reverse(array));
//	console.log(head(array));
//	console.log(tail(array));
//	console.log(last(array));
	
	// Slice custom
	const array2 = [1,2,4,5];
//	console.log(slice(array2,2,3));
//	console.log(isArray(array2));
	
	const array3 = [11,22,33];
//	console.log(swap(array3,0,2));
//	console.log(even(2));
//	console.log(filter(array, even));
//	console.log(reject(array, even));
//	console.log(partition(array, even));
//	console.log(reduce([1,2,3], sum, 0));
//	console.log(reduce([4,5], flatten, [1,3]));
//	console.log(reduceRight([4,5,6], flatten, [1,3]));
	
	const add5to = partial(add, 5)
//	console.log(add5to(10))
	
	// Spread a function
	const add2 = ([x,...xs]) => def(x) ? parseInt(x + add2(xs)) : 0;
//	console.log(add2([10,11,12,13,14,15]));
	const spreadAdd2 = spreadArg(add2);
//	console.log(spreadAdd2(10,11,12,13,14,15));
	
	
	// Merge two array with ES6
	const merge1 = [1,2,3,4,5];
	const merge2 = [6,7,8,9];
//	console.log([...merge1,...merge2]);
	
	// For of throught spread operator
	const letters = "Latsuj";
//	console.log([...letters]);
//	for(var c of letters) console.log(c);
	
	const pluck = (a,b) => b[a];
	const product = {"test": 12}
	console.log(pluck("test",product));
	const getPrices = partial(pluck, 'test');
	const products = [{"test":10},{"test":11}];
	console.log(products.map(getPrices));
	
	const min = ([x, ...xs], rsl = 0, curr = 0) => def(x)
		? x<rsl || curr === 0
			? min(xs,x,curr+1)
			: min(xs,rsl,curr+1)
		: rsl;
	console.log(min([]));
	console.log(min([10,2,-2,4]));
	
	// Everything as a reduce
	const length2 = xs => reduce(xs, (m,x) => m + 1, 0);
	console.log(length2([1,2,3,4,5,9]));
	const add3 = xs => reduce(xs, (m,x) => m + x, 0);
	console.log(add3([1,2,3,5]));
	const add5 = xs => xs.reduce((m,x) => m+x, 200);
	console.log(add5([1,2,3,5]));
});


printHi();
function printHi() {
	// That does not matter where the var is, because all var are call at the beginning of the function (declaration hoisted)
	// But declaration are not
	phrase = "Hi";
	
	if(false) var phrase;
	
	console.log(phrase);
}

// Exercise with cats
const cats = [
  { name: 'Mojo',    months: 84 },
  { name: 'Mao-Mao', months: 34 },
  { name: 'Waffles', months: 4 },
  { name: 'Pickles', months: 6 }
]

var kittens = []
// typical poorly written `for loop`
for (var i = 0; i < cats.length; i++) {
  if (cats[i].months < 7) {
    kittens.push(cats[i].name)
  }
}

const kitten = xs => xs.reduce((m,x) => x.months<7 ? [...m,x.name] : m, []);
//console.log(kittens)
console.log(kitten(cats))

// Exercice with remove and Double
const arr2 = [2, -4, 6]
const removeAndDouble = xs => xs.reduce((m,x) => x>=0 ? [...m,x*2]: m,[])
console.log(removeAndDouble(arr2));

// Exercise with animals
const animals = [
    {
        "name": "cat",
        "size": "small",
        "weight": 5
    },
    {
        "name": "dog",
        "size": "small",
        "weight": 10
    },
    {
        "name": "lion",
        "size": "medium",
        "weight": 150
    },
    {
        "name": "elephant",
        "size": "big",
        "weight": 5000
    }
]

//let total_weight = 0;
//for (let i = 0; i < animals.length; i++) {
//    total_weigth += animals[i].weight
//}
const getWeight = a => a.weight
const addWeight = (a,b) => parseInt(a+getWeight(b))
const totalWeight = xs => xs.reduce((m,x) => addWeight(m,x),0);
console.log(totalWeight(animals));

// Google test
// Put the words matching when you reverse them together
const country = ['Abc', 'Londo', 'Odnol', 'Cba', 'zyu', 'illli'];
const reverseStr = x => x.split('').reverse().join('').toLowerCase();
const equalsCity = (a,xs) => xs.reduce((m,x) => reverseStr(x) === a.toLowerCase() && a !== x ? [...m,x] : m,[a]);
const rslConcat = xs => xs.reduce((m,x) => [...m,...x],[]); 
const equalsCities = xs => xs.reduce((m,x) => !rslConcat(m).includes(x) ? [...m,equalsCity(x,xs)] : m,[]);
console.log(equalsCities(country));

























