// Hooks
import { createContext, useContext, useState } from "react";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

import { useLocalStorage } from "@uidotdev/usehooks";

const AppProvider = ({ children }) => {
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);

  // State Todo list
  const [todoList, setTodoList] = useLocalStorage("todos", [
    {
      id: 1,
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: 1,
    },
    {
      id: 2,
      name: "Đi học võ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: 2,
    },
    {
      id: 3,
      name: "Đi ngủ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: 2,
    },
  ]);

  // State Categories list
  const [categories, setCategories] = useLocalStorage("categories", [
    {
      id: 2,
      label: "Personal",
    },
    {
      id: 1,
      label: "Uncategorized",
    },
  ]);

  // Sidebar open/close state
  const [showSidebar, setShowSidebar] = useState(false);

  // State select Todo id for show in the sidebar
  const [selectTodoID, setSelectTodoID] = useState();

  // Selected Filter id State
  const [selectedFilterID, setSelectedFilterID] = useState("all");

  // Search Todo state
  const [searchTodo, setSearchTodo] = useState("");

  // Deleted view state
  const [isDeletedView, setIsDeletedView] = useState(false);

  // Selected todo item (shown in sidebar)
  const todoItem = todoList.find((todo) => todo.id == selectTodoID);

  // Selected category item (shown in sidebar)
  const categoryItem = categories.find((cate) => cate.id == selectedCategoryID);

  // selected categoryLabel
  const categoryLabel = categories.find(
    (cate) => cate.id === selectedCategoryID
  )?.label;

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

  const handleUpdateCategory = (newCate) => {
    const newCateList = categories.map((cate) => {
      if (cate.id === newCate.id) {
        return newCate;
      }
      return cate;
    });
    setCategories(newCateList);
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

  // Function show notification (toast)
  const showNotification = (message, type) => {
    if (type == true) {
      toast.success(message, {
        style: {
          fontFamily: "Cabin, sans-serif",
          fontWeight: "bolder",
          color: "black",
        },
      });
    } else {
      toast.error(message, {
        style: {
          fontFamily: "Cabin, sans-serif",
          fontWeight: "bolder",
          color: "black",
        },
      });
    }
  };

  // Function handle remove and undo Todo
  const handleToggleDeleteTodo = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = { ...todo, isDeleted: !todo.isDeleted };
        if (updatedTodo.isDeleted) {
          showNotification("Todo deleted", true);
        } else {
          showNotification("Todo restored", true);
        }
        return updatedTodo;
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  // Function handle Delete Category
  const handleDeleteCategory = (cateID) => {
    if (cateID === 1) {
      showNotification("This category is default, cannot be deleted", false);
      return;
    }
    setTodoList(
      todoList.map((todo) => {
        return todo.category == cateID ? { ...todo, category: 1 } : todo;
      })
    );
    setCategories(
      categories.filter((cate) => {
        return cate.id !== cateID;
      })
    );
    showNotification("Category has been deleted", true);
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategoryID,
        setSelectedCategoryID,
        todoList,
        setTodoList,
        searchTodo,
        setSearchTodo,
        selectTodoID,
        setSelectTodoID,
        selectedFilterID,
        setSelectedFilterID,
        showSidebar,
        setShowSidebar,
        todoItem,
        isDeletedView,
        setIsDeletedView,
        handleChangeItem,
        handleCompleteChange,
        handleShowSidebar,
        handleToggleDeleteTodo,
        categories,
        setCategories,
        showNotification,
        categoryLabel,
        handleDeleteCategory,
        categoryItem,
        handleUpdateCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
