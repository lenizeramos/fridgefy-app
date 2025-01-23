import { useState, useEffect } from "react";
import { Recipes, useRecipesContext } from "../../context/RecipiesContext";
import { RecipeModal } from "../RecipeModal/RecipeModal";
import "./Recipe.scss";

function Recipe({ recipe }: { recipe: Recipes }) {
  const { state, dispatch } = useRecipesContext();
  const [ selectedRecipe, setSelectedRecipe ] = useState<Recipes>()

  const handleAddWishList = async (id: number) => {
    const foundRecipe = state.recipes.find((recipe) => recipe.id === id)
    setSelectedRecipe(foundRecipe)
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
      dispatch({ type: "addWishList", payload: selectedRecipe });
      console.log(selectedRecipe)
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
