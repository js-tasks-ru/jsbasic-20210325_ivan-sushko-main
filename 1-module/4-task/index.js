function checkSpam(str) {
	// We don't want to change original str, hence we declare the temp variable:
  let tempStr = str.toLowerCase(); 
  
  if (tempStr.includes("1xbet") || tempStr.includes("xxx")) {
	  return true;
  }
  
  return false;
}