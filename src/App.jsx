import TodoItem from "./components/TodoItem";
import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // State Todo list
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 2,
      name: "Đi học võ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 3,
      name: "Đi ngủ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
    },
  ]);

  // Sidebar open/close state
  const [showSidebar, setShowSidebar] = useState(false);

  // State select Todo id for show in the sidebar
  const [selectTodoID, setSelectTodoID] = useState();

  // Selected todo item (shown in sidebar)
  const todoItem = todoList.find((todo) => todo.id == selectTodoID);

  // Selected Filter id State
  const [selectedFilterID, setSelectedFilterID] = useState("all");

  // Search Todo state
  const [searchTodo, setSearchTodo] = useState("");

  // Deleted view state
  const [isDeletedView, setIsDeletedView] = useState(false);

  // Input ref
  const inputRef = useRef();

  // Function to create Todo
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

  // Function update completed Todo
  const handleCompleteChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // Function handle show side-bar
  const handleShowSidebar = (todoID) => {
    setShowSidebar(true);
    setSelectTodoID(todoID);
  };

  // Function handle remove and undo Todo
  const handleToggleDeleteTodo = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = { ...todo, isDeleted: !todo.isDeleted };

        if (updatedTodo.isDeleted) {
          toast.success("Todo deleted!", {
            position: "bottom-left",
            style: { fontFamily: "Cabin, sans-serif" },
          });
        } else {
          toast.success("Todo restored!", {
            position: "bottom-left",
            style: { fontFamily: "Cabin, sans-serif" },
          });
        }

        return updatedTodo;
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  // Function handle update Todo
  const handleChangeItem = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // Todo map
  const filterTodo = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchTodo)) {
        return false;
      }

      switch (selectedFilterID) {
        case "all":
          return !todo.isDeleted;
        case "important":
          return todo.isImportant && !todo.isDeleted;
        case "completed":
          return todo.isCompleted && !todo.isDeleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return !todo.isDeleted;
      }
    });
  }, [todoList, selectedFilterID, searchTodo]);

  useEffect(() => {
    if (selectedFilterID === "deleted") {
      setIsDeletedView(true);
    } else {
      setIsDeletedView(false);
    }
  }, [selectedFilterID]);

  // Heading text
  const headingTextMap = {
    all: "All Todo",
    important: "Important Todo",
    completed: "Completed Todo",
    deleted: "Deleted Todo",
  };

  const showToastUndo = () => {
    toast.success("Todo undoed!", {
      position: "bottom-left",
      style: { fontFamily: "Cabin, sans-serif" },
    });
  };

  const headingText = headingTextMap[selectedFilterID] || "All Todo";

  return (
    <div className="container">
      {/* Left Sibar */}
      <FilterPanel
        searchTodo={searchTodo}
        setSearchTodo={setSearchTodo}
        todoList={todoList}
        selectedFilterID={selectedFilterID}
        setSelectedFilterID={setSelectedFilterID}
      ></FilterPanel>

      {/* Main content */}
      <div className="main-content">
        <h1>{headingText}</h1>
        {isDeletedView ? (
          ""
        ) : (
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
        )}

        {/* Render todo */}
        <div>
          {filterTodo.map((todo) => {
            return (
              <TodoItem
                name={todo.name}
                id={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                isDeleted={todo.isDeleted}
                handleCompleteChange={handleCompleteChange}
                handleShowSidebar={handleShowSidebar}
                selectedTodoID={selectTodoID}
                handleToggleDeleteTodo={handleToggleDeleteTodo}
                showToastUndo={showToastUndo}
                key={todo.id}
              ></TodoItem>
            );
          })}
          <p style={{ fontSize: "16px", color: "#616161" }}>
            {filterTodo.length > 0 ? "" : "No result, please try again!"}
          </p>
        </div>

        {/* Detail Todo-item (show in side-bar) */}

        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          todoItem={todoItem}
          handleChangeItem={handleChangeItem}
          disabled={isDeletedView}
        />
      </div>
    </div>
  );
}

export default App;
