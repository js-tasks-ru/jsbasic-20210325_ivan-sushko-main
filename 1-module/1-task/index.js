"use strict"

function factorial(endNumber) {
  if (endNumber < 0) {
	  return "Nope..."
  } else if (endNumber == 0) {
	  return 1;
  }
  
  let result = 1;
  while(endNumber) {
	  result *= endNumber--;
  }
  /*
  for (let i = 1; i <= endNumber; i++) {
	  result *= i;
  }
  */
  
  return result;
}

alert(factorial(0));
alert(factorial(1));
alert(factorial(3));
alert(factorial(5));
