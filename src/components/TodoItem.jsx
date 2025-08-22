import React from "react";
import "./Checkbox.css";
const TodoItem = (props) => {
  const {
    name,
    id,
    isImportant,
    isCompleted,
    handleCompleteChange,
    handleShowSidebar,
    selectedTodoID,
  } = props;

  return (
    <div
      className={`todo-item ${selectedTodoID == id ? "open" : ""}`}
      onClick={() => {
        handleShowSidebar(id);
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <input
          className={`round-checkbox ${selectedTodoID == id ? "open" : ""}`}
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            handleCompleteChange(id);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <p className="todo-item-text">{name}</p>
      </div>
      {isImportant && <p>🔴</p>}
    </div>
  );
};

export default TodoItem;
