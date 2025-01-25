import { useRecipesContext } from "../../context/RecipesContext";
import "./RecipesList.scss";
import Recipe from "../Recipe/Recipe";
import Filters from "../Filters/Filters";
import { SignedIn } from "@clerk/clerk-react";
import WishList from "../WishList/WishList";
import MyFridgeComponent from "../MyFridgeComponent/MyFridgeComponent";

function RecipesList() {
  const { state } = useRecipesContext();

  return (
    <>
      <div className="mainContainer">
        <MyFridgeComponent />
        <section className="recipes">
          <Filters />
          <div className="recipeContainer">
            {state.recipes.map((recipe) => {
              return <Recipe key={recipe.id} recipe={recipe} />;
            })}
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
