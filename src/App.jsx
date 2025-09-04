import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage on first render
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const todoArray = JSON.parse(todoString);
        setTodos(todoArray);
      } catch (e) {
        console.error("Failed to parse todos from localStorage", e);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage
  const saveToLs = (todosArray) => {
    localStorage.setItem("todos", JSON.stringify(todosArray));
  };

  const handleAdd = () => {
    if (!todo.trim()) return; // prevent adding empty todos
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    setTodo("");
    saveToLs(updatedTodos); // pass updated array
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    if (!t) return;
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleDelete = (e, id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-3xl bg-gradient-to-br from-purple-200 to-purple-400 p-6 rounded-2xl my-5 min-h-[80vh] shadow-lg">
        <h1 className='flex justify-center font-bold text-2xl mb-4 text-purple-900 '>Manage your tasks at one place</h1>
        {/* Add Todo Section */}
        <div className="addTodo flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="flex-1 p-3 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Enter your todo..."
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-purple-800 disabled:bg-purple-500 hover:bg-purple-950 px-6 py-2 text-white rounded-lg shadow-md transition"
          >
            Save
          </button>
        </div>

        {/* Toggle finished tasks */}
        <div className="flex items-center mt-5">
          <input
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="w-4 h-4"
          />
          <label htmlFor="show" className="ml-2 text-sm">
            Show Finished
          </label>
        </div>
        <div className="h-[1px] bg-black opacity-20 w-full my-4"></div>

        {/* Todo List */}
        <h1 className="text-2xl font-bold mb-4 text-purple-900 ">Your Todos</h1>
        <div className="todos space-y-3">
          {todos.length === 0 && (
            <div className="my-5 font-light text-gray-700">No todos added yet</div>
          )}

          {todos.map(
            (item) =>
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-3 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-5 h-5"
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "line-through text-gray-500 break-all whitespace-normal"
                          : "text-gray-800 break-all whitespace-normal"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex mt-3 sm:mt-0">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 text-white rounded-lg mx-1 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 text-white rounded-lg mx-1 transition"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
