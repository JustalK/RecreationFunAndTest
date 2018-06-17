/**
 * Be careful ! That does not work with Chrome if you dont use a http server
 */
document.addEventListener("DOMContentLoaded", function() {
	
	function mergeSort(arr){
	    if (arr.length < 2)
	        return arr;
	 
	    var middle = parseInt(arr.length / 2);
	    var left   = arr.slice(0, middle);
	    var right  = arr.slice(middle, arr.length);
	 
	    return merge(mergeSort(left), mergeSort(right));
	}
	 
	function merge(left, right){
	    var result = [];
	 
	    while (left.length && right.length) {
	        if (left[0] <= right[0]) {
	            result.push(left.shift());
	        } else {
	            result.push(right.shift());
	        }
	    }
	    while (left.length)
	        result.push(left.shift());
	 
	    while (right.length)
	        result.push(right.shift());
	 
	    return result;
	}
	
	function swap(items, firstIndex, secondIndex){
	    var temp = items[firstIndex];
	    items[firstIndex] = items[secondIndex];
	    items[secondIndex] = temp;
	}

	function partition(items, left, right) {
	    var pivot   = items[Math.floor((right + left) / 2)],
	        i       = left,
	        j       = right;

	    while (i <= j) {
	        while (items[i] < pivot) {
	            i++;
	        }
	        while (items[j] > pivot) {
	            j--;
	        }
	        if (i <= j) {
	            swap(items, i, j);
	            i++;
	            j--;
	        }
	    }
	    return i;
	}

	function quickSort(items, left, right) {
	    var index;

	    if (items.length > 1) {
	        index = partition(items, left, right);
	        if (left < index - 1) {
	            quickSort(items, left, index - 1);
	        }
	        if (index < right) {
	            quickSort(items, index, right);
	        }
	    }
	    return items;
	}
	
	var array = [];
	for(i=10000;i--;) {
		array.push(Math.round(Math.random()*1000));
	}
	
	function work() {
		// Test if the worker is available
		if(window.Worker) {
			var worker = new Worker("./assets/js/mergesort.js");
			var worker2 = new Worker("./assets/js/quicksort.js");
			
			// Send the data to the worker
			worker.postMessage(array);
			worker2.postMessage(array);
			
			// Get the result from the worker
			worker.onmessage = function(e) {
				console.log(e.data);
			}
			worker2.onmessage = function(e) {
				console.log(e.data);
			}
		}
	}
	
	a = performance.now();
	mergeSort(array);
	quickSort(array);
	b = performance.now();
	console.log(b-a);
	
	a = performance.now();
	work();
	b = performance.now();
	console.log(b-a);
	
});