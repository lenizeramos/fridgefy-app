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
  const [filteredRecipes, setFilteredRecipes] = useState<Recipes[]>(
    state.recipes
  );
  const [selectedValue, setSelectedValue] = useState<string[] | undefined>(
    undefined
  );

  console.log("select value from recipelist", selectedValue);

  const searchRecipes = (search: string) => {
    const filtered = state.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    if (state.recipes && state.recipes.length > 0) {
      setFilteredRecipes(state.recipes);
      console.clear();
      console.log("filteredRecipes", filteredRecipes);
    }
  }, [state.recipes]);

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
            onFilter={searchRecipes}
            onClickSelectValue={setSelectedValue}
          />
          <div className="recipeContainer">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => {
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
