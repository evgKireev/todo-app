const getUserTime = (date) => {
  let D = date.getDate();
  let M = date.getMonth() + 1;
  let Y = date.getFullYear();
  let H = date.getHours();
  let m = date.getMinutes();
  m < 10 ? (m = '0' + m) : m;
  return `${D}-${M}-${Y} | ${H}:${m}`;
};

export function setLoocalStorage(todos) {
  return localStorage.setItem('todolist', JSON.stringify(todos));
}

export function getLoocalStorage() {
  return JSON.parse(localStorage.getItem('todolist'));
}

export function calculateTasksCompleted(todos) {
  return todos.filter((value) => value.isChecked === true).length;
}

export function calculateTasksActive(todos) {
  return todos.filter((value) => value.isChecked === false).length;
}

export const todoFunction = {
  getUserTime,
  setLoocalStorage,
  getLoocalStorage,
  calculateTasksCompleted,
  calculateTasksActive,
};
