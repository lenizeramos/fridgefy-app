import { useRecipesContext } from "../../context/RecipiesContext";
import "./RecipesList.scss";
import Recipe from "../Recipe/Recipe";
import Filters from "../Filters/Filters";

function RecipesList() {
  const { state } = useRecipesContext();
  return (
    <>
      <div className="mainContainer">
        <section className="fridge">
          <div></div>
        </section>
        <section className="recipes">
          <Filters />
          <div className="recipeContainer">
            {state.recipes.map((recipe) => {
              return <Recipe key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </section>
        <section className="wishList"></section>
      </div>
    </>
  );
}

export default RecipesList;
