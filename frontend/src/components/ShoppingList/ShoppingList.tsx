import "./ShoppingList.scss";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import ItemsList from "./ItemsList/ItemsList";
import { ShoppingListProvider } from "../../context/ShoppingListContext";
import AgentChat from "../Agent/AgentChat/AgentChat";
import { AgentProvider } from "../../context/AgentContext";
import { RecipesProvider } from "../../context/RecipesContext";
import MyFridgeComponent from "../MyFridgeComponent/MyFridgeComponent";

function ShoppingList() {
  return (
    <RecipesProvider>
      <ShoppingListProvider>
        <AgentProvider>
          <div className="shopping-list-container">
            <div className="fridge-container">
              <MyFridgeComponent />
            </div>
            <div className="recipe-container">
              <RecipeDetail />
            </div>
            <div>
              <div className="agent-container">
                <AgentChat />
              </div>
              <div className="items-container">
                <ItemsList />
              </div>
            </div>
          </div>
        </AgentProvider>
      </ShoppingListProvider>
    </RecipesProvider>
  );
}

export default ShoppingList;
