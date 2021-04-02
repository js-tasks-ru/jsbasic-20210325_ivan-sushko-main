function sumSalary(salaries) {
  let values_mixed = Object.values(salaries);
  let values_sum = 0;
  
  for (let value of values_mixed) {
	  
	  if ( Number.isInteger(value) && isFinite(value) ) {
		  
		  values_sum += value;
	  }
  }
  
  return values_sum;
}
