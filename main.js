todos = getLoocalStorage() || [];
const newTodoForm = document.querySelector('.functionality__form');
const nameInput = document.querySelector('.functionality__input');
const tasks = document.querySelector('.tasks');
const taskActive = document.querySelector('.active');
const taskCompleted = document.querySelector('.completed-span');
const deleteAllTAsk = document.querySelector(
  '.functionality__controls-Alldell'
);
const deleteCompleted = document.querySelector(
  '.functionality__controls-Compdell'
);
const search = document.querySelector('.functionality__input')

taskCompleted.textContent = calculateTasksCount(todos);
newTodoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  textTask = nameInput.value.trim();
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
      taskCompleted.textContent = calculateTasksCount(todos);
      setLoocalStorage(todos);
      DisplayTodos();
    });

    deleteAllTAsk.addEventListener('click', () => {
      todos = [];
      taskCompleted.textContent = calculateTasksCount(todos);
      setLoocalStorage(todos);
      DisplayTodos();
    });

    taskInput.addEventListener('change', (e) => {
      todo.isChecked = e.target.checked;
      taskCompleted.textContent = calculateTasksCount(todos);
      setLoocalStorage(todos);
      DisplayTodos();
    });


    taskButtonDel.addEventListener('click', function() {
      todos = todos.filter((t) => t !== todo);
      taskCompleted.textContent = calculateTasksCount(todos);
      setLoocalStorage(todos);
      DisplayTodos();
    });
  });
}
DisplayTodos();

















const getUserTime = function(date) {
  let D = date.getDate();
  let M = date.getMonth() + 1;
  let Y = date.getFullYear();
  let H = date.getHours();
  let m = date.getMinutes();
  m < 10 ? (m = '0' + m) : m;
  return `${D}-${M}-${Y} | ${H}:${m}`;
};
getUserTime(new Date());

function setLoocalStorage(todos) {
  return localStorage.setItem('todolist', JSON.stringify(todos));
}

function getLoocalStorage() {
  return JSON.parse(localStorage.getItem('todolist'));
}

function calculateTasksCount(todos) {
  return todos.filter((value, index, array) => value.isChecked === true).length;

}