import { useState } from "react";
import { useRecipesContext } from "../../context/RecipiesContext";
import { useAuth } from "@clerk/clerk-react";

const AddToFridge = () => {
  const { getToken } = useAuth();
  const { state } = useRecipesContext();
  const ingredientsList = state.ingredients;
  const [ingredient, setIngredient] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

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

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const today = new Date().toISOString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ingredient) {
      setError("Ingredient is required.");
      return;
    }

    if (!expiryDate) {
      setError("Expiry date is required.");
      return;
    }

    if (expiryDate < today) {
      setError("The date cannot be in the past.");
      return;
    }

    const payload = {
      ingredient,
      expiryDate,
    };

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/fridge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to add ingredient to fridge. Please try again."
        );
      }

      const result = await response.json();
      console.log("Successfully added:", result);
      //alert("Ingredient successfully added to the fridge!");
      setIngredient("");
      setExpiryDate("");
      setError(null);
    } catch (err) {
      console.error((err as Error).message);
      setError((err as Error).message);
    }
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
            <label htmlFor="expiryDate" className="form-label">
              Expiry Date:
            </label>
            <input
              type="date"
              id="expiryDate"
              className="form-control"
              value={expiryDate}
              onChange={handleExpiryDateChange}
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
