import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../../context/RecipesContext';
import './RecipeDetails.scss';

const RecipeDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useRecipesContext();
  const recipe = state.recipes.find((r) => r.id === Number(id));

  useEffect(() => {
    if (!recipe) {
      navigate('/');
    }
  }, [recipe, navigate]);

  if (!recipe) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <div className="recipe-details-header">
        <h1>{recipe.name}</h1>
        <img src={recipe.image} alt={recipe.name} />
      </div>
      
      <div className="recipe-details-content">
        <div className="recipe-info-grid">
          <div className="info-card">
            <h3>Preparation Time</h3>
            <p>{recipe.prepTimeMinutes} minutes</p>
          </div>
          <div className="info-card">
            <h3>Cooking Time</h3>
            <p>{recipe.cookTimeMinutes} minutes</p>
          </div>
          <div className="info-card">
            <h3>Servings</h3>
            <p>{recipe.servings}</p>
          </div>
          <div className="info-card">
            <h3>Calories</h3>
            <p>{recipe.caloriesPerServing} per serving</p>
          </div>
        </div>

        <section className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </section>

        <section className="recipe-section">
          <h2>Additional Information</h2>
          <div className="additional-info">
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
            <div className="tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetails;
