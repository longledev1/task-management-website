// Hooks
import { useMemo } from "react";

// CSS
import "./FilterPanel.css";

// Component
import FilterItemList from "./FilterItemList";
import CategoryList from "./CategoryList";

// Context
import { useAppContext } from "../Context/AppProvider";

const FilterPanel = () => {
  // Filter items
  const FILTER_ITEMS = [
    {
      id: "all",
      label: "All",
      icon: "inbox.svg",
    },
    {
      id: "important",
      label: "Important",
      icon: "flag.svg",
    },
    {
      id: "completed",
      label: "Completed",
      icon: "tick.svg",
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: "delete.svg",
    },
  ];

  const { todoList, searchTodo, setSearchTodo } = useAppContext();

  const countFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted && !cur.isDeleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant && !cur.isDeleted) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      {
        all: todoList.filter((todo) => {
          return !todo.isDeleted;
        }).length,
        completed: 0,
        important: 0,
        deleted: 0,
      }
    );
  }, [todoList]);

  // Handle search Todo
  const handleSearchTodo = (e) => {
    setSearchTodo(e.target.value);
  };

  return (
    <div className="filter-panel">
      <div className="input-search">
        <img src="/images/search.svg" alt="search" className="icon-search" />
        <input
          type="text"
          className="search-task"
          value={searchTodo}
          placeholder="Search..."
          onChange={(e) => {
            handleSearchTodo(e);
          }}
        />
      </div>
      <div className="filters-grid">
        <FilterItemList
          FILTER_ITEMS={FILTER_ITEMS}
          countFilterType={countFilterType}
        ></FilterItemList>
      </div>
      {/* Category */}
      <CategoryList todoList={todoList}></CategoryList>
    </div>
  );
};

export default FilterPanel;
