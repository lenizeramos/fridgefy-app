import { useState } from "react";
import AddToFridge from "../AddToFridge/AddToFridge";
import FridgeIngredients from "../FridgeIngredients/FridgeIngredients";
import "./Fridge.scss";

const Fridge = () => {
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };
  return (
    <>
      <div className="fridge-container">
        <h1 className="mb-3">My Fridge</h1>
        <div className="d-flex align-items-center justify-content-between">
          <div className="fridge-search-container">
            <input
              type="text"
              aria-label="Search Fridge"
              id="searchFridge"
              onChange={handleSearchChange}
              placeholder="Search Fridge"
              autoComplete="off"
            />
            <i className="bx bx-search-alt fridge-search-icon"></i>
          </div>
          <div>
            <AddToFridge />
          </div>
        </div>
        <FridgeIngredients searchWord={searchWord} />
      </div>
    </>
  );
};

export default Fridge;
