// Import CSS
import "./Checkbox.css";
import "./TodoItem.css";
// Import React icon
import { FaTrash } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { useAppContext } from "../Context/AppProvider";
import { FaFlag } from "react-icons/fa";

const TodoItem = (props) => {
  const { name, id, isCompleted, isImportant, isDeleted, selectedTodoID } =
    props;
  const { handleCompleteChange, handleShowSidebar, handleToggleDeleteTodo } =
    useAppContext();
  return (
    <div
      style={{
        marginTop: isDeleted ? "20px" : "",
      }}
      className={`todo-item ${selectedTodoID == id ? "open" : ""}`}
      onClick={() => {
        handleShowSidebar(id);
      }}
    >
      <div className="todo-input">
        <div className="todo-itemContent">
          {!isDeleted && (
            <input
              className={`round-checkbox ${selectedTodoID == id ? "open" : ""}`}
              type="checkbox"
              checked={isCompleted}
              onChange={() => handleCompleteChange(id)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="todoItemHead">
            <p
              style={{ textDecoration: isCompleted ? "line-through" : "none" }}
              className="todo-item-text"
            >
              {name}
            </p>
            <p>
              {isImportant ? <FaFlag className="important-icon"></FaFlag> : ""}{" "}
            </p>
          </div>
        </div>
        {!isDeleted ? (
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              handleToggleDeleteTodo(id);
            }}
            className={`trash-icon ${selectedTodoID == id ? "open" : ""}`}
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
