import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipes } from '../../context/RecipesContext';
import './RecipeModal.scss';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipes;
}

export const RecipeModal: FC<RecipeModalProps> = ({ isOpen, onClose, recipe }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewFullRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="modal-body">
          <div className="recipe-info">
            <p><strong>Preparation Time:</strong> {recipe.prepTimeMinutes} minutes</p>
            <p><strong>Cooking Time:</strong> {recipe.cookTimeMinutes} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Calories:</strong> {recipe.caloriesPerServing} per serving</p>
          </div>
          <div className="recipe-tags">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <button className="view-full-recipe" onClick={handleViewFullRecipe}>
            View Full Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
