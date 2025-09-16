import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const { name, date } = formData;

    // Adjust date for timezone
    const parsedDate = new Date(date);
    parsedDate.setMinutes(
      parsedDate.getMinutes() + parsedDate.getTimezoneOffset()
    );

    const id = uuidv4();

    const values = { name, date: parsedDate, id, completed: false };
    const todo = generateTodo(values);
    todosList.append(todo);

    todoCounter.updateTotal(true);

    newTodoFormValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck(isCompleted) {
  todoCounter.updateCompleted(isCompleted ? true : false);
}

function handleDelete(wasCompleted) {
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
}

function handleTotal() {}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//  closeModal(addTodoPopupElement);
// });

//addTodoForm.addEventListener("submit", (evt) => {
//  evt.preventDefault();

const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (item) => {
    // TODO - write the function
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

document.addEventListener("DOMContentLoaded", function () {
  section.renderItems();
});
//call section instances renderItems method
