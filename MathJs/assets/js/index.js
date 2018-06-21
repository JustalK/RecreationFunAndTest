

document.addEventListener("DOMContentLoaded", function() {
	
	math.config({
		  number: 'BigNumber', // Default type of number:
		  // 'number' (default), 'BigNumber', or 'Fraction'
		  precision: 20 // Number of significant digits for BigNumbers
	})
	
	// We can manage big numbers with that library
	console.log('Create big numbers from strings');
	console.log(math.bignumber(1.2e+500));
	console.log(math.format(math.bignumber('1.2e+502')));

	// Testing the addition with bignumber
	console.log('Addition with bignumber');
	console.log(math.format(math.add(math.bignumber('0.2'),math.bignumber('0.5'))));

	// Testing the chain function
	console.log(math.chain(3).add(4).multiply(2).done());
	console.log(math.chain(3).multiply(4).add(2).add(2).done());
	console.log(math.chain(3).multiply(4).add(2).add(2).done());
	
	// Testing with argument
	console.log(math.format(math.chain(math.pi).divide(4).sin().square().done()));
	
	// Simplify an expression
	console.log(math.simplify('x*y*(1+x)*x').toString());
	
	// Calculate a derivative
	console.log(math.derivative('x^2','x').toString());
	
	// Playing with complex number
	const a = math.complex(2, 3);
	const b = math.complex(1,2);
	console.log(a);
	a.re = 10;
	a.im = 20;
	console.log(a);
	console.log(math.add(a,b));
	console.log(math.sqrt(-4));
});