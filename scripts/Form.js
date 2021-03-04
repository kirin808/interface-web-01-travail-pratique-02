class Form {
	constructor(elem) {
		this.form = elem;
		this.inputs = [];
	}

	initialize = () => {
		this._setInputs();
	}

	_setInputs = () => {
		Array.from(this.form.elements).forEach(item => {
			
		});
	}

	throwError = () => {

	}
}