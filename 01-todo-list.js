/*

Conventions around Actions and Resourceful Routing

C - Create
R - Read
U - Update
D - Delete

B - Browse    GET /todos
R - Read      GET /todos/:id
E - Edit      POST /todos/:id
A - Add       POST /todos
D - Delete    POST /todos/:id/delete

Increment      POST /counter/:id/incrmeent
Decrement      POST /counter/:id/decrement
Reset      POST /counter/:id/reset
Set      POST /counter/:id/set/:value
*/

const todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(todo) {
  todos.push(todo);
}

function removeTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(idx, 1);
}

function updateTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function viewTodos() {
  return `<h1>Todos:</h1>
  <ul>
  ${todos.map((todo, idx) => `
    <li style='display: flex;'>
      <span>${todo} [${idx}]</span>
      <form method='POST' action='/todos/${idx}/delete'><button>🚮</button></form>
      <form method='POST' action='/todos/${idx}'>
        <input name='editedTodoText' value='${todo}'/>
        <button>✏️</button>
      </form>
    </li>
  `).join('\n')}
  </ul>
  <form method='POST' action='/todos'/>
    <input name='newTodoText'>
    <button>➕</button>
  </form>
  `;
}

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => { response.send(viewTodos()) });
app.post('/todos', (request, response) => {
  // const newTodoText = request.body.newTodoText;
  const { newTodoText } = request.body;
  addTodo(newTodoText);
  response.redirect('/');
});

app.post('/todos/:id', (request, response) => {
  // const newTodoText = request.body.newTodoText;
  const { id } = request.params;
  const { editedTodoText } = request.body;
  updateTodo(id, editedTodoText);
  response.redirect('/');
});

app.post('/todos/:id/delete', (request, response) => {
  // const id = request.params.id;
  const { id } = request.params;
  removeTodo(id);
  response.redirect('/');
});

app.listen(8080);
