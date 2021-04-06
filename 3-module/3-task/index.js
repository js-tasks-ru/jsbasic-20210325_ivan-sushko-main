function camelize(str) {
  let indexes = [];
  
  for ( let iterator = 0; iterator < str.length; iterator++ ) {
	  if ( str[iterator] == "-" ) {
		  indexes.push( str[iterator + 1].toUpperCase() );
	  }
  }
  
  for ( let index = 0; index < str.length; index++ ) {
	  str = str.replace( "-", indexes[index] );
	  
	  if ( str[index] == str[index].toUpperCase() ) {
		  str = str.slice( 0, str.indexOf( str[index] ) + 1 ) + str.slice( str.indexOf( str[index] ) + 2 );
	  }
  }
  
  return str;
}
