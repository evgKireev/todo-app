const todoTitle = document.querySelector('.todo__title');
const newTodoForm = document.querySelector('.functionality__form');
const nameInput = document.querySelector('.functionality__input');
const tasks = document.querySelector('.tasks');
const taskActive = document.querySelector('.active-span');
const taskCompleted = document.querySelector('.completed-span');
const deleteAllTAsk = document.querySelector(
  '.functionality__controls-Alldell'
);
const deleteCompleted = document.querySelector(
  '.functionality__controls-Compdell'
);
const deleteLast = document.querySelector('.functionality__controls-last');
const search = document.querySelector('.functionality__input-search ');
const functionBtn = document.querySelector('.functionality__controls-check');




export const todoDomElements = {
  newTodoForm,
  nameInput,
  tasks,
  taskActive,
  taskCompleted,
  deleteAllTAsk,
  deleteCompleted,
  deleteLast,
  search,
  todoTitle,
  functionBtn,
};