// Hooks
import { useEffect, useRef, useState } from "react";

// CSS
import "./Sidebar.css";
import "./Checkbox.css";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { useAppContext } from "../Context/AppProvider";

// React Icon
import { FaFlag } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";

const Sidebar = () => {
  const {
    todoItem,
    showSidebar,
    handleChangeItem,
    setShowSidebar,
    isDeletedView,
    showNotification,
    categories,
  } = useAppContext();

  // State save value input
  const [name, setName] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [category, setCategory] = useState();

  // re-render state
  useEffect(() => {
    if (todoItem) {
      setName(todoItem.name);
      setIsImportant(todoItem.isImportant);
      setIsCompleted(todoItem.isCompleted);
      setCategory(todoItem.category);
    }
  }, [todoItem]);

  // Input ref
  const inputRef = useRef(null);

  // Function handle to save Todo
  const handleSaveTodo = () => {
    if (!name.trim()) {
      showNotification("Please fill out this field", false);
      inputRef.current.focus();
      return;
    }
    const newTodo = { ...todoItem, name, isImportant, isCompleted, category };
    setShowSidebar(false);
    handleChangeItem(newTodo);
    showNotification("Updated Todo", true);
  };

  // Function handle close sidebar
  const handleCancel = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <ToastContainer position="bottom-left" />
      {!isDeletedView && (
        <div className={`sidebar ${showSidebar ? "open" : ""}`}>
          <form className="form" action="">
            <div className="sb-field-inputName">
              <label htmlFor="sb-name">Todo name</label>
              <input
                ref={inputRef}
                id="sb-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <label className="status" htmlFor="">
              Status
            </label>
            <div className="sb-field-inputImportant">
              <div className="sb-field-inputImportant-text">
                <FaFlag className="important-icon"></FaFlag>
                <label htmlFor="sb-name">Mark as important</label>
              </div>
              <input
                className="round-checkbox"
                id="sb-important"
                type="checkbox"
                checked={isImportant}
                onChange={() => {
                  setIsImportant(!isImportant);
                }}
              />
            </div>{" "}
            <div className="sb-field-inputComplete">
              <div className="sb-field-inputComplete-text">
                <IoIosCheckbox className="complete-icon"></IoIosCheckbox>
                <label htmlFor="sb-name">Mark as complete</label>
              </div>
              <input
                style={{ marginLeft: "4px" }}
                className="round-checkbox"
                id="sb-isComplete"
                type="checkbox"
                checked={isCompleted}
                onChange={() => {
                  setIsCompleted(!isCompleted);
                }}
              />
            </div>
            <div className="sb-field-inputCategory">
              <label className="" htmlFor="">
                Category
              </label>
              <br />
              <div className="custom-select">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </form>
          <div className="sb-footer">
            <button
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleSaveTodo();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
