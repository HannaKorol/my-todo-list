import Project from "./project.js";
import Todo from "./todo.js";

const myProjects = [new Project("Home"), new Project("Work")];

//Button 'New Project'
const newProjectBtn = document.createElement("button");
newProjectBtn.textContent = "New Project";
newProjectBtn.setAttribute(
  "style",
  "width:80px; height:40px; margin-bottom: 20px;"
);
document.body.appendChild(newProjectBtn);

//Default display of projects(2 projects: Home and Work)
displayProjects(myProjects);

//Refer to Project dialog
const newProjectDialog = document.getElementById("newProjectDialog");

//Show 'Add Project' modal
newProjectBtn.onclick = () => {
  newProjectDialog.showModal();
};

//---------------------------------------------------------------------------------Modal 'Project' window------------------------------------------------------------------------------//

// Prevent confirmBtn - the form from being sent
document
  .getElementById("add-project-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    //Take a value from the 'Add Project' modal
    const modalProjectName = document.getElementById("project-name").value;

    //Add a value of the 'Add Project' modal to variable
    const newProject = new Project(modalProjectName);

    addProjectToGroup(newProject);
    displayProjects(myProjects);
    newProjectDialog.close();
  });

//Add project to Projects
function addProjectToGroup(project) {
  const existProject = myProjects.some(
    (existingProject) => existingProject.name === project.name
  );

  if (existProject) {
    alert("This project already exists!");
    return;
  }

  const createdProject = new Project(project.name);
  myProjects.push(createdProject);
}

// Display projects with "Add Task" button
function displayProjects(projects) {
  let projectList = document.getElementById("project-list"); //<div id='project-list'></div>

  //To avoid the projects dublication, check if exists already
  if (!projectList) {
    projectList = document.createElement("div");
    projectList.setAttribute("id", "project-list");
    projectList.setAttribute(
      "style",
      "display: flex; flex-direction: row; gap:20px;"
    );
    document.body.appendChild(projectList);
  }

  projectList.innerHTML = "";

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }

  for (let index = 0; index < myProjects.length; index++) {
    const project = myProjects[index];
    const projectItem = document.createElement("div"); //<div class='book-item'></div>
    projectItem.classList.add("project-item");
    projectItem.setAttribute(
      "style",
      " border-radius: 25px; padding: 10px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; margin-bottom: 10px;"
    );

    //Project name
    const titleElm = document.createElement("h2"); //<h2>project.name</h2>
    titleElm.textContent = project.name;

    //Add 'Remove Project' Button
    const removeProjectBtn = document.createElement("button");
    removeProjectBtn.textContent = "Remove Project";
    removeProjectBtn.onclick = () => {
      const projectIndex = myProjects.findIndex((p) => p.id === project.id);
      console.log("Found project index:", projectIndex);
      if (projectIndex !== -1) {
        myProjects.splice(projectIndex, 1);
        displayProjects(myProjects);
      }
    };

      /* ------------------------------------------------Todo tasks-------------------------------------- */
      
    //Add 'Task' Button and onclick show dialog Todo
    const addNewTodoBtn = document.createElement("button");
    addNewTodoBtn.textContent = "Add Task";
    addNewTodoBtn.onclick = () => {
      showTodoDialog(project);
    };

    /*   Todo container */
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    todoContainer.setAttribute("style", "margin-top: 10px;");

    /* Go throught every project and  Create Todo */
    for (let i = 0; i < project.todos.length; i++) {
      const todo = project.todos[i];

      /* Todo-single-container */
      const todoItem = document.createElement("div");
      /*       todoItem.textContent = `${todo.title} ${todo.dueDate}`;
       */ todoItem.setAttribute(
        "style",
        "padding:5px; margin-bottom: 5px; background:#f9f9f9; border: 1px solid #ddd; border-radius: 5px;"
      );

      /* Checkbox checked|notchecked function */
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed || false;
      checkbox.onclick = () => {
        todo.completed = checkbox.checked;
        updateTodoTextStyle(todoText, todo.completed);
        /* if (todo.completed) {
                todoItem.style.textDecoration = "line-through";
            } else {
                todoItem.style.textDecoration = "none";
            } */
      };

      /* Todo text  */
      const todoText = document.createElement("span");
      todoText.textContent = `${todo.title}  ${todo.dueDate}`;
      updateTodoTextStyle(todoText, todo.completed);

      /*             if (todo.completed) {
                todoText.style.textDecoration = "line-through";
        } */

      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoText);

      todoContainer.appendChild(todoItem);
    }

      /* Todo text style when 'clicked' checkbox| 'not clicked' */
    function updateTodoTextStyle(todoText, isCompleted) {
      if (isCompleted) {
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "gray";
      } else {
        todoText.style.textDecoration = "none";
        todoText.style.color = "black";
      }
    }

    projectItem.appendChild(titleElm);
    projectItem.appendChild(removeProjectBtn);
    projectItem.appendChild(addNewTodoBtn);
    projectItem.appendChild(todoContainer);

    projectList.appendChild(projectItem);
  }
}

// Show the form for adding a task
function showTodoDialog(project) {
  const todoDialog = document.getElementById("newTodoDialog");
  const todoForm = document.getElementById("todo-form");

  todoForm.onsubmit = (event) => {
    event.preventDefault();

    const newTodo = new Todo(
      document.getElementById("todo-title").value,
      document.getElementById("todo-description").value || "",
      document.getElementById("todo-due-date").value || "",
      document.getElementById("todo-priority").value
    );

    project.addTodo(newTodo);
    displayProjects(myProjects);
    todoDialog.close();
    todoForm.reset();
  };

  /* Cancel button in Todo Form */
  document.getElementById("cancel-button").addEventListener("click", () => {
    todoDialog.close();
  });
    
  todoDialog.showModal();
}
