import { useState } from "react";
import { useRecipesContext } from "../../context/RecipesContext";
import {
  addIngredientToFridge,
  useFridgeContext,
} from "../../context/FridgeContext";
import { useAuthService } from "../../services/userAuthService";
import "../AddToFridge/AddToFridge.scss";
import toast from "react-hot-toast";
import { useShoppingListContext } from "../../context/ShoppingListContext";

const AddToFridge = () => {
  const { state } = useRecipesContext();
  const ingredientsList = state.ingredients;
  const [ingredient, setIngredient] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);


  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setIngredient("");
    setExpirationDate("");
    setSearchResults([]);
    setError(null);
    setShowModal(false);
  };

  const { dispatch: fridgeDispatch } = useFridgeContext();
  const { getToken } = useAuthService();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setIngredient(searchTerm);

    if (!searchTerm) {
      setSearchResults([]);
    } else {
      const filteredIngredients = ingredientsList.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredIngredients);
    }
  };

  const handleIngredientSelect = (selectedIngredient: string) => {
    setIngredient(selectedIngredient);
    setSearchResults([]);
  };

  const handleExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpirationDate(e.target.value);
  };

  const { dispatch: dispatchShoppingList } = useShoppingListContext();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = `${tomorrow.getFullYear()}-${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ingredient) {
      setError("Ingredient is required!");
      return;
    }

    if (!expirationDate) {
      setError("Expiry date is required!");
      return;
    }

    if (
      new Date(expirationDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      setError("The date cannot be today or in the past!");
      return;
    }

    const payload = {
      ingredientName: ingredient,
      expirationDate,
    };

    try {
      await addIngredientToFridge(payload, fridgeDispatch, dispatchShoppingList, await getToken());
      toast.success("Ingredient added to your fridge!");
      setIngredient("");
      setExpirationDate("");
      setShowModal(false);
    } catch (err) {
      toast.error(`Failed to add ingredient: ${(err as Error).message}`);
    }
  };

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        <i className="bx bxs-file-plus fs-4 addToFridgeIcon p-2"></i>
      </button>
      <div className="container">
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modal"
            aria-hidden="false"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="modal-header">
                  <div>
                    <h2 className="modal-title">Add to my fridge</h2>
                    <p>Enter item details you want to add to your fridge.</p>
                  </div>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="ingredient" className="form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="ingredient"
                        className="form-control"
                        value={ingredient}
                        onChange={handleSearchChange}
                        placeholder="Search for a ingredient"
                        autoComplete="off"
                      />
                      {searchResults.length > 0 && (
                        <ul className="list-group mt-2">
                          {searchResults.map((result, index) => (
                            <li
                              key={index}
                              className="list-group-item list-group-item-action"
                              onClick={() => handleIngredientSelect(result)}
                            >
                              {result}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="expirationDate" className="form-label">
                        Expiry Date:
                      </label>
                      <input
                        type="date"
                        id="expirationDate"
                        className="form-control"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        min={minDate}
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="addToFridgeBtn">
                        Add To Fridge
                      </button>
                      {error && (
                        <div className="addToFridgeError text-center">
                          <p className="text-danger mt-3">{error}</p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddToFridge;
