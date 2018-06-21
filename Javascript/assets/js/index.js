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

document.addEventListener("DOMContentLoaded", function() {
	const defined = 'test';
	console.log(def(defined));
	
	const array = [1,2,3,4,5,6,7,8,9];
	console.log(addOne(...array));
	console.log(...array);
	console.log(reverse(array));
	console.log(head(array));
	console.log(tail(array));
	console.log(last(array));
	
	// Slice custom
	const array2 = [1,2,4,5];
	console.log(slice(array2,2,3));
	console.log(isArray(array2));
	
	const array3 = [11,22,33];
	console.log(swap(array3,0,2));
	console.log(even(2));
	console.log(filter(array, even));
	console.log(reject(array, even));
	console.log(partition(array, even));
	console.log(reduce([1,2,3], sum, 0));
	console.log(reduce([4,5], flatten, [1,3]));
	console.log(reduceRight([4,5,6], flatten, [1,3]));
	
	const add5to = partial(add, 5)
	console.log(add5to(10))
	
	// Merge two array with ES6
	const merge1 = [1,2,3,4,5];
	const merge2 = [6,7,8,9];
	console.log([...merge1,...merge2]);
	
	// For of throught spread operator
	const letters = "Latsuj";
	console.log([...letters]);
	for(var c of letters) console.log(c);
});


printHi();
function printHi() {
	// That does not matter where the var is, because all var are call at the beginning of the function (declaration hoisted)
	// But declaration are not
	phrase = "Hi";
	
	if(false) var phrase;
	
	console.log(phrase);
}