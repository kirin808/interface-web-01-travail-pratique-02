class ToDoList {
	listeAFaire = [];
	taskId = 0;
	constructor (nom) {
		this.name = nom;
	}

	addTask = (objForm, name, desc, priority) => {
		if(!this.listeAFaire.some(task => task.name === "name")) {
			let taskToAdd = new Task(name, desc, priority);

			this.taskId++;

			this.listeAFaire.push(taskToAdd);
			console.log(this.listeAFaire);
		} else {
			objForm.throwErrorDuplicateTask();
		}
	}
}