import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.tsx";
import { StrictMode } from "react";
import Layout from "./layout/Layout.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Register from "./components/Register/Register.tsx";
import RecipesList from "./components/RecipesList/RecipesList.tsx";
import ShoppingList from "./components/ShoppingList/ShoppingList.tsx";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails.tsx";
import { RecipesProvider } from "./context/RecipesContext.tsx";
import WishList from "./components/WishList/WishList.tsx";
import SSOCallback from "./components/SSOCallback/SSOCallback.tsx";
import SignInPage from "./components/Auth/SignInPage/SignInPage.tsx";
import SignUpPage from "./components/Auth/SignUpPage/SignUpPage.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import Home from "./components/Home/Home.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signin/factor-one",
        element: <SignInPage />,
      },
      {
        path: "signin/sso-callback",
        element: <SSOCallback />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: "wish_list",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "recipes",
        element: (
          <RecipesProvider>
            <RecipesList />
          </RecipesProvider>
        ),
      },
      {
        path: "recipe/:id",
        element: (
          <RecipesProvider>
            <RecipeDetails />
          </RecipesProvider>
        ),
      },
      {
        path: "shopping-list",
        element: (
          <ProtectedRoute>
            <ShoppingList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/signin"
      signUpUrl="/signup"
      afterSignOutUrl="/"
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
