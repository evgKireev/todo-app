const functionalityForm = document.querySelector('.functionality__form');
const functionalityInputAdd = document.querySelector(
  '.functionality__form-input'
);
const tasks = document.querySelector('.tasks');


functionalityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  textTask = functionalityInputAdd.value;
  if (!textTask) {
    alert('Please enter the task text');
    return;
  }
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');
  tasks.append(taskElement);

  const taskInput = document.createElement('input');
  taskInput.setAttribute('type', 'checkbox');
  taskElement.append(taskInput);

  const taskContent = document.createElement('div');
  taskContent.classList.add('task__content');
  taskElement.appendChild(taskContent);

  const taskText = document.createElement('p');
  taskText.classList.add('tasks__text');
  taskContent.append(taskText);
  taskText.textContent = textTask;

  const taskDate = document.createElement('span');
  taskDate.classList.add('tasks__date');
  taskContent.append(taskDate);
  taskDate.textContent = new Date();

  const taskButtonDel = document.createElement('button');
  taskButtonDel.classList.add('delete');
  taskButtonDel.innerHTML = 'DELETE';
  taskElement.append(taskButtonDel);

  functionalityInputAdd.focus();
  functionalityInputAdd.value = '';

  taskButtonDel.addEventListener('click', function() {
    this.closest('li').remove()
  })
});