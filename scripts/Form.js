class Form {
	elemsToValidate = ["INPUT", "TEXTAREA", "SELECT"];
	constructor(elem) {
		this.form = elem;
		this.inputs = [];
		this.buttonAdd = elem.querySelector("[data-js-button='addTask']");

		this.initialize();
	}

	initialize = () => {
		//this.form.setAttribute("novalidate", "true");
		this._initInputs();
		this._initButtons();
	}

	_initInputs = () => {
		Array.from(this.form.elements).forEach(item => {
			if(this.elemsToValidate.includes(item.nodeName)) {
				console.log(this.buttonAdd);
			}
		});
	}

	_initButtons = () => {
		this.buttonAdd.addEventListener("click", (e) => {
			if(this.form.checkValidity()) {
				
				listeToDo.addTask();
			}
		});
	}

	throwError = () => {

	}
}