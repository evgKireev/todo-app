import { todoFunction } from './todoFunction.js';
import { todoDomElements } from './domElements.js';
const {
  newTodoForm,
  nameInput,
  tasks,
  taskActive,
  taskCompleted,
  deleteAllTAsk,
  deleteCompleted,
  search,
} = todoDomElements;

const {
  getUserTime,
  setLoocalStorage,
  getLoocalStorage,
  calculateTasksCompleted,
  calculateTasksActive,
} = todoFunction;

function render() {
  let todos = getLoocalStorage() || [];
  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    taskActive.textContent = calculateTasksActive(todos);
    const textTask = nameInput.value.trim();
    const todo = {
      text: textTask,
      date: getUserTime(new Date()),
      id: new Date().getTime(),
      isChecked: false,
    };

    nameInput.value = '';
    nameInput.focus();
    if (!textTask) {
      alert('Please enter the task text');
      return;
    }
    todos.push(todo);
    setLoocalStorage(todos);
    DisplayTodos();
  });

  function DisplayTodos() {
    tasks.innerHTML = '';
    taskActive.textContent = calculateTasksActive(todos);
    taskCompleted.textContent = calculateTasksCompleted(todos);
    todos.forEach((todo) => {
      const taskElement = document.createElement('li');
      taskElement.classList.add('task');
      taskElement.setAttribute('id', todo.id);
      tasks.append(taskElement);

      const taskInput = document.createElement('input');
      taskInput.classList.add('task__input');
      taskInput.setAttribute('type', 'checkbox');
      taskElement.append(taskInput);
      taskInput.checked = todo.isChecked;

      const taskContent = document.createElement('div');
      taskContent.classList.add('task__content');
      taskElement.appendChild(taskContent);

      const taskText = document.createElement('p');
      taskText.classList.add('tasks__text');
      taskContent.append(taskText);
      taskText.textContent = todo.text;

      const taskDate = document.createElement('span');
      taskDate.classList.add('tasks__date');
      taskContent.append(taskDate);
      taskDate.textContent = todo.date;

      const taskButtonDel = document.createElement('button');
      taskButtonDel.classList.add('delete');
      taskButtonDel.innerHTML = 'DELETE';
      taskElement.append(taskButtonDel);

      deleteCompleted.addEventListener('click', (e) => {
        todos = todos.filter((el) => {
          if (el.isChecked == false) return todos;
        });
        setLoocalStorage(todos);
        DisplayTodos();
      });

      deleteAllTAsk.addEventListener('click', () => {
        todos = [];
        setLoocalStorage(todos);
        DisplayTodos();
      });

      taskInput.addEventListener('change', (e) => {
        todo.isChecked = e.target.checked;
        setLoocalStorage(todos);
        DisplayTodos();
      });

      taskButtonDel.addEventListener('click', function() {
        todos = todos.filter((t) => t !== todo);
        setLoocalStorage(todos);
        DisplayTodos();
      });
    });
  }
  DisplayTodos();
}
export { render }