import { useRecipesContext } from "../../context/RecipesContext";
import "./RecipesList.scss";
import Recipe from "../Recipe/Recipe";
import Filters from "../Filters/Filters";
import Fridge from "../Fridge/Fridge";
import { SignedIn } from "@clerk/clerk-react";
import { FridgeProvider } from "../../context/FridgeContext";
import WishList from "../WishList/WishList";

function RecipesList() {
  const { state } = useRecipesContext();
  
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
