import { useRecipesContext } from "../../context/RecipiesContext";
import "./Filters.scss";

function Filters() {
  return (
    <>
      <div className="topContainer">
        <input
          type="text"
          name=""
          id="searchRecipes"
          placeholder="Search Recipes"
        />
        <i className='bx bx-search-alt'></i>
        <div className="filters">
          <div className="tags">
            <h4>Tags</h4>
            <select name="tags" id="tags-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="types">
            <h4>Meal Types</h4>
            <select name="types" id="types-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="cuisine">
            <h4>Cuisines</h4>
            <select name="cuisines" id="cuisines-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
