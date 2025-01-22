import { useFridgeContext } from "../../context/FridgeContext";
import AddToFridge from "../AddToFridge/AddToFridge";
import FridgeIngredients from "../FridgeIngredients/FridgeIngredients";
import "./Fridge.scss";

const Fridge = () => {
  const { state } = useFridgeContext();
  console.log(state.ingredients);


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
        <FridgeIngredients/>
      </div>
    </>
  );
};

export default Fridge;
