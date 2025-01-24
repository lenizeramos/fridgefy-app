import { useRecipesContext } from "../../context/RecipiesContext";
import { useAuth } from "@clerk/clerk-react";
import "./WishList.scss";
import { useEffect } from "react";

const WishList = () => {
  const { state, getRecipeUser } = useRecipesContext();
  const { getToken } = useAuth();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const token = await getToken();
        getRecipeUser(token);
      } catch (error) {
        console.error((error as Error).message);
      }
    };
    getRecipes();
  },[]);
  return (
    <>
      <div className="myRecipesContainer">
        <h1>My Recipes</h1>
        <ul>
          <li>
            <img src="" alt="" />
            <p></p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default WishList;
