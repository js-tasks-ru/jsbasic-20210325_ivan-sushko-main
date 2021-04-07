function showSalary(users, age) {
  let users_filtered = users.filter( (element) => {
	  if ( element.age <= age ) return element;
  } );
  
  let final_data = users_filtered.map( (element) => `${element.name}, ${element.balance}` );
  
  return final_data.join("\n");
}
