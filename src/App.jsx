import TodoItem from "./components/TodoItem";
import "./App.css";
import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Đi học thêm",
      isImportant: true,
      isCompleted: true,
    },
    {
      id: 2,
      name: "Đi học võ",
      isImportant: false,
      isCompleted: false,
    },
    { id: 3, name: "Đi ngủ", isImportant: true, isCompleted: false },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);

  const [selectTodoID, setSelectTodoID] = useState();

  const todoItem = todoList.find((todo) => todo.id == selectTodoID);

  // console.log(selectTodoID);

  // Ref
  const inputRef = useRef();

  const creatTodo = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      alert("Không có để chỗ này rỗng ok?");
      return;
    }
    setTodoList([
      {
        id: crypto.randomUUID(),
        name: value,
        isImportant: false,
        isCompleted: false,
      },
      ...todoList,
    ]);
    inputRef.current.value = "";
  };

  const handleCompleteChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleShowSidebar = (todoID) => {
    setShowSidebar(true);
    setSelectTodoID(todoID);
  };

  const handleChangeItem = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const todos = todoList.map((todo) => {
    return (
      <TodoItem
        name={todo.name}
        id={todo.id}
        isImportant={todo.isImportant}
        isCompleted={todo.isCompleted}
        handleCompleteChange={handleCompleteChange}
        handleShowSidebar={handleShowSidebar}
        selectedTodoID={selectTodoID}
        key={todo.id}
      ></TodoItem>
    );
  });

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        ref={inputRef}
        className="input-task"
        type="text"
        name="add-new-task"
        placeholder="Add new task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            creatTodo(e);
          }
        }}
      />

      <div>{todos}</div>
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        todoItem={todoItem}
        handleChangeItem={handleChangeItem}
      />
    </div>
  );
}

export default App;
