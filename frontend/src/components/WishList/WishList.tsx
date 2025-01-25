import { useRecipesContext } from "../../context/RecipesContext";
import "./WishList.scss";

const WishList = () => {
  const { state } = useRecipesContext();
  // console.log("from wishList", state.recipesWishList);

  return (
    <>
      <div className="myRecipesContainer">
        <h1>My Recipes</h1>
        <ul>
          {state.recipesWishList.map((recipe) => {
            return (
              <li key={recipe.id}>
                <img src={recipe.image} alt={recipe.name} className="image" />
                <p className="text">{recipe.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default WishList;
