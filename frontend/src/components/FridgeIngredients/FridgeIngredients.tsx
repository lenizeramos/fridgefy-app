import { useEffect, useState } from "react";
import {
  removeIngredientFromFridge,
  useFridgeContext,
} from "../../context/FridgeContext";
import { useAuthService } from "../../services/userAuthService";
import "../FridgeIngredients/FridgeIngredients.scss";
import toast from "react-hot-toast";

interface FridgeIngredientsProps {
  searchWord: string;
}

const FridgeIngredients: React.FC<FridgeIngredientsProps> = ({
  searchWord,
}) => {
  const { state, dispatch } = useFridgeContext();
  const { getToken } = useAuthService();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("Ingredient ID is missing.");
      return;
    }
    try {
      await removeIngredientFromFridge(id, dispatch, await getToken());
      toast.success("Ingredient removed from your fridge!");
    } catch (err) {
      toast.error(`Failed to delete ingredient: ${(err as Error).message}`);
    }
  };
  const isExpired = (expirationDateStr: string): boolean => {
    const expirationDate = new Date(expirationDateStr);
    const currentDate = new Date();
    const currentDateOnly = new Date(currentDate.setHours(0, 0, 0, 0));
    const expirationDateOnly = new Date(expirationDate.setHours(0, 0, 0, 0));

    return currentDateOnly > expirationDateOnly;
  };

  const ingredientsToDisplay = searchWord
    ? state.ingredients.filter((ingredient) =>
        ingredient.ingredientName
          .toLowerCase()
          .includes(searchWord.toLowerCase())
      )
    : state.ingredients;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = ingredientsToDisplay.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(ingredientsToDisplay.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="ingredients">
      {currentIngredients.length > 0 ? (
        <>
          <ul className="list-unstyled">
            {currentIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2"
              >
                <span
                  className={`me-2 ${
                    isExpired(ingredient.expirationDate) ? "text-danger" : ""
                  }`}
                >
                  {ingredient.ingredientName}
                </span>
                <button
                  className="btn btn-sm"
                  onClick={() => handleDelete(ingredient.id ?? "")}
                >
                  <i className="bx bx-trash fridge-ingredients-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-center align-items-center" id="paginationContainer">
            <button
              className="btn btn-sm paginationBtn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span className="mx-2">
            {`Page ${currentPage} of ${totalPages}`}
            </span>
            <button
              className="btn btn-sm paginationBtn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div><p>No ingredient in the fridge</p></div>
      )}
    </div>
  );
};

export default FridgeIngredients;
