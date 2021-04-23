function getMinMax(str) {
  let array_no_spaces = str.split(" ");
  let array_flat = [];
  
  for (let value of array_no_spaces) {
	  value = value.trim().split(",");
	  array_flat.push(value);
  }
  
  array_flat = array_flat.flat();
  
  let array_filtered = array_flat.filter( (element) => {
	  return Number(element);
  } );

  return { min: Math.min(...array_filtered), max: Math.max(...array_filtered), }
}
