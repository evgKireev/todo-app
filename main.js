const functionalityForm = document.querySelector('.functionality__form');
const functionalityInputAdd = document.querySelector('.functionality__input');
const tasks = document.querySelector('.tasks');

const todos = getLoocalStorage() || []
functionalityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  textTask = functionalityInputAdd.value.trim();
  const todo = {
    text: textTask,
    date: getUserTime(new Date()),
    id: new Date().getTime(),
    isChecked: false,
  };
  functionalityInputAdd.value = '';
  functionalityInputAdd.focus();
  if (!textTask) {
    alert('Please enter the task text');
    return;
  }
  todos.push(todo);
  setLoocalStorage(todos);
  render();
});


function DisplayTodos() {
  const todoGetStorage = getLoocalStorage();
  if (todoGetStorage) {

    todoGetStorage.forEach((el) => {
      const taskElement = document.createElement('li');
      taskElement.classList.add('task');
      tasks.append(taskElement);

      const taskInput = document.createElement('input');
      taskInput.classList.add('task__input');
      taskInput.setAttribute('type', 'checkbox');
      taskElement.append(taskInput);

      const taskContent = document.createElement('div');
      taskContent.classList.add('task__content');
      taskElement.appendChild(taskContent);

      const taskText = document.createElement('p');
      taskText.classList.add('tasks__text');
      taskContent.append(taskText);
      taskText.textContent = el.text;

      const taskDate = document.createElement('span');
      taskDate.classList.add('tasks__date');
      taskContent.append(taskDate);
      taskDate.textContent = el.date;

      const taskButtonDel = document.createElement('button');
      taskButtonDel.classList.add('delete');
      taskButtonDel.innerHTML = 'DELETE';
      taskElement.append(taskButtonDel);
    });
  }
}

DisplayTodos();













// functionalityForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   textTask = functionalityInputAdd.value.trim();
//   if (!textTask) {
//     alert('Please enter the task text');
//     return;
//   }
//   const taskElement = document.createElement('li');
//   taskElement.classList.add('task');
//   tasks.append(taskElement);

//   const taskInput = document.createElement('input');
//   taskInput.classList.add('task__input');
//   taskInput.setAttribute('type', 'checkbox');
//   taskElement.append(taskInput);

//   const taskContent = document.createElement('div');
//   taskContent.classList.add('task__content');
//   taskElement.appendChild(taskContent);

//   const taskText = document.createElement('p');
//   taskText.classList.add('tasks__text');
//   taskContent.append(taskText);
//   taskText.textContent = textTask;

//   const taskDate = document.createElement('span');
//   taskDate.classList.add('tasks__date');
//   taskContent.append(taskDate);
//   taskDate.textContent = getUserTime(new Date());

//   const taskButtonDel = document.createElement('button');
//   taskButtonDel.classList.add('delete');
//   taskButtonDel.innerHTML = 'DELETE';
//   taskElement.append(taskButtonDel);

//   functionalityInputAdd.focus();
//   functionalityInputAdd.value = '';

//   taskButtonDel.addEventListener('click', function() {
//     this.closest('li').remove();
//   });

//   const todo = {
//     text: textTask,
//     date: getUserTime(new Date()),
//     id: new Date().getTime(),
//     isChecked: false,
//   };
//   todos.push(todo);
//   setName(todos)
//   e.target.reset()


// });





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

function clearElementsLocal() {
  return tasks.innerHTML = ''
}

function render() {
  clearElementsLocal();
  DisplayTodos();
}