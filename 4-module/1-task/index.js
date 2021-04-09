function makeFriendsList(friends) {
  document.body.insertAdjacentHTML("beforeEnd", "<ul></ul>");
  let list = document.querySelector("ul");
  
  for (let element of friends) {
	  list.insertAdjacentHTML("beforeEnd", `<li>${element.firstName} ${element.lastName}</li>`);
  }
  
  return list;
}
