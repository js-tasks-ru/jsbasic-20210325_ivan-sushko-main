/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
	constructor(data) {
		this.elem = this.createTable(data);
	}
	
	createTable(data) {
		let table_created = document.createElement("table");
		
		
		table_created.createTHead();
		let table_head = table_created.firstElementChild;
		
			table_head.insertRow();
			for (let header in data[0]) {
				table_head.children[0].insertAdjacentHTML("beforeEnd",`<th>${header[0].toUpperCase() + header.slice(1)}</th>`);
			}
			table_head.children[0].insertAdjacentHTML("beforeEnd", "<th></th>");
		
		
		table_created.createTBody();
		let table_body = table_created.lastElementChild;	
		
			for (let iterator = 0; iterator < data.length; iterator++ ) {
				table_body.insertRow();			
				Object.values(data[iterator]).forEach( value => {		
					table_body.children[iterator].insertCell().innerText = value;
				});	
				table_body.children[iterator].insertCell().insertAdjacentHTML("beforeEnd", "<button class='del'>X</button>");
			}
		

		table_body.addEventListener("click", function(event) {
			if (event.target.className == "del") table_body.deleteRow(this);
		});
		
		
		return table_created;
	}
}
