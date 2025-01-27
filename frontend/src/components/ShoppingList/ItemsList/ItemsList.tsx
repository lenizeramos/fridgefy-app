import { useShoppingListContext } from "../../../context/ShoppingListContext";
import "./ItemList.scss";

function ItemsList() {
  const { state, dispatch } = useShoppingListContext();
  const { items } = state;

  const handleDelete = async (ingredientName: string) => {
    await dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: ingredientName,
        name: ingredientName,
        quantity: 1
      }
    });
  };

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
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="item-quantity">{item.quantity}</span> {item.name}
                </div>
                <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(item.name ?? "")}
                  >
                  <i className="bx bx-trash fridge-ingredients-trash"></i>
                </button>
              </div>
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
