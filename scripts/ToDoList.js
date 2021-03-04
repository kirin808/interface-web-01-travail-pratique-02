class ToDoList {
	listeAFaire = [];
	taskId = 0;
	constructor (nom) {
		this.name = nom;
	}

	addTask = (name, desc, priority) => {
		let taskToAdd = new Task(name, desc, priority);

		this.taskId++;

		this.listeAFaire.push(taskToAdd);
		console.log(this.listeAFaire);
	}
}