function makeFriendsList(friends) {
  let list = document.createElement("ul");
  
  for (let el of friends) {
	  list.append(document.createElement("li"));
	  list.lastElementChild.innerText = `${el.firstName+el.lastName}`;
  }
  
  return list;
}