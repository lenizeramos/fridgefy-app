import "./ShoppingList.scss";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import ItemsList from "./ItemsList/ItemsList";
import { ShoppingListProvider } from "../../context/ShoppingListContext";
import AgentChat from "../Agent/AgentChat/AgentChat";
import { AgentProvider } from "../../context/AgentContext";

function ShoppingList() {
  return (
    <AgentProvider>
      <ShoppingListProvider>
        <div className="shopping-list-container">
          <div className="fridge-container">Fridge</div>
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
      </ShoppingListProvider>
    </AgentProvider>
  );
}

export default ShoppingList;
