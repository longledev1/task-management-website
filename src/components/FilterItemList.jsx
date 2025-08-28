import { useAppContext } from "../Context/AppProvider";

const FilterItemList = (props) => {
  const { FILTER_ITEMS, countFilterType } = props;
  const {
    selectedFilterID,
    setSelectedFilterID,
    setShowSidebar,
    setSelectTodoID,
  } = useAppContext();
  return (
    <>
      {FILTER_ITEMS.map((filterItem) => {
        return (
          <div
            key={filterItem.id}
            className={`filter-item ${
              selectedFilterID === filterItem.id ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedFilterID(filterItem.id);
              setShowSidebar(false);
              setSelectTodoID(null);
            }}
          >
            <div className="filter-text">
              <img src={`images/${filterItem.icon}`} alt="" />
              <p>{filterItem.label}</p>
            </div>
            <p className="filter-amount">{countFilterType[filterItem.id]}</p>
          </div>
        );
      })}
    </>
  );
};

export default FilterItemList;
