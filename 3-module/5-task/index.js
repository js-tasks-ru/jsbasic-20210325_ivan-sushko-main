function getMinMax(str) {
  let array_no_spaces = str.split(" ");
  let array_flat = [];
  
  for (let value of array_no_spaces) {
	  value = value.trim().split(",");
	  array_flat.push(value);
  }
  
  array_flat = array_flat.flat();
  
  for (let index = 0; index < array_flat.length; index++) {
	  array_flat[index] = parseFloat( array_flat[index] ) || parseInt( array_flat[index] );
  }
  
  let array_filtered = array_flat.filter( (element) => {
	  return element || element === 0;
  } );
  
  let result = array_filtered.sort( (first, second) => first > second );
  
  return { min: result[ 0 ], max: result[ result.length - 1 ], }
}
