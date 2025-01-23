import "./RecipesList.scss";
import { useState } from "react";
import { useRecipesContext } from "../../context/RecipiesContext";
import Recipe from "../Recipe/Recipe";
import Filters from "../Filters/Filters";

function RecipesList() {
  const { state } = useRecipesContext();
  const [filteredRecipes, setFilteredRecipes] = useState(state.recipes);

  const searchRecipes = (search: string) => {
    const filtered = state.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  // const filterhRecipes = (value: string, filter: string) => {
    
  // }

  return (
    <>
      <div className="mainContainer">
        <section className="fridge">
          <div></div>
        </section>
        <section className="recipes">
          <Filters onFilter={searchRecipes} />
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
        <section className="wishList"></section>
      </div>
    </>
  );
}

export default RecipesList;
