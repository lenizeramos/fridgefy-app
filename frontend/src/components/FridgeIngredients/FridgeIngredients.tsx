import { useEffect } from "react";
import { useFridgeContext } from "../../context/FridgeContext";
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
        dispatch({ type: "setIngredients", payload: result });
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    fetchIngredients();
  }, [dispatch, getToken]);

  return (
    <div className="ingredients">
      <ul className="list-unstyled">
        {state.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.ingredientName}</li>
        ))}
      </ul>
    </div>
  );
};

export default FridgeIngredients;
