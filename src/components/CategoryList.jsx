// App Context
import { useAppContext } from "../Context/AppProvider";

// React Icons
import { FaFolderMinus, FaFolderPlus } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

// CSS
import "./CategoryList.css";

// Hooks
import { useEffect, useMemo, useState } from "react";

const CategoryList = (props) => {
  const {
    selectedCategoryID,
    setSelectedCategoryID,
    categories,
    setCategories,
    handleDeleteCategory,
    categoryItem,
    handleUpdateCategory,
    setShowSidebar,
    setSelectTodoID,
  } = useAppContext();
  const { todoList } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addNameCategory, setAddNameCategory] = useState("");
  const [nameCategory, setNameCategory] = useState(categoryItem?.label);

  // Function add Category
  const handleAddCategory = (e) => {
    const value = e.target.value;

    // Lấy số đã dùng
    const usedIndexes = categories
      .map((c) => {
        const match = c.label.match(/New Folder \((\d+)\)/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((n) => n !== null);

    // Tìm số nhỏ nhất chưa dùng
    let i = 0;
    while (usedIndexes.includes(i)) {
      i++;
    }

    setCategories([
      {
        id: crypto.randomUUID(),
        label: value === "" ? `New Folder (${i})` : addNameCategory,
      },
      ...categories,
    ]);

    setIsAdding(false);
  };

  // Function edit
  const handleEditCategory = (e) => {
    if (!nameCategory.trim()) {
      setIsEdit(false);
      return;
    }

    const newValue = e.target.value;
    const newCategory = { ...categoryItem, label: newValue };
    handleUpdateCategory(newCategory);
    setIsEdit(false);
  };

  // Function count Todo in Category
  const categoryCount = useMemo(() => {
    return todoList.reduce((acc, todo) => {
      if (!todo.isDeleted) {
        acc[todo.category] = (acc[todo.category] || 0) + 1;
      }
      return acc;
    }, {});
  }, [todoList]);

  // re-render state
  useEffect(() => {
    if (categoryItem) {
      setNameCategory(categoryItem?.label);
    }
  }, [categoryItem]);

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="category-heading">
        <p>Categories</p>

        <FaFolderPlus
          onClick={() => {
            setIsAdding(true);
          }}
          className="folder-icon"
        ></FaFolderPlus>
      </div>

      <div className="category-grids">
        {isAdding && (
          <div className="category-item">
            <div className="category-text">
              <img src="/images/folder.svg" alt="" />
              <input
                type="text"
                autoFocus
                placeholder="Enter folder name..."
                onChange={(e) => {
                  setAddNameCategory(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory(e);
                  }
                }}
              />
            </div>
          </div>
        )}

        {categories.map((data) => {
          return (
            <div
              onClick={() => {
                setSelectedCategoryID((prevId) =>
                  prevId === data.id ? null : data.id
                );
                setShowSidebar(false);
                setSelectTodoID(null);
              }}
              key={data.id}
              className={`category-item ${
                isEdit && selectedCategoryID === data.id
                  ? "" // nếu đang edit thì không open
                  : selectedCategoryID === data.id
                  ? "open"
                  : ""
              }`}
            >
              <div className="category-text">
                {selectedCategoryID == data.id ? (
                  <FaFolderOpen className="folder"></FaFolderOpen>
                ) : (
                  <FaFolder className="folder"></FaFolder>
                )}

                {isEdit && selectedCategoryID == data.id ? (
                  <input
                    type="text"
                    autoFocus
                    value={nameCategory}
                    placeholder="Enter folder name..."
                    onChange={(e) => {
                      setNameCategory(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditCategory(e);
                      }
                    }}
                  />
                ) : (
                  <p>{data.label}</p>
                )}

                <p
                  style={{
                    fontWeight: "bold",
                    color: isEdit
                      ? "#616161"
                      : selectedCategoryID == data.id
                      ? "white"
                      : "#616161",
                  }}
                >
                  ({categoryCount[data.id] || "0"})
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {data.id !== 1 && (
                  <FaEdit
                    onClick={(e) => {
                      setSelectedCategoryID(data.id);
                      setIsEdit(true);
                      e.stopPropagation();
                    }}
                    className={`folder-edit ${
                      selectedCategoryID == data.id ? "open" : ""
                    }`}
                  ></FaEdit>
                )}
                {data.id !== 1 && (
                  <FaFolderMinus
                    className={`folder-delete ${
                      selectedCategoryID == data.id ? "open" : ""
                    }`}
                    onClick={(e) => {
                      handleDeleteCategory(data.id);
                      e.stopPropagation();
                    }}
                  ></FaFolderMinus>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
