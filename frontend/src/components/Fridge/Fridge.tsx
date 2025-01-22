import AddToFridge from "../AddToFridge/AddToFridge";
import "./Fridge.scss";

const Fridge = () => {
  return (
    <>
      <div className="topContainerFridge">
        <h1 className="mb-3">My Fridge</h1>
        <div className="d-flex align-items-center justify-content-between">
          <div className="searchFridgeContainer">
            <input
              type="text"
              name=""
              id="searchFridge"
              placeholder="Search Fridge"
            />
            <i className="bx bx-search-alt search-icon"></i>
          </div>
          <div className="mb-3">
            <i className="bx bxs-file-plus fs-4"></i>
          </div>
        </div>
        <div>
          <AddToFridge />
        </div>
        <div className="ingredients">
          <ul className="list-unstyled">
            <li>item1</li>
            <li>item2</li>
            <li>item3</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Fridge;
