import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipesContext } from "../../context/RecipesContext";
import "./RecipeDetails.scss";
import MyFridgeComponent from "../MyFridgeComponent/MyFridgeComponent";
import Loading from "../Loading/Loading";
import WishList from "../WishList/WishList";

const RecipeDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useRecipesContext();
  const recipe = state.recipes.find((r) => r.id === Number(id));
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    if (!recipe) {
      navigate("/");
    }
    setRemoveLoading(true);
  }, [recipe, navigate]);

  if (!recipe) {
    return <div className="loading">{!removeLoading && <Loading />}</div>;
  }

  const handleCloseDetails = () => {
    navigate("/recipes");
  };
  
  return (
    <>
      <div className="mainContainer">
        <MyFridgeComponent />
        <div className="recipe-details">
          <i
            className="bx bx-x-circle"
            id="close"
            onClick={handleCloseDetails}
          ></i>
          <div className="recipe-info-grid">
            <h1>{recipe.name}</h1>
            <div className="recipe-details-header">
              <img src={recipe.image} alt={recipe.name} />
              <div className="info-card">
                <p>
                  <strong>Preparation Time: </strong>
                  {recipe.prepTimeMinutes} minutes
                </p>
                <p>
                  <strong>Cooking Time: </strong>
                  {recipe.cookTimeMinutes} minutes
                </p>
                <p>
                  <strong>Servings: </strong>
                  {recipe.servings}
                </p>
                <p>
                  <strong>Difficulty: </strong>
                  {recipe.difficulty}
                </p>
                <p>
                  <strong>Cuisine: </strong>
                  {recipe.cuisine}
                </p>
                <p>
                  <strong>Calories: </strong>
                  {recipe.caloriesPerServing} per serving
                </p>
                <p>
                  <strong>Rating: </strong>
                  {recipe.rating} per serving
                </p>
                <p>
                  <strong>Meal Type: </strong>
                  {recipe.mealType}
                </p>

                <div className="tags">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="recipe-details-content">
            <section className="ingredients-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section className="instructions-section">
              <h2>Instructions</h2>
              <ol className="instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
        <section className="wishList">
          <WishList />
        </section>
      </div>
    </>
  );
};

export default RecipeDetails;
