function truncate(str, maxlength) {
  if (str.length <= maxlength) return str;
  
  let newstr = str.slice(0, maxlength - 1);
  
  return newstr + "…";
}
