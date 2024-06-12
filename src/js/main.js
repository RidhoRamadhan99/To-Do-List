// Function to update clock
function updateClock() {
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let month = now.toLocaleString("default", { month: "long" }); // Get month name

  let time =
    hours + ":" + addZeroPadding(minutes) + ":" + addZeroPadding(seconds);
  let date = month + " " + now.getDate() + ", " + now.getFullYear();

  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;

  setTimeout(updateClock, 1000); // Update every second
}

// Function to add zero padding to numbers less than 10
function addZeroPadding(num) {
  return (num < 10 ? "0" : "") + num;
}

// Start the clock
updateClock();

// Filter
let dropdown = document.querySelector(".dropdown select");

dropdown.addEventListener("change", function () {
  let selectedOption = this.value;
  alert("Kamu telah memilih: " + selectedOption);
});

// Add Task
let addTaskButton = document.querySelector(".add-task-button");

addTaskButton.addEventListener("click", function () {
  let taskNameInput = document.querySelector(
    ".input-section input[type='text']"
  );
  let taskDateInput = document.querySelector(
    ".input-section input[type='date']"
  );
  let taskPrioritySelect = document.querySelector(".input-section select");

  let taskName = taskNameInput.value.trim();
  let taskDate = taskDateInput.value;
  let taskPriority = taskPrioritySelect.value;

  if (taskName !== "") {
    let todoList = document.querySelector(".todo-list");
    let taskElement = document.createElement("tr");
    taskElement.innerHTML = `
      <td>${taskName}</td>
      <td>${taskDate}</td>
      <td>${taskPriority}</td>
      <td class="actions">
        <button class="edit">
          <i class="bx bx-edit"></i>
        </button>
        <button class="delete">
          <i class="bx bx-trash"></i>
        </button>
      </td>
    `;
    todoList.appendChild(taskElement);

    // Clear input fields after adding task
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskPrioritySelect.value = "low";
  } else {
    alert("Task name cannot be empty!");
  }
});

// Delete All
let deleteAllButton = document.querySelector(".delete-all-btn");

deleteAllButton.addEventListener("click", function () {
  let todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
});

// Event Delegation for Edit and Delete
let todoList = document.querySelector(".todo-list");

todoList.addEventListener("click", function (event) {
  let targetElement = event.target;

  if (targetElement.classList.contains("edit")) {
    let taskElement = targetElement.closest("tr");
    let taskName = taskElement.querySelector("td:first-child").textContent;
    let newTaskName = prompt("Edit Task Name:", taskName);

    if (newTaskName !== null) {
      taskElement.querySelector("td:first-child").textContent = newTaskName;
    }
  } else if (targetElement.classList.contains("delete")) {
    let confirmation = confirm("Are you sure you want to delete this task?");

    if (confirmation) {
      let taskElement = targetElement.closest("tr");
      taskElement.remove();
    }
  }
});
