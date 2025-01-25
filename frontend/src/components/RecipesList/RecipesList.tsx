import "./RecipesList.scss";
import { useEffect, useState } from "react";
import { useRecipesContext, Recipes } from "../../context/RecipesContext";
import Recipe from "../Recipe/Recipe";
import Filters from "../Filters/Filters";
import Fridge from "../Fridge/Fridge";
import { SignedIn } from "@clerk/clerk-react";
import { FridgeProvider } from "../../context/FridgeContext";
import WishList from "../WishList/WishList";

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
        <section className="fridge">
          <SignedIn>
            <FridgeProvider>
              <Fridge />
            </FridgeProvider>
          </SignedIn>
        </section>
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
                <h2 className="noFound">No recipes found</h2>
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
