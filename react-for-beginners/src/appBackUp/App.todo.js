import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = (event) => setTodo(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if(todo === "") {
      return;
    }
    setTodos((currentArray) => [todo, ...currentArray]);
    setTodo("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>My To Dos ({todos.length})</h1>
        <input value={todo} onChange={onChange} type="text" placeholder="Write a to-do" />
        <button>Add</button>
      </form>
      <hr/>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;