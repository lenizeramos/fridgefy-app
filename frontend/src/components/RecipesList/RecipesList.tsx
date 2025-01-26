import "./RecipesList.scss";
import { useState } from "react";
import { useRecipesContext } from "../../context/RecipesContext";
import Recipe from "../Recipe/Recipe";
import Filters from "../Filters/Filters";
import { SignedIn } from "@clerk/clerk-react";
import WishList from "../WishList/WishList";
import MyFridgeComponent from "../MyFridgeComponent/MyFridgeComponent";

function RecipesList() {
  const { state } = useRecipesContext();
  const [filters, setFilters] = useState({
    searchTerm: "",
    tags: "",
    mealsType: "",
    cuisines: "",
    difficulty: "",
  });

  const filteresRecipes = state.recipes.filter((recipe) => {
    const matchesSearchTerm = recipe.name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesTags = filters.tags
      ? recipe.tags.some((tag) => tag === filters.tags)
      : true;
    const matchesMealsType = filters.mealsType
      ? recipe.mealType.some((type) => type === filters.mealsType)
      : true;
    const matchesCuisines = filters.cuisines
      ? recipe.cuisine === filters.cuisines
      : true;
    const matchesDifficulty = filters.difficulty
      ? recipe.difficulty === filters.difficulty
      : true;

    return (
      matchesSearchTerm &&
      matchesTags &&
      matchesMealsType &&
      matchesCuisines &&
      matchesDifficulty
    );
  });
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
    <>
      <div className="mainContainer">
        <MyFridgeComponent />
        <section className="recipes">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <div className="recipeContainer">
            {filteresRecipes.length > 0 ? (
              filteresRecipes.map((recipe) => {
                return <Recipe key={recipe.id} recipe={recipe} />;
              })
            ) : (
              <div className="tryAgain">
                <h2 className="notFound">No recipes found</h2>
                <span className="loader"></span>
              </div>
            )}
          </div>
        </section>
        <section className="wishList">
          <SignedIn>
            <WishList />
          </SignedIn>
        </section>
      </div>
    </>
  );
}

export default RecipesList;
