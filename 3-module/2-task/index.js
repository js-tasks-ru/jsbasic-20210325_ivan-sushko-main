function filterRange(arr, a, b) {
  if (a > b) {
	  [a, b] = [b, a];
  }
  
  return arr.filter( (element) => (element >= a) && (element <= b) );
}
