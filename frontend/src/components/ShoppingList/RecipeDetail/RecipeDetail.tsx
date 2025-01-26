import { Accordion } from "react-bootstrap";
import "./RecipeDetail.scss";
import { useShoppingListContext } from "../../../context/ShoppingListContext";
import { SHOPPING_LIST_ACTIONS } from "../../../interfaces/ShoppingListInterface";
import { useRecipesContext } from "../../../context/RecipesContext";
import { useAuthService } from "../../../services/userAuthService";
import { useFridgeContext, fetchIngredients } from "../../../context/FridgeContext";
import { useEffect, useState } from "react";
import RecipeModal from "../../RecipeModal/RecipeModal";


function RecipeDetail() {
  const { state: fridgeState, dispatch: fridgeDispatch } = useFridgeContext();
  const { getToken } = useAuthService();
  const { state } = useRecipesContext();
  const { dispatch: shoppingListDispatch } = useShoppingListContext();

  useEffect(() => {
    refreshIngredients();
  }, []);

  const refreshIngredients = async () => {
    try {
      const token = await getToken();
      await fetchIngredients(fridgeDispatch, token);
    } catch (err) {
      console.error("Failed to fetch ingredients:", err);
    }
  };

  const isIngredientInFridge = (ingredient: string) => {
    return fridgeState.ingredients.some(
      fridgeItem => fridgeItem.ingredientName.toLowerCase() === ingredient.toLowerCase()
    );
  };

  const handleAddToShoppingList = async (recipeId: number) => {
    const recipe = state.recipesWishList.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach((ingredient) => {
        shoppingListDispatch({ type: SHOPPING_LIST_ACTIONS.ADD_ITEM, payload: { id: ingredient, name: ingredient, quantity: 1 } });
      });
    }
  };

  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const handleOpenModal = (recipeId: number) => {
    setSelectedRecipeId(recipeId);
  };

  const handleCloseModal = () => {
    setSelectedRecipeId(null);
  };

  return (
    <Accordion>
      {state.recipesWishList.map((recipe, index) => (
        <div key={recipe.id}>
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{recipe.name}</Accordion.Header>
            <Accordion.Body>
              <div className="recipe-image-container">
                <img className="recipe-image" src={recipe.image} alt={recipe.name} />              
              </div>
              <hr className="recipe-divider"/>
              <div className="recipe-content-container">
                <ul className="recipe-ingredients-list">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      <input 
                        disabled={true} 
                        checked={isIngredientInFridge(ingredient)}
                        className="recipe-ingredient-checkbox" 
                        type="checkbox" 
                        id={`ingredient-${recipe.id}-${idx}`} 
                      />
                      <label className="recipe-ingredient-label" htmlFor={`ingredient-${recipe.id}-${idx}`}> {ingredient}</label>
                    </li>
                  ))}
                </ul>
                <div className="recipe-buttons-container">
                  <button className="recipe-button recipe-button-add" onClick={() => handleAddToShoppingList(recipe.id)}>Add to Shopping List</button>
                  <button className="recipe-button recipe-button-view" onClick={() => handleOpenModal(recipe.id)}>View Recipe</button>
                  <button className="recipe-button recipe-button-remove">Remove Recipe</button>
                </div>
              </div>
              <div className="recipe-note-container">
                <span className="recipe-note">Note: Checkboxes indicate ingredients already in your fridge and are read-only.</span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <RecipeModal
            isOpen={selectedRecipeId === recipe.id}
            onClose={handleCloseModal}
            recipe={recipe}
          />
        </div>
      ))}
    </Accordion>
  );
}

export default RecipeDetail;
