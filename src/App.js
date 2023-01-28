import React, {useState, useRef} from "react";
import TodoList from "./Todolist.js";
import {v4 as uuidv4} from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  function toggleTodos(id){
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id == id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function addTodo(e) {
    const name = todoNameRef.current.value;
    todoNameRef.current.value = null;
    if (name == "") return;
    setTodos((prevtodo) => {
      return [...prevtodo, {id: uuidv4(), name: name, complete: false}];
    })
  }

  function clearTodo(e) {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return(
    <>
    <TodoList todos={todos} toggleTodo={toggleTodos} />
    <input ref={todoNameRef} type="text" />
    <button onClick={addTodo}>Add Hero</button>
    <button onClick={clearTodo}>Clear Heroes</button>
    <div>{todos.filter((todo) => !todo.complete).length} number of heroes</div>
    </>
  );
}

export default App;