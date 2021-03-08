class ToDoList {
	listeAFaire = [];
	taskId = 0;
	currentSorting = "name";
	constructor (nom) {
		this.name = nom;
		this.elemListing = document.querySelector("[data-list='todo']");
		
		this._initButtons();
	}

	_initButtons = () => {
		let btnOrderName = document.querySelector("[data-button='orderByName']");
		let btnOrderPriority = document.querySelector("[data-button='orderByPriority']");

		btnOrderName.addEventListener("click", (e) => {
			this.currentSorting = "name";
			this.refreshList();
		});

		btnOrderPriority.addEventListener("click", (e) => {
			this.currentSorting = "priority";
			this.refreshList();
		});
	}

	/**
	 * Permet de créer un objet Task et l'insérer à la liste de tâche principale.
	 * 
	 * @param {object} objForm Objet qui réfère au formulaire où envoyer les erreurs
	 * @param {string} name Nom de la tâche
	 * @param {string} desc Description de la tâche
	 * @param {string} priority Entier représentant le niveau de priorité de la tâche 
	 */
	addTask = (objForm, name, desc, priority) => {
		if(!this.listeAFaire.some(task => task.name === name)) {
			let taskToAdd = new Task(this.taskId, name, desc, priority);

			this.taskId++;

			this.listeAFaire.push(taskToAdd);
			this.refreshList();
			
		} else {
			objForm.throwError(formAjoutTache.form.nomTache, "duplicate");
		}
	}

	removeTask = (taskId) => {		
		this.listeAFaire = this.listeAFaire.filter(task => task.id != taskId);

		this.removeTaskFromDOM(taskId);
	}

	/**
	 * Bâtir l'élément représentant la tâche dans une liste.
	 * 
	 * @param {object} task Objet représentant la tâche qui sera déployée
	 * @returns Élément à insérer dans la liste
	 */

	buildTaskEntry = (task) => {
		let elemLi = document.createElement("li"),
			elemDiv = document.createElement("div"),
			elemSpanName = document.createElement("span"),
			elemSpanPriority = document.createElement("span"),
			elemFooter = document.createElement("footer"),
			elemBtnRemove = document.createElement("button"),
			elemBtnDetails = document.createElement("button"),
			priority = task.priority == 1 ?
				"Futile" : ((task.priority == 2) ?
					"Peut-être" : "Impératif");;

		elemLi.setAttribute("data-task-id", task.id);
		elemLi.classList.add("taskEntry", `taskPriority${task.priority}`);
		
		elemDiv.classList.add("taskSummary");

		elemSpanName.textContent = task.name;

		elemSpanPriority.textContent = `Priorité : ${priority}`;

		elemDiv.append(elemSpanName, elemSpanPriority);

		elemBtnRemove.textContent = "Supprimer cette tâche ingrate";
		elemBtnRemove.addEventListener("click", (e) => {
			let id = e.target.closest("li").dataset.taskId;
			
			this.removeTask(id);
		});

		elemBtnDetails.textContent = "Afficher les détails";
		elemBtnDetails.addEventListener("click", (e) => {
			let id = e.target.closest("li").dataset.taskId;

			this.showDetails(id);
		});

		elemFooter.classList.add("manageTask");
		elemFooter.append(elemBtnDetails, elemBtnRemove)

		elemLi.append(elemDiv, elemFooter);

		return elemLi;
	}

	/**
	 * Retirer la tâche de la liste affichée à l'écran.
	 * 
	 * @param {*} taskId Nombre représentant l'id de la tâche à supprimer de la liste
	 */
	removeTaskFromDOM = (taskId) => {
		this.elemListing.querySelector(`li[data-task-id='${taskId}']`).remove();
	}

	/**
	 * Trier la liste selon la demande et injecter les éléments trier dans le DOM
	 * 
	 * @param {string} orderBy Propriété par laquelle sera triée la liste
	 */
	refreshList = (orderBy = this.currentSorting) => {
		this.cleanList();

		let frag =  document.createDocumentFragment();
		
		if(this.listeAFaire.length > 0) {
			let sortedList = this.listeAFaire.sort((taskA, taskB) => {
				return taskA[orderBy] > taskB[orderBy] ?
				1 : (taskB[orderBy] < taskA[orderBy] ?
					-1 : 0)})
						
			sortedList.forEach(task => {
				let elemLi = this.buildTaskEntry(task);

				frag.append(elemLi);
			});
		} else {
			let elemP = document.createElement("p");

			elemP.textContent = "Tous vos sidequests sont complétés.";

			frag.append(elemP);
		}

		this.elemListing.append(frag);
	}

	/**
	 * Récupérer l'objet de la tâche à partir de la liste et afficher ses détails dans le panneau à cet effet.
	 * 
	 * @param {*} taskId Id de la tâche à afficher
	 */
	showDetails = (taskId) => {
		let ddName = document.querySelector("[data-details='name'] > dd"),
			ddDesc = document.querySelector("[data-details='description'] > dd"),
			ddPriority = document.querySelector("[data-details='priority'] > dd"),
			btnToggle = document.querySelector("[data-button='toggleDetails']"),
			task = this.listeAFaire.find(task => task.id == taskId);

		ddName.textContent = task.name;
		ddDesc.textContent = task.description;
		ddPriority.textContent = task.priority;

		btnToggle.checked = true;		
	}
	
	/**
	 * Nettoyer la liste DOM avant l'injection de la liste triée.
	 */
	cleanList = () => {
		while(this.elemListing.lastElementChild) {
			this.elemListing.lastElementChild.remove();
		}
	}
}