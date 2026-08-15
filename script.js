document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let todoItems = JSON.parse(localStorage.getItem("tasks")) || [];

  todoItems.forEach((todo) => renderTask(todo));

  addTaskButton.addEventListener("click", () => {
    const enteredText = todoInput.value.trim();
    if (enteredText === "") return;

    const newTodo = {
      id: Date.now(),
      text: enteredText,
      completed: false,
    };
    todoItems.push(newTodo);
    SaveTasks();
    renderTask(newTodo);
    todoInput.value = ""; // clears the input
    console.log(todoItems);
  });

  function renderTask(todo) {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
        <span>${todo.text}</span>
        <button>delete</button>
        `;
    li.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") return;
      todo.completed = !todo.completed;
      li.classList.toggle("completed");
      SaveTasks();
    });

    li.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent toggle from firing
      todoItems = todoItems.filter((currentTodo) => {
        return currentTodo.id !== todo.id;
      });
      li.remove();
      SaveTasks();
    });

    todoList.appendChild(li);
  }

  function SaveTasks() {
    localStorage.setItem("tasks", JSON.stringify(todoItems));
  }
});
