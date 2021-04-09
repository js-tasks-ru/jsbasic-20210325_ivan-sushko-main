function highlight(table) {
	
  for (let row of table.rows) {
	(row.children[3].dataset.available == undefined) ? row.children[3].parentNode.setAttribute("hidden", true) :
	(row.children[3].dataset.available == "false") ? row.children[3].parentNode.classList.add("unavailable") :
	(row.children[3].dataset.available == "true") ? row.children[3].parentNode.classList.add("available") :
	false;
		
	(row.children[2].innerText == "m") ? row.children[2].parentNode.classList.add("male") :
	(row.children[2].innerText == "f") ? row.children[2].parentNode.classList.add("female") :
	false;
		
	(row.children[1].innerText < 18 ) ? row.children[1].parentNode.style.textDecoration = "line-through" :
	false;	  
  }
  
}
