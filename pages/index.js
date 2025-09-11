const initialTodos = [
  {
    id: "7cec7373-681b-49d9-b065-021d61a69d03",
    name: "Read the sprint's theory",
    completed: true,
    date: new Date(),
  },
  {
    id: "a7bfd5ef-37cc-4fa6-89f2-cac098a8aeba",
    name: "Read project instructions",
    completed: false,
    date: new Date(),
  },
  {
    id: "aa486839-63ab-437f-b8a2-29ab217dff4f",
    name: "Complete project",
    completed: false,
    date: new Date(),
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "button_disabled",
};

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");

const todosListSelector = ".todos__list";

const openModal = (modal) => modal.classList.add("popup_visible");
const closeModal = (modal) => modal.classList.remove("popup_visible");

const generateTodo = (data) => {
  const todoElement = todoTemplate.content
    .querySelector(".todo")
    .cloneNode(true);

  const todoNameEl = todoElement.querySelector(".todo__name");
  const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  const todoLabel = todoElement.querySelector(".todo__label");
  const todoDate = todoElement.querySelector(".todo__date");
  const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

  todoNameEl.textContent = data.name;
  todoCheckboxEl.checked = data.completed;
  todoCheckboxEl.id = `todo-${data.id}`;
  todoLabel.setAttribute("for", `todo-${data.id}`);

  const dueDate = new Date(data.date);
  if (!isNaN(dueDate)) {
    todoDate.textContent = `Due: ${dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  todoDeleteBtn.addEventListener("click", () => {
    todoElement.remove();
  });

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: todosListSelector,
});

const renderTodo = (data) => {
  const todo = generateTodo(data);
  section.addItem(todo);
};

initialTodos.forEach((item) => {
  renderTodo(item);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id: uuidv4(), name, date, completed: false };
  renderTodo(values);
  closeModal(addTodoPopup);
  addTodoForm.reset();
});

addTodoButton.addEventListener("click", () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();
