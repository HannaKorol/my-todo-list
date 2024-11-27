import Project from './project.js';
import Todo from './todo.js';


const myProjects = [
	new Project('Home'),
	new Project('Work'),
];



//Button 'New Project'
const newProjectBtn = document.createElement('button');
newProjectBtn.textContent = 'New Project';
newProjectBtn.setAttribute('style', 'width:80px; height:40px; margin-bottom: 20px;');
document.body.appendChild(newProjectBtn);

displayProjects();

//Refer to Project dialog
const newProjectDialog = document.getElementById('newProjectDialog');


//Show 'Add Project' modal
newProjectBtn.onclick = () => {
	newProjectDialog.showModal();
}



//---------------------------------------------------------------------------------Modal 'Project' window------------------------------------------------------------------------------//

// Prevent confirmBtn - the form from being sent
document.getElementById('add-project-btn').addEventListener('click', (event) => {
	event.preventDefault();

	//Take a value from the 'Add Project' modal
	const modalProjectName = document.getElementById('project-name').value;


    const newProject = new Project(modalProjectName);

	addProjectToGroup(newProject);
	displayProjects(myProjects);
	newProjectDialog.close();
});




//Add project to Projects
function addProjectToGroup(project) {

    const existProject = myProjects.some(existingProject =>
		existingProject.name === project.name);

	if (existProject) {
		alert('This project already exists!')
		return;
	}

	const createdProject = new Project(project.name);
	myProjects.push(createdProject);
}





//Display Projects
function displayProjects(projects) {
    let projectList = document.getElementById('project-list');  //<div id='project-list'></div>
	
    
    if(!projectList) {
        projectList = document.createElement('div');
        projectList.setAttribute('id', 'project-list');
        projectList.setAttribute('style', 'display: flex; flex-direction: row; gap:20px;');
        document.body.appendChild(projectList);
    }

    projectList.innerHTML = '';


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
while (projectList.firstChild) {
	projectList.removeChild(projectList.firstChild);
}


for(let index = 0; index < myProjects.length; index++) {
	const project = myProjects[index];
	const projectItem = document.createElement('div');                                    //<div class='book-item'></div>
	projectItem.classList.add('project-item');
	projectItem.setAttribute('style', ' border-radius: 25px; padding: 10px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; margin-bottom: 10px;');

	//
	const titleElm = document.createElement('h2');                                  //<h2>project.name</h2>
	titleElm.textContent = project.name;


	//Add 'Remove Project' Button
	const removeProjectBtn = document.createElement('button');
	removeProjectBtn.textContent = 'Remove Project';

//Add 'Task' Button
const addNewTodoBtn = document.createElement('button');
addNewTodoBtn.textContent = 'Add Task';



	removeProjectBtn.onclick =() => {
const projectIndex = myProjects.findIndex(p => p.id === project.id);
console.log('Found project index:', projectIndex);
if(projectIndex !== -1) {
    myProjects.splice(projectIndex, 1);
    displayProjects(myProjects);
	 } else {
        alert("Project not found!");
    }
	}

    projectItem.appendChild(removeProjectBtn);
	projectItem.appendChild(titleElm);
	projectList.appendChild(projectItem);
    projectItem.appendChild(addNewTodoBtn);

}

/* document.body.appendChild(addTodoBtn);
 */
}


function updateProjectSelect() {
    const projectSelect = document.getElementById('project-select');
    projectSelect.innerHTML = ''; // Очистити список
    myProjects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
}

//---------------------------------------------Todos =============================

document.getElementById('todo-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedProjectId = document.getElementById('project-select').value;
    const selectedProject = myProjects.find(p => p.id === parseInt(selectedProjectId));

    if (selectedProject) {
        const newTodo = new Todo(
            document.getElementById('todo-title').value,
            document.getElementById('todo-description').value,
            document.getElementById('todo-due-date').value,
            document.getElementById('todo-priority').value
        );
        selectedProject.addTodo(newTodo);
        displayTodos(selectedProject.todos);
    }
    document.getElementById('newTodoDialog').close();
});






function displayTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Очистити список
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.textContent = `${todo.title} - ${todo.dueDate}`;
        todoList.appendChild(todoItem);
    });
}
