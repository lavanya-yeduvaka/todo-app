import React, { useState } from 'react';
import './App.css';

function TodoItem({ text, count, onDelete, onUpdate }) {
  return (
    <div className="todo-item">
      <span>{`${text} ${count > 0 ? `(changed ${count} times)` : `(updated ${count} times)`}`}</span>
      <span className="edit-icon" onClick={onUpdate}>✎</span>
      <span className="delete-icon" onClick={onDelete}>❌</span>
    </div>
  );
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    const parsedInput = inputValue.match(/^(.*?)\s?(\d+)?$/);
    const task = parsedInput[1];
    const quantity = parseInt(parsedInput[2], 10) || 1;

    const newTodos = [...todos];
    for (let i = 0; i < quantity; i++) {
      newTodos.push({ text: task, count: 0 });
    }

    setTodos(newTodos);
    setInputValue('');
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleUpdate = (index) => {
    const newTodos = [...todos];
    const deletedCount = todos.filter((todo, idx) => idx !== index && todo.text === newTodos[index].text).length;
    newTodos[index].count = deletedCount;
    setTodos(newTodos);
  };

  return (
    <div className='todos-bg-container'>
      <div className="todo_app-container">
        <h1 className='todos-heading'>Day Goals</h1>
        <div>
          <input className='todo-user-input' type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a Todo" /><br></br>
          <button className='button' onClick={addTodo}>Add Todo</button>
        </div>
        <div className="todo-list">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              text={todo.text}
              count={todo.count}
              onDelete={() => handleDelete(index)}
              onUpdate={() => handleUpdate(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
