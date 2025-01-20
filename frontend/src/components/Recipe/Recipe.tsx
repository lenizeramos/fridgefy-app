import { Recipes, useRecipesContext } from "../../context/RecipiesContext";
import "./Recipe.scss";

function Recipe({ recipe }: { recipe: Recipes }) {
  //   const { state, dispatch } = useRecipesContext();

  return (
    <>
      <div className="recipeBox">
        <div className="recipeImg">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="recipeName">
          <h3>{recipe.name}</h3>
          <div className="buttonContainer">
            <button className="details">DETAILS</button>
            <button className="icon">
              <i className="bx bx-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
