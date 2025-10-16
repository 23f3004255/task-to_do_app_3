document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  }

  function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    const todos = getTodos();
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;
      span.onclick = function() {
        toggleTodo(idx);
      };

      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = 'Delete';
      delBtn.onclick = function(e) {
        e.stopPropagation();
        deleteTodo(idx);
      };

      li.appendChild(span);
      li.appendChild(delBtn);
      todoList.appendChild(li);
    });
  }

  function addTodo(text) {
    const todos = getTodos();
    todos.push({text: text, completed: false});
    setTodos(todos);
    renderTodos();
  }

  function toggleTodo(idx) {
    const todos = getTodos();
    todos[idx].completed = !todos[idx].completed;
    setTodos(todos);
    renderTodos();
  }

  function deleteTodo(idx) {
    const todos = getTodos();
    todos.splice(idx, 1);
    setTodos(todos);
    renderTodos();
  }

  todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      addTodo(text);
      todoInput.value = '';
      todoInput.focus();
    }
  });

  renderTodos();
});
