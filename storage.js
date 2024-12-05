import Project from "./project.js";
import Todo from "./todo.js";

export function saveToStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadFromStorage() {
  const data = localStorage.getItem("projects");
  const parsedProjects = data ? JSON.parse(data) : [];

  // Convert objects into class instances
  return parsedProjects.map((projectData) => {
    const project = new Project(projectData.name);
    project.todos = projectData.todos.map(
      (todoData) =>
        new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority
        )
    );
    return project;
  });
}

