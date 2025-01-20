import { useEffect } from "react";
import { useRecipesContext } from "../../context/RecipiesContext";
import "./RecipesList.scss";
import Recipe from "../Recipe/Recipe";

function RecipesList() {
  const { state, fetchData } = useRecipesContext();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="mainContainer">
        <div className="recipeContainer">
          {state.recipes.map((recipe) => {
            return <Recipe key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
    </>
  );
}

export default RecipesList;
