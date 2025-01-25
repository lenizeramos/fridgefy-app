import { useState } from "react";
import { useRecipesContext } from "../../context/RecipesContext";
import "./Filters.scss";

type FiltersProps = {
  onFilter: (search: string) => void;
  onClickSelectValue: (value: string[]) => void;
};

function Filters({ onFilter, onClickSelectValue }: FiltersProps) {
  const { state } = useRecipesContext();
  const [tagSize, setTagSize] = useState(1);
  const [mealTypeSize, setMealTypeSize] = useState(1);
  const [cuisineSize, setCuisineSize] = useState(1);
  const [searchRecipe, setSearchRecipes] = useState("");

  const handleSize = (
    setSizeFn: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setSizeFn((prevSize) => (prevSize === 1 ? 5 : 1));
  };

  const handleBlur = () => {
    setTagSize(1);
    setCuisineSize(1);
    setMealTypeSize(1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchRecipes(searchTerm);
    onFilter(searchTerm);
  };

  const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const getValue = [event.target.name, event.target.value];
    onClickSelectValue(getValue);
  };

  return (
    <>
      <div className="topContainer">
        <input
          type="text"
          name=""
          id="searchRecipes"
          value={searchRecipe}
          placeholder="Search Recipes"
          onChange={handleChange}
        />
        <i className="bx bx-search-alt"></i>
        <div className="filters">
          <div className="tagsSelect">
            <h4>Tags</h4>
            <select
              name="tags"
              id="tags-select"
              size={tagSize}
              onClick={() => handleSize(setTagSize)}
              onBlur={handleBlur}
              onChange={handleSelectValue}
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
          <div className="typesSelect">
            <h4>Meal Types</h4>
            <select
              name="mealsType"
              id="types-select"
              size={mealTypeSize}
              onClick={() => handleSize(setMealTypeSize)}
              onChange={handleSelectValue}
              onBlur={handleBlur}
              // onChange={handleSelectChange}
            >
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
          <div className="cuisineSelect">
            <h4>Cuisines</h4>
            <select
              name="cuisines"
              id="cuisines-select"
              size={cuisineSize}
              onClick={() => handleSize(setCuisineSize)}
              onBlur={handleBlur}
              onChange={handleSelectValue}
            >
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
