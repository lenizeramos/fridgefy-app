import { useState } from "react";
import { useRecipesContext } from "../../context/RecipiesContext";
import {
  addIngredientToFridge,
  useFridgeContext,
} from "../../context/FridgeContext";
import { useAuth } from "@clerk/clerk-react";

const AddToFridge = () => {
  const { state } = useRecipesContext();
  const ingredientsList = state.ingredients;
  const [ingredient, setIngredient] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { dispatch: fridgeDispatch } = useFridgeContext();
  const { getToken } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setIngredient(searchTerm);

    const filteredIngredients = ingredientsList.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredIngredients);
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

  const today = new Date().toISOString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ingredient) {
      setError("Ingredient is required.");
      return;
    }

    if (!expirationDate) {
      setError("Expiry date is required.");
      return;
    }

    if (expirationDate <= today) {
      setError("The date cannot be in the past.");
      return;
    }

    const payload = {
      ingredientName: ingredient,
      expirationDate,
    };

    addIngredientToFridge(payload, fridgeDispatch, await getToken());
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Add to my fridge</h2>
        <p>Enter item details you want to add to your fridge.</p>
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
              min={today}
            />
          </div>

          <button type="submit" className="addToFridgeBtn">
            Add To Fridge
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default AddToFridge;
