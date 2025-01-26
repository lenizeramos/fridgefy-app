import { useState } from "react";
import { useRecipesContext } from "../../context/RecipesContext";
import "./Filters.scss";

type FiltersProps = {
  filters: {
    searchTerm: string;
    tags: string;
    mealsType: string;
    cuisines: string;
    difficulty: string;
  };
  onFilterChange: (key: string, value: string) => void;
};

function Filters({ filters, onFilterChange }: FiltersProps) {
  const { state } = useRecipesContext();
  const [tagSize, setTagSize] = useState(1);
  const [mealTypeSize, setMealTypeSize] = useState(1);
  const [cuisineSize, setCuisineSize] = useState(1);
  const [differentSize, setDifferentSize] = useState(1);

  const handleSize = (
    setSizeFn: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setSizeFn((prevSize) => (prevSize === 1 ? 5 : 1));
  };
  const handleDifferentSize = (
    setSizeFn: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setSizeFn((prevSize) => (prevSize === 1 ? 3 : 1));
  };

  const handleBlur = () => {
    setTagSize(1);
    setCuisineSize(1);
    setMealTypeSize(1);
    setDifferentSize(1);
  };

  return (
    <>
      <div className="topContainer">
        <input
          type="text"
          name=""
          id="searchRecipes"
          value={filters.searchTerm}
          placeholder="Search Recipes"
          onChange={(e) => onFilterChange("searchTerm", e.target.value)}
        />
        <i className="bx bx-search-alt"></i>
        <div className="filters">
          <div className="tagsSelect">
            <label htmlFor="tags-select">Tags</label>
            <select
              name="tags"
              id="tags-select"
              size={tagSize}
              value={filters.tags}
              onClick={() => handleSize(setTagSize)}
              onBlur={handleBlur}
              onChange={(e) => onFilterChange("tags", e.target.value)}
            >
              <option value="">All Tags</option>
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
            <label htmlFor="types-select">Meal Types</label>
            <select
              name="mealsType"
              id="types-select"
              value={filters.mealsType}
              size={mealTypeSize}
              onClick={() => handleSize(setMealTypeSize)}
              onBlur={handleBlur}
              onChange={(e) => onFilterChange("mealsType", e.target.value)}
            >
              <option value="">All Meal Types</option>
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
            <label htmlFor="cuisines-select">Cuisines</label>
            <select
              name="cuisines"
              id="cuisines-select"
              value={filters.cuisines}
              size={cuisineSize}
              onClick={() => handleSize(setCuisineSize)}
              onBlur={handleBlur}
              onChange={(e) => onFilterChange("cuisines", e.target.value)}
            >
              <option value="">All Cuisines</option>
              {state.cuisines.map((cuisine) => {
                return (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="difficultySelect">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select
              name="difficulty"
              id="difficulty-select"
              value={filters.difficulty}
              size={differentSize}
              onClick={() => handleDifferentSize(setDifferentSize)}
              onBlur={handleBlur}
              onChange={(e) => onFilterChange("difficulty", e.target.value)}
            >
              <option value="">All difficulties</option>
              {state.difficulty.map((dif) => {
                return (
                  <option key={dif} value={dif}>
                    {dif}
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
