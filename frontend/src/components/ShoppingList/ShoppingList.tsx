import "./ShoppingList.scss";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import ItemsList from "./ItemsList/ItemsList";
import AgentChat from "../Agent/AgentChat/AgentChat";
import MyFridgeComponent from "../MyFridgeComponent/MyFridgeComponent";

function ShoppingList() {
  return (
    <>
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
    </>
  );
}

export default ShoppingList;
