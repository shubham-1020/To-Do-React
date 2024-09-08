// TodoItem.js
import React, { useState } from 'react';
import { useToDo } from '../contexts';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [ToDoMsg, setTodoMsg] = useState(todo.todo);
  const { updateToDo, deleteToDo, toggleComplete } = useToDo();

  const editToDo = () => {
    updateToDo(todo.id, { ...todo, todo: ToDoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center justify-between border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 shadow-lg text-white ${
        todo.completed ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          className="cursor-pointer accent-green-500"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`text-lg bg-transparent outline-none ${
            todo.completed ? 'line-through text-gray-400' : ''
          } ${isTodoEditable ? 'border-b-2 border-green-400' : ''}`}
          value={ToDoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>

      <div className="flex space-x-2">
        <button
          className="p-2 bg-blue-500 rounded-lg hover:bg-blue-500 transition-all duration-200"
          onClick={() => {
            if (isTodoEditable) {
              editToDo();
            } else setIsTodoEditable((prev) => !prev);
          }}
        >
          {isTodoEditable ? 'Save' : 'Edit'}
        </button>
        <button
          className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
          onClick={() => deleteToDo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
