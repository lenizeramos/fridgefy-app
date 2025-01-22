import { useRecipesContext } from "../../../context/RecipiesContext";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import "./RecipeDetail.scss";
import { useShoppingListContext } from "../../../context/ShoppingListContext";
import { SHOPPING_LIST_ACTIONS } from "../../../interfaces/ShoppingListInterface";

function RecipeDetail() {
  const { state, fetchData } = useRecipesContext();
  const { dispatch: shoppingListDispatch } = useShoppingListContext();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    loadData();
  }, []); 

  const handleAddToShoppingList = async (recipeId: number) => {
    const recipe = state.recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach((ingredient) => {
        shoppingListDispatch({ type: SHOPPING_LIST_ACTIONS.ADD_ITEM, payload: { id: ingredient, name: ingredient, quantity: 1 } });
      });
    }
  };

  return (
    <Accordion>
      {state.recipes.map((recipe, index) => (
        <Accordion.Item key={recipe.id} eventKey={index.toString()}>
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
                    <input disabled={true} className="recipe-ingredient-checkbox" type="checkbox" id={`ingredient-${recipe.id}-${idx}`} />
                    <label className="recipe-ingredient-label" htmlFor={`ingredient-${recipe.id}-${idx}`}> {ingredient}</label>
                  </li>
                ))}
              </ul>
              <div className="recipe-buttons-container">
                <button className="recipe-button recipe-button-add" onClick={() => handleAddToShoppingList(recipe.id)}>Add to Shopping List</button>
                <button className="recipe-button recipe-button-view">View Recipe</button>
                <button className="recipe-button recipe-button-remove">Remove Recipe</button>
              </div>
            </div>
            <div className="recipe-note-container">
              <span className="recipe-note">Note: Checkboxes indicate ingredients already in your fridge and are read-only.</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default RecipeDetail;
