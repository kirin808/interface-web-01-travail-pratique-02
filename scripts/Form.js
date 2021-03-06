class Form {
	elemsToValidate = ["INPUT", "TEXTAREA", "SELECT"];

	// Messages d'erreur personnalisés
	errMsgReq = "Ce champ est obligatoire";
	errMsgBadInput =  "Le type de données est erroné";
	errMsgBadEmail = "Ce champ n'accepte qu'un courriel";
	errMsgBadURL = "Ce champ n'accepte qu'une adresse web";

	beenValidated =  false;

	inputs = [];
	invalidWrappers = [];

	constructor(elem) {
		this.form = elem;
		this.inputWrappers = elem.querySelectorAll("[data-js-form-item='inputWrapper']");
		this.buttonAdd = elem.querySelector("[data-js-button='addTask']");

		this._initialize();
	}

	_initialize = () => {
		this.form.setAttribute("novalidate", "true");
		this._initInputs();
		this._initButtons();
	}

	_initInputs = () => {
		Array.from(this.form.elements).forEach(item => {
			if(this.elemsToValidate.includes(item.nodeName)) {
				this.inputs.push(item);
				item.addEventListener("invalid", (e) => {
					e.preventDefault();

					this.throwError(e.target);					
				});
			}
		});
	}

	_initButtons = () => {
		this.buttonAdd.addEventListener("click", (e) => {
			if(this.validate()) {
				listeToDo.addTask(this, this.form.nomTache.value, this.form.descTache.value, this.form.importance.value);
			}

			this.beenValidated = true;
		});
	}

	validate = () => {
		if(this.beenValidated) {
			this.cleanErrors();
		}

		return this.form.checkValidity();
	}

	/**
	 * Générer et injecter les différents types d'erreur.
	 * 
	 * @param {Node} input Élément qui contient l'erreur
	 * @param {String} type Type d'erreur qui doit être généré. Par défaut, gère les erreurs de validation
	 */
	throwError = (input, type = null) => {
		let elemInput = input,
			elemWrapper = elemInput.closest("[data-js-form-item=\"inputWrapper\"]");

		/**
		 * 
		 * Insérer les éléments fautifs dans un tableau afin de facilement les réinitialiser. 
		 * Vérifier si il est déjà présent, pour ne pas le répéter (boutons radios)
		 * 
		 */ 
		if(!this.invalidWrappers.includes(elemWrapper)) {
			this.invalidWrappers.push(elemWrapper);
		}
				
		elemInput.classList.toggle("error-input");
		elemWrapper.classList.toggle("error");

		/** 
		 * Déterminer la cause de l'erreur et générer le message approprié
		 *
		 */
		let errorMsg = "";

		if(elemInput.validity.valueMissing) {
			errorMsg = this.errMsgReq;
		} else if(type = "duplicate") {
			errorMsg = "Cette tâche existe déjà";
		}

		/**
		 * 
		 * Bâtir et insérer l'élément du message d'erreur
		 * 
		 * ne pas insérer un paragraphe d'erreur s'il y en a déjà un, particulièrement utile pour les radios
		 * 
		 */
		if(!elemWrapper.querySelector(`p`)) { // 
			let elemP = document.createElement("p");
		
			elemP.setAttribute("data-js-form-item", "errMsg");
			elemP.classList.add("error-msg");
			elemP.textContent = errorMsg;

			elemWrapper.append(elemP);
		}
	}

	/**
	 * 
	 * Nettoyer toutes les erreurs avant la validation
	 * 
	 */
	cleanErrors = () => {
		this.invalidWrappers.forEach((wrapper) => {
			wrapper.querySelector("[data-js-form-item='errMsg']").remove();

			wrapper.classList.toggle("error");
			
			// Gérer *tous* les boutons radios
			if(wrapper.querySelector("input[type='radio']")) {
				let inputs = wrapper.querySelectorAll("input");

				inputs.forEach(input => {
					input.classList.toggle("error-input");
				});
			} else {
				let input = wrapper.querySelector("input, textarea");
				input.classList.toggle("error-input");
			}
		});
		
		// Réinitialiser le tableau des erreurs;
		this.invalidWrappers = [];
	}
}