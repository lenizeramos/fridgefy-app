import { useEffect } from "react";
import {
  removeIngredientFromFridge,
  useFridgeContext,
} from "../../context/FridgeContext";
import { useAuth } from "@clerk/clerk-react";

const FridgeIngredients = () => {
  const { state, dispatch } = useFridgeContext();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = await getToken();

        const response = await fetch(
          "http://localhost:3000/fridge/ingredients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage =
            errorData.message || "Failed to fetch ingredients.";
          throw new Error(errorMessage);
        }

        const result = await response.json();
        //expired product
        dispatch({ type: "setIngredients", payload: result });
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    fetchIngredients();
  }, [dispatch, getToken]);

  const handleDelete = async (id: string) => {
    removeIngredientFromFridge(id, dispatch, await getToken());
  };

  return (
    <div className="ingredients">
      <ul className="list-unstyled">
        {state.ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span className="me-2">{ingredient.ingredientName}</span>
            <button
              className="btn btn-sm"
              onClick={() => handleDelete(ingredient.id ?? "")}
            >
              <i className="bx bx-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FridgeIngredients;
