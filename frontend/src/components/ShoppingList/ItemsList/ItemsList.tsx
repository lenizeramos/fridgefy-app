import { useShoppingListContext } from "../../../context/ShoppingListContext";
import "./ItemList.scss";

function ItemsList() {
  const { state } = useShoppingListContext();
  const { items } = state;

  return <div className="items-list-container">
    <div className="items-list-title">Items to buy</div>
    <div className="items-list-items">
      {items.length > 0 ? (
        items.map((item, index) => 
          item.quantity > 0 && (
              <div 
                className="items-list-item" 
                key={item.id || `item-${index}`}
            >
              <span className="item-quantity">{item.quantity}</span> {item.name}
            </div>
          )
        )
      ) : (
        <div className="items-list-item">No items in the shopping list</div>
      )}
    </div>
  </div>;
}

export default ItemsList;
