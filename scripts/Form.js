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
				item.addEventListener("invalid", (e) => {
					e.preventDefault();

					this.throwError(e.target);					
				});
			}
		});
	}

	_initButtons = () => {
		this.buttonAdd.addEventListener("click", (e) => {
			if(this.form.checkValidity()) {
				listeToDo.addTask(this.form.nomTache.value, this.form.descTache.value, this.form.importance.value);
			}
		});
	}

	throwError = (input) => {
		let elemInput = input,
			elemWrapper = elemInput.closest("[data-js-form-item=\"inputWrapper\"]");

		/* Insérer les éléments fautifs dans un tableau afin de facilement les réinitialiser */
		
		elemInput.classList.toggle("error-input");
		elemWrapper.classList.toggle("error");

		/** 
		 * Déterminer la cause de l'erreur et générer le message approprié
		 *
		 */
		let errorMsg = "";

		if(elemInput.validity.valueMissing) {
			errorMsg = "Ce champ est obligatoire";
		} else if(elemInput.validity.badInput) {
			errorMsg = "Le type de données est erroné";
		} else if(elemInput.validity.patternMismatch)  {
			errorMsg = "Le format utilisé n'est pas valide";
		}

		/**
		 * 
		 * Bâtir et insérer l'élément du message d'erreur
		 * 
		 */
		if(!elemWrapper.querySelector(`p`)) {
			let elemP = document.createElement("p");
		
			//elemP.classList.add(errorElemClass);
			elemP.textContent = errorMsg;

			elemWrapper.append(elemP);
		}
	}
}