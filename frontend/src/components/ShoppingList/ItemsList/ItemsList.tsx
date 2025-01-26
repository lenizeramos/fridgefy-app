import { useShoppingListContext } from "../../../context/ShoppingListContext";

function ItemsList() {
  const { state } = useShoppingListContext();
  const { items } = state;

  console.log(items);

  return <div className="items-list-container">
    <div className="items-list-title">Items to buy</div>
    <div className="items-list-items">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div 
            className="items-list-item" 
            key={item.id || `item-${index}`}
          >
            {item.name} ({item.quantity})
          </div>
        ))
      ) : (
        <div className="items-list-item">No items in the shopping list</div>
      )}
    </div>
  </div>;
}

export default ItemsList;
