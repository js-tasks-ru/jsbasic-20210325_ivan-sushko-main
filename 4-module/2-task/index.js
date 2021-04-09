function makeDiagonalRed(table) {
  let counter = 0;
  
  for (let row of table.rows) {
	  row.cells[counter++].style.backgroundColor = "red";
  }
}
