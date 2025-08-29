// Component
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

// CSS
import "./App.css";

// Hooks
import { useEffect, useMemo, useRef } from "react";

// Context
import { useAppContext } from "./Context/AppProvider";

function App() {
  const {
    selectedCategoryID,
    todoList,
    setTodoList,
    searchTodo,
    selectTodoID,
    selectedFilterID,
    isDeletedView,
    setIsDeletedView,
    categoryLabel,
    itemSort,
    sortValue,
    setSortValue,
  } = useAppContext();

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
        category: selectedCategoryID ? selectedCategoryID : 1,
      },
      ...todoList,
    ]);
    inputRef.current.value = "";
  };

  // Todo map
  const filterTodo = useMemo(() => {
    let result = todoList.filter((todo) => {
      if (!todo.name.includes(searchTodo)) {
        return false;
      }
      if (selectedCategoryID && todo.category != selectedCategoryID) {
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
    switch (sortValue) {
      case "1": // all todo (giữ nguyên)
        return result;
      case "2": // sort important
        result = result.sort((a, b) => {
          return b.isImportant - a.isImportant;
        });
        break;
      case "3": // sort completed
        result = result.sort((a, b) => {
          return b.isCompleted - a.isCompleted;
        });
        break;
      default:
        break;
    }

    return result;
  }, [todoList, selectedFilterID, searchTodo, selectedCategoryID, sortValue]);

  useEffect(() => {
    if (selectedFilterID === "deleted") {
      setIsDeletedView(true);
    } else {
      setIsDeletedView(false);
    }
  }, [selectedFilterID, setIsDeletedView]);

  // Heading text
  const headingTextMap = {
    all: "All Todo",
    important: "Important Todo",
    completed: "Completed Todo",
    deleted: "Deleted Todo",
  };
  const headingText = headingTextMap[selectedFilterID] || "All Todo";

  return (
    <div className="container">
      {/* Left Sibar */}
      <FilterPanel></FilterPanel>

      {/* Main content */}
      <div className="main-content">
        <div>
          <span className="category-label">{`${
            categoryLabel ? `${categoryLabel} > ` : ""
          }`}</span>
          <span className="heading-text">{headingText}</span>
        </div>
        <div className="sort-todo">
          <select
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
            value={sortValue}
            name=""
            id=""
          >
            {itemSort.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
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
                isCompleted={todo.isCompleted}
                isImportant={todo.isImportant}
                isDeleted={todo.isDeleted}
                selectedTodoID={selectTodoID}
                key={todo.id}
              ></TodoItem>
            );
          })}
          <p style={{ fontSize: "16px", color: "#616161" }}>
            {filterTodo.length > 0
              ? ""
              : "No result, you can try again or add new task."}
          </p>
        </div>

        {/* Detail Todo-item (show in side-bar) */}
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
