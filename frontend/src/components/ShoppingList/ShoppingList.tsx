import "./ShoppingList.scss";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import ItemsList from "./ItemsList/ItemsList";
import { ShoppingListProvider } from "../../context/ShoppingListContext";

function ShoppingList() {
  return (
    <ShoppingListProvider>
      <div className="shopping-list-container">
        <div className="fridge-container">Fridge</div>
        <div className="recipe-container">
          <RecipeDetail />
        </div>
        <div className="items-container"> 
          <ItemsList />
        </div>
      </div>
    </ShoppingListProvider>
  );
}

export default ShoppingList;
