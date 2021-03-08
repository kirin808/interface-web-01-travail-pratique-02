class ToDoList {
	listeAFaire = [];
	taskId = 0;
	constructor (nom) {
		this.name = nom;
		this.elemListing = document.querySelector("[data-list='todo']");
	}

	addTask = (objForm, name, desc, priority) => {
		if(!this.listeAFaire.some(task => task.name === name)) {
			let taskToAdd = new Task(this.taskId, name, desc, priority);

			this.taskId++;

			this.listeAFaire.push(taskToAdd);
			this.refreshList();

			//this.refreshList();
		} else {
			objForm.throwError(formAjoutTache.form.nomTache, "duplicate");
		}
	}

	removeTask = (taskId) => {		
		this.listeAFaire = this.listeAFaire.filter(task => task.id != taskId);

		this.removeTaskFromDOM(taskId);
	}

	buildTaskListing = (task) => {
		let elemLi = document.createElement("li"),
			elemDiv = document.createElement("div"),
			elemSpanName = document.createElement("span"),
			elemSpanPriority = document.createElement("span"),
			elemBtnRemove = document.createElement("button"),
			elemBtnDetails = document.createElement("button");

		elemLi.setAttribute("data-task-id", task.id);
		
		elemSpanName.textContent = task.name;

		let priority = task.priority == 1 ?
			"Futile" : ((task.priority == 2) ?
			"Peut-être" : "Impératif");
		elemSpanPriority.textContent = `Priorité : ${priority}`;

		elemDiv.append(elemSpanName, elemSpanPriority);

		elemBtnRemove.textContent = "Supprimer cette tâche ingrate";
		elemBtnRemove.addEventListener("click", (e) => {
			let id = e.target.closest("li").dataset.taskId;
			
			this.removeTask(id);
		});

		elemLi.append(elemDiv, elemBtnRemove);

		return elemLi;
	}

	removeTaskFromDOM = (taskId) => {
		this.elemListing.querySelector(`li[data-task-id='${taskId}']`).remove();
	}

	refreshList = (orderBy = "name") => {
		this.cleanList();
		
		let sortedList = this.listeAFaire.sort((taskA, taskB) => {
			console.log(`${taskA[orderBy]} :: ${taskB[orderBy]}`);
			return taskA[orderBy] > taskB[orderBy] ?
				1 : (taskB[orderBy] < taskA[orderBy] ?
					-1 : 0)}),
			frag =  document.createDocumentFragment();
		
		sortedList.forEach(task => {
			let elemLi = this.buildTaskListing(task);

			frag.append(elemLi);
		});

		this.elemListing.append(frag);
	}

	cleanList = () => {
		while(this.elemListing.lastElementChild) {
			this.elemListing.lastElementChild.remove();
		}
	}
}