import { useEffect } from "react";
import { useRecipesContext } from "../../context/RecipiesContext";
import "./RecipesList.scss";

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
            return (<h1 key={recipe.id}>{recipe.name}</h1>);
          })}
        </div>
      </div>
    </>
  );
}

export default RecipesList;
