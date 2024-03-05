import React from "react";

import { fetchData, updateData, addDataToDatabase } from "../apis/apiCalls";

import "./App.css";

function App() {
  let [todo, setTodo] = React.useState("");
  let [todos, setTodos] = React.useState([]);

  const addTodo = (todo) => {
    if (!todo.trim()) return;

    let newTodo = {
      id: Date.now(),
      value: todo.trim(),
      isCompleted: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    addDataToDatabase([Date.now(), todo.trim(), false]);
    setTodo("");
  };

  const revomeItem = (id, index) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    // updateData(index + 1, [newTodos]);
  };

  const todoTodo = (id, index) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }

      return todo;
    });

    console.log("=======newTodos", newTodos);
    setTodos(newTodos);

    console.log(
      "Object.values(newTodos[index])",
      Object.values(newTodos[index])
    );

    updateData(index + 1, Object.values(newTodos[index]));
  };

  const loadTodos = async () => {
    // load the todos from the spreadsheet
    let response = await fetchData();
    response = response.splice(1);
    const todos = response.map((t) => ({
      id: parseInt(t[0]),
      value: t[1],
      isCompleted: t[2] === "TRUE",
    }));
    setTodos(todos);
  };

  React.useEffect(() => {
    console.log(`Loading todos...`);
    loadTodos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">Todos</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(todo);
          }}
        >
          <input
            className="todo-input"
            type="text"
            name="todo"
            placeholder="Add a todo"
            onChange={(e) => setTodo(e.target.value)}
            autoFocus
            value={todo}
          ></input>
          <button className="submit-btn" type="submit">
            Add
          </button>
        </form>
        <ul className="todos">
          {todos.map((todo, index) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => {
                  todoTodo(todo.id, index);
                }}
              />
              <span className={`todo ${todo.isCompleted ? "complete" : ""}`}>
                {todo.value}
              </span>
              <button
                className="delete-btn"
                type="button"
                onClick={() => {
                  revomeItem(todo.id, index);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
