import { useState } from "react";
import { useRecipesContext } from "../../context/RecipiesContext";
import "./Filters.scss";

function Filters() {
  const { state } = useRecipesContext();
  const [size, setSize] = useState(1);
  const [searchRecipe, setSearchRecipes] = useState("");

  const handleSize = () => {
    setSize((prevSize) => (prevSize === 1 ? 5 : 1));
  };
  const handleBlur = () => {
    setSize(1);
  };

  const searchRecipes = () => {};

  return (
    <>
      <div className="topContainer">
        <input
          type="text"
          name=""
          id="searchRecipes"
          placeholder="Search Recipes"
        />
        <i className="bx bx-search-alt"></i>
        <div className="filters">
          <div className="tags">
            <h4>Tags</h4>
            <select
              name="tags"
              id="tags-select"
              size={size}
              onClick={handleSize}
              onBlur={handleBlur}
            >
              <option value="0">All Tags</option>
              {state.tags.map((tag) => {
                return (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="types">
            <h4>Meal Types</h4>
            <select name="types" id="types-select">
              <option value="0">All Meal Types</option>
              {state.mealsType.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="cuisine">
            <h4>Cuisines</h4>
            <select name="cuisines" id="cuisines-select">
              <option value="0">All Cuisines</option>
              {state.cuisines.map((cuisine) => {
                return (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
