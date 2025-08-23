import { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import "./Checkbox.css";
// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = (props) => {
  // Destructuring from props
  const { todoItem, showSidebar, handleChangeItem, setShowSidebar, disabled } =
    props;

  // State save value input
  const [name, setName] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // re-render state
  useEffect(() => {
    if (todoItem) {
      setName(todoItem.name);
      setIsImportant(todoItem.isImportant);
      setIsCompleted(todoItem.isCompleted);
    }
  }, [todoItem]);

  // Input ref
  const inputRef = useRef(null);

  // Function to show success
  const showToastSuccess = () => {
    toast.success("Completed to update Todo", {
      style: { fontFamily: "Cabin, sans-serif" },
    });
  };

  // Function to show error
  const showToastError = () => {
    toast.error("Please fill out this field", {
      style: { fontFamily: "Cabin, sans-serif" },
    });
  };

  // Function handle to save Todo
  const handleSaveTodo = () => {
    if (!name.trim()) {
      showToastError();
      inputRef.current.focus();
      return;
    }
    const newTodo = { ...todoItem, name, isImportant, isCompleted };
    setShowSidebar(false);
    handleChangeItem(newTodo);
    showToastSuccess();
  };

  // Function handle close sidebar
  const handleCancel = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <ToastContainer position="bottom-left" />
      {!disabled && (
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
            <div className="sb-field-inputImportant">
              <label htmlFor="sb-name">Is important ?</label>
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
              <label htmlFor="sb-name">Is complete ?</label>
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
