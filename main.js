/* import { saveToStorage, loadFromStorage } from "./storage";
 
let myProjects = loadFromStorage();

saveToStorage(myProjects); */

import Project from "./project.js";
import Todo from "./todo.js";

const myProjects = [
  new Project("# Home 🏡"),
  new Project("# Work 💻"),
  new Project("# Study 📚"),
];

//Button 'New Project'
const newProjectBtn = document.createElement("button");
newProjectBtn.textContent = " + New Project";
newProjectBtn.classList.add("newProjectBtn");

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

/* Cancel button in Project Form */
document.getElementById("cancel-project-btn").addEventListener("click", () => {
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

//----------------------------------------------------------------Display Projects------------------------------------------------------------------------//

// Display projects with "Add Task" button
function displayProjects(projects) {
  let projectList = document.getElementById("project-list"); //<div id='project-list'></div>

  //To avoid the projects duplication, check if exists already
  if (!projectList) {
    projectList = document.createElement("div");
    projectList.setAttribute("id", "project-list");

    document.body.appendChild(projectList);
  }

  projectList.innerHTML = "";

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }

  //------------------------------------------------------------------For every project----------------------------------------------------------------------------//
  for (let index = 0; index < myProjects.length; index++) {
    const project = myProjects[index];
    const projectItem = document.createElement("div"); //<div class='book-item'></div>
    projectItem.classList.add("project-item");

    //Project name
    const titleElm = document.createElement("h3"); //<h2>project.name</h2>
    titleElm.textContent = project.name;

    //Add 'Remove Project' Button
    const removeProjectBtn = document.createElement("button");
    removeProjectBtn.textContent = "Remove project";
    removeProjectBtn.classList.add("remove-btn");
    removeProjectBtn.onclick = () => {
      const projectIndex = myProjects.findIndex((p) => p.id === project.id);
      /*console.log("Found project index:", projectIndex);*/
      if (projectIndex !== -1) {
        myProjects.splice(projectIndex, 1);
        displayProjects(myProjects);
      }
    };

    /* ------------------------------------------------Todo tasks-------------------------------------- */

    //Add 'Task' Button and onclick show dialog Todo
    const addNewTodoBtn = document.createElement("button");
    addNewTodoBtn.textContent = " + Add Task";
    addNewTodoBtn.classList.add("addNewTodoBtn");
    addNewTodoBtn.onclick = () => {
      showTodoDialog(project);
    };

    /*   Todo container */
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    //--------------------------------------------------For every Todo---------------------------------------------------------------------------------------------------------------------------------//

    /* Go through every project and  Create Todo */
    for (let i = 0; i < project.todos.length; i++) {
      const todo = project.todos[i];

      /* Todo-single-container */
      const todoItem = document.createElement("div");
      todoItem.classList.add("todoItem");
      todoItem.setAttribute("data-index", `${i}`);
      /*       todoItem.textContent = `${todo.title} ${todo.dueDate}`;
       */

      /* Checkbox checked|not-checked function */
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed || false;
      checkbox.onclick = () => {
        todo.completed = checkbox.checked;
        updateTodoTextStyle(todoText, todo.completed);
      };

      //Add 'Remove Todo' Button
      const removeTodoBtn = document.createElement("button");
      removeTodoBtn.textContent = "Delete";
      removeTodoBtn.classList.add("remove-todo-btn");
      removeTodoBtn.onclick = () => {
        const todoIndex = project.todos.findIndex((p) => p.id === todo.id);
        /*console.log("Found todo index:", todoIndex);*/
        if (todoIndex !== -1) {
          project.todos.splice(todoIndex, 1);
          displayProjects(myProjects);
        }
      };
      /* findIndex : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex*/

      /* Todo text  */
      const todoText = document.createElement("span");
      todoText.textContent = `${todo.title}  
			 ${todo.dueDate}    
			  ${todo.description}`;
      todoText.className = todo.priority;
      updateTodoTextStyle(todoText, todo.completed);

      /*Todo select option*/
      const selectProject = document.createElement("SELECT");
      const selectProjectDefaultOption = document.createElement("OPTION");
      selectProjectDefaultOption.textContent = "Move to...";
      selectProject.appendChild(selectProjectDefaultOption);

      for (let index = 0; index < myProjects.length; index++) {
        const selectProjectOption = document.createElement("OPTION");
        selectProjectOption.value = project.name;
        selectProjectOption.textContent = myProjects[index].name;
        selectProject.appendChild(selectProjectOption);
      }

      selectProject.onchange = function () {
        const selectedProjectName =
          this.options[this.selectedIndex]
            .textContent; /* textContent returns a text of the element from the select  */
        const targetProject = myProjects.find(
          (project) => project.name === selectedProjectName
        );

        if (targetProject && targetProject !== project) {
          /* if it is finded project and make sure that it is not the same project in which this task is */
          const todoIndex = parseInt(
            todoItem.dataset.index,
            10
          ); /* dataset.index returns string "2" therefore convert to number with parseInt*/
          const todoToMove = project.todos.splice(
            todoIndex,
            1
          )[0]; /* we need to return an arraz of deleted elements [0] */

          if (todoToMove) {
            targetProject.addTodo(todoToMove);
            displayProjects(myProjects);
          }
        }
      };

      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoText);
      todoItem.appendChild(removeTodoBtn);
      todoItem.appendChild(selectProject);

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

//---------------------------------------------------------------------------------Modal 'Todo' window------------------------------------------------------------------------------//

// Show the form for adding a task
function showTodoDialog(project) {
  const todoDialog = document.getElementById("newTodoDialog");
  const todoForm = document.getElementById("todo-form");

  //Priority select options with color based on class in html
  const select = document.getElementById("todo-priority");
  select.onchange = function () {
    select.className = this.options[this.selectedIndex].className;
  };
  /*https://stackoverflow.com/questions/15755770/change-text-color-of-selected-option-in-a-select-box*/

  //Add Todo to the project list
  todoForm.onsubmit = (event) => {
    event.preventDefault();
    const newTodo = new Todo(
      document.getElementById("todo-title").value,
      document.getElementById("todo-description").value || "",
      document.getElementById("todo-due-date").value || "",
      document.getElementById("todo-priority").value || ""
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

/*https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details*/
