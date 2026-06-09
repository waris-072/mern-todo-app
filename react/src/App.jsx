import { useEffect, useState } from "react";
import "./App.css";

function App(){
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const BASE_URL = import.meta.env.VITE_API_URL;
  //backend is deployed on railway. You can also run it locally by changing the BASE_URL to "http://localhost:5000"

  const fetchTodos = () =>{
    fetch(`${BASE_URL}/todos`)
    .then(res => res.json())
    .then(data => setTodos(data));
  }
  useEffect(()=>{
    fetchTodos();
  },[]);

  //Add todo
const addTodo = () => {
  if (!title.trim()) return;

  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ title })
  })
  .then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  })
  .then((newTodo) => {
    setTodos(prev => [...prev, newTodo]);
    setTitle("");
  })
  .catch(err => {
    console.log("Error:", err.message);
  });
};

  //Delete todo
  const dltTodo = (id) =>{
    fetch(`${BASE_URL}/todos/${id}`,{
      method:"DELETE"
    })
    .then(res => res.json())
    .then(() => {
      setTodos(prev => prev.filter(todo => todo._id !== id));
    });
  }

  //update Todo
  const updateTodo = () =>{

    fetch(`${BASE_URL}/todos/${editId}`,{
      method:"PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({title})
    })
    .then(res => res.json())
    .then((updatedTodo) => {
      setTodos(prev =>
        prev.map(todo =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );

      setEditId(null);
      setTitle("");
    });
  };

  //toggle todo
  const toggleTodo = (id) =>{
    fetch(`${BASE_URL}/todos/toggle/${id}`,{
      method:"PUT"
    })
    .then(res => res.json())
    .then((toggledTodo) => {
      setTodos(prev =>
        prev.map(todo => todo._id === toggledTodo._id ? toggledTodo : todo)
      );
    });
  };

  const fileteredTodos = todos.filter(todo => {
    if(filter === "completed") return todo.completed;
    if(filter === "pending") return !todo.completed;
    return true;
  })


  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-group">
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}     
          placeholder="Enter Todo"
        />
        <button className="addBtn" onClick={editId? updateTodo : addTodo}> 
          {editId? "Update" : "Add"} 
        </button>
      </div>

      
      <select className="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <ul className="todo-list">
        {[...fileteredTodos]
          .sort((a, b) => a.completed - b.completed)
          .map(todo => (
            <li key={todo._id} 
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={()=> toggleTodo(todo._id)}
              />
              <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo?.title ? todo.title.toUpperCase() : "INVALID TODO"}</span>

              <div className="actions">
                <button onClick={()=> {setEditId(todo._id); setTitle(todo.title);}}>
                  Edit
                </button>
                <button onClick={()=> dltTodo(todo._id)}>Delete</button>
              </div>
            </li>
        ))}
      </ul>

    </div>
  )
}

export default App;