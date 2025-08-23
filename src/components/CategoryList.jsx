import "./CategoryList.css";
const CategoryList = (props) => {
  const { CATEGORY_LIST } = props;
  return (
    <div style={{ marginTop: "50px" }}>
      <p style={{ marginBottom: "10px", color: "#616161", fontSize: "18px" }}>
        Categories
      </p>
      <div className="category-grids">
        {CATEGORY_LIST.map((data) => {
          return (
            <div key={data.id} className="category-item">
              <div className="category-text">
                <img src="/images/folder.svg" alt="" />
                <p>{data.label}</p>
              </div>
              <p className="category-amount">2</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
