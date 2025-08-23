// Import CSS
import "./Checkbox.css";
// Import React icon
import { FaTrash } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";

const TodoItem = (props) => {
  const {
    name,
    id,
    isImportant,
    isCompleted,
    isDeleted,
    handleCompleteChange,
    handleShowSidebar,
    selectedTodoID,
    handleToggleDeleteTodo,
  } = props;

  return (
    <div
      className={`todo-item ${selectedTodoID == id ? "open" : ""}`}
      onClick={() => {
        handleShowSidebar(id);
      }}
    >
      <div
        className="todo-input"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            className={`round-checkbox ${selectedTodoID == id ? "open" : ""}`}
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleCompleteChange(id)}
            onClick={(e) => e.stopPropagation()}
          />
          <p
            style={{ textDecoration: isCompleted ? "line-through" : "none" }}
            className="todo-item-text"
          >
            {name}
          </p>
        </div>
        {!isDeleted ? (
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              handleToggleDeleteTodo(id);
            }}
            className="trash-icon"
          />
        ) : (
          <FaUndo
            onClick={(e) => {
              e.stopPropagation();
              handleToggleDeleteTodo(id);
            }}
            className="trash-icon"
          />
        )}
      </div>
    </div>
  );
};

export default TodoItem;
