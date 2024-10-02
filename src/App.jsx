import { useState, useEffect } from 'react';
import { ToDoProvider } from './contexts';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('dark'); // Theme state: 'light' or 'dark'

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevToDo) => (prevToDo.id === id ? { id, ...todo } : prevToDo))
    );
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevToDo) =>
        prevToDo.id === id ? { ...prevToDo, completed: !prevToDo.completed } : prevToDo
      )
    );
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const progressPercentage = totalTodos ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <ToDoProvider value={{ todos, addToDo, updateToDo, toggleComplete, deleteToDo }}>
      <div
        className={`min-h-screen py-8 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-pink text-black'
        }`}
      >
        <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center">Your Todo List</h1>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`py-2 px-4 rounded-lg transition duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-00 text-white hover:bg-black'
                  : 'bg-gray-300 text-black hover:bg-gray-200'
              }`}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-600 h-2 mb-6 rounded-lg">
            <div
              className="bg-green-500 h-full rounded-lg transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="mb-8">
            <TodoForm />
          </div>

          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
