import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.tsx";
import { StrictMode } from "react";
import Layout from "./layout/Layout.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { SignUp, ClerkProvider, SignIn } from "@clerk/clerk-react";
import Register from "./components/Register/Register.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import RecipesList from "./components/RecipesList/RecipesList.tsx";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails.tsx";
import { RecipesProvider } from "./context/RecipiesContext.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: (
          <SignIn path="/login" routing="path" redirectUrl="/register" />
        ),
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
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
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignOutUrl="/"
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
