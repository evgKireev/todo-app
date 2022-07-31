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
  deleteLast,
  search,
  todoTitle,
  functionBtn,
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
  let todosFilter = null;
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
    if (todos.length === 0) {
      todoTitle.textContent = 'No tasks....';
    } else {
      todoTitle.textContent = 'Tasks';
    }
    tasks.innerHTML = '';
    taskActive.textContent = calculateTasksActive(todos);
    taskCompleted.textContent = calculateTasksCompleted(todos);
    todos.forEach((todo) => {
      const taskElement = document.createElement('li');
      taskElement.classList.add('task');
      taskElement.setAttribute('id', todo.id);
      tasks.append(taskElement);

      const label = document.createElement('label');
      label.classList.add('task__label');
      taskElement.append(label);

      const taskInput = document.createElement('input');
      taskInput.classList.add('task__input');
      taskInput.setAttribute('type', 'checkbox');
      label.append(taskInput);
      taskInput.checked = todo.isChecked;

      const span = document.createElement('span');
      span.classList.add('task__span');
      label.append(span);

      const taskText = document.createElement('p');
      taskText.classList.add('tasks__text');
      label.append(taskText);
      taskText.textContent = todo.text;

      const taskDate = document.createElement('span');
      taskDate.classList.add('tasks__date');
      label.append(taskDate);
      taskDate.textContent = todo.date;

      const taskButtonDel = document.createElement('button');
      taskButtonDel.classList.add('delete');
      taskButtonDel.innerHTML = 'DELETE';
      label.append(taskButtonDel);

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

  deleteLast.addEventListener('click', () => {
    todos.pop();
    setLoocalStorage(todos);
    DisplayTodos();
  });



  // search.addEventListener('input', () => {
  //   console.log(search.value);

  //   function taskFilter(todos) {
  //     return todos.filter((el) => el.text == search.value);
  //   }
  //   taskFilter(todos);
  //   console.log(todos);
  // });

  functionBtn.addEventListener('change', () => {
    deleteAllTAsk.classList.toggle('functionality__controls-Alldell-active');
    deleteCompleted.classList.toggle('functionality__controls-Compdell-active');
    deleteLast.classList.toggle('functionality__controls-last-active');
  });

  DisplayTodos();
}
export { render };