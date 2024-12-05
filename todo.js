export default class Todo {
    constructor (title, description, dueDate, priority) {
        this.id = Date.now() + Math.random();
        // id based on Date.now(): https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13;
        //https://www.javatpoint.com/javascript-creates-unique-id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; //'low', 'medium', 'high' or 'priority 1','2','3'...
        this.isCompleted = false;
    }

    // Switching the task status (completed / not completed)
    switchComplete() {
        this.isCompleted = !this.isCompleted;
    }


}