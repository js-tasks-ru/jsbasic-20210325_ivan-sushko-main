function ucFirst(str) {
  if (str == null) return String("");
  
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}
