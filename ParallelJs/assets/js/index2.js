

document.addEventListener("DOMContentLoaded", function() {	
	var TTABLE=document.getElementById("TTABLE");
	var worker = new Worker("./assets/js/mergesort2.js");
	var htmltoarray = [].slice.call(TTABLE.getElementsByTagName('tr'));
	for(var obj = [],i=htmltoarray.length;i-->1;) obj.push([parseInt(htmltoarray[i].dataset.id),htmltoarray[i].lastElementChild.innerHTML ]);
	
	document.getElementById("BWORKER").addEventListener("click", function() {
		a = performance.now();
		if(window.Worker) {

			worker.postMessage(obj);
			// Send the data to the worker
			// Get the result from the worker
			worker.onmessage = function(e) {
				var arr = e.data;
				var rsl = "";
				rsl += '<tr><th>ID</th><th>A data test</th></tr>';
				for(i=0;i<arr.length;i++) rsl += '<tr>'+'<td>'+arr[i][0]+'</td>'+'<td>'+arr[i][1]+'</td>'+'</tr>';
				TTABLE.remove();
				table = document.createElement('table');
				table.innerHTML = rsl;
				document.body.appendChild(table);
				b = performance.now();
				console.log(b-a);
			}
		}
	});
	
	document.getElementById("BWITHOUTWORKER").addEventListener("click", function() {
		a = performance.now();
		var arr = mergeSort(obj);
		var rsl = "";
		rsl += '<tr><th>ID</th><th>A data test</th></tr>';
		for(i=0;i<arr.length;i++) rsl += '<tr>'+'<td>'+arr[i][0]+'</td>'+'<td>'+arr[i][1]+'</td>'+'</tr>';
		TTABLE.remove();
		table = document.createElement('table');
		table.innerHTML = rsl;
		document.body.appendChild(table);
		b = performance.now();
		console.log(b-a);
	});
	
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
	        if (left[0][0] <= right[0][0]) {
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
});