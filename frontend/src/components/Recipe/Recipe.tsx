import { useState, useEffect } from "react";
import { Recipes, useRecipesContext } from "../../context/RecipiesContext";
import { RecipeModal } from "../RecipeModal/RecipeModal";
import "./Recipe.scss";
import { SignedOut, useAuth, SignedIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Recipe({ recipe }: { recipe: Recipes }) {
  const { state, dispatch, addFunction } = useRecipesContext();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipes>();
  const { getToken } = useAuth();

  const handleAddWishList = async (id: number) => {
    const foundRecipe = state.recipes.find((recipe) => recipe.id === id);
    setSelectedRecipe(foundRecipe);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedRecipe) {
      const fetchRecipe = async () => {
        try {
          const token = await getToken();
          console.log(token);
          addFunction(selectedRecipe, token);
          console.log(selectedRecipe);
        } catch (error) {
          console.error((error as Error).message);
        }
      };
      fetchRecipe();
    }
  }, [selectedRecipe]);

  return (
    <>
      <div className="recipeBox">
        <div className="recipeImg">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="recipeName">
          <h3>{recipe.name}</h3>
          <div className="buttonContainer">
            <SignedOut>
              <Link to="/signin">
                <button className="details">DETAILS</button>
              </Link>
              <Link to="/signin">
                <button className="icon" aria-label="Add to wishlist">
                  <i className="bx bx-plus"></i>
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <button className="details" onClick={handleOpenModal}>
                DETAILS
              </button>
              <button
                className="icon"
                aria-label="Add to wishlist"
                onClick={() => handleAddWishList(recipe.id)}
              >
                <i className="bx bx-plus"></i>
              </button>
            </SignedIn>
          </div>
        </div>
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipe={recipe}
      />
    </>
  );
}

export default Recipe;
