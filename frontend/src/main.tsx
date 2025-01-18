import { createRoot } from "react-dom/client";
import "./index.scss";
import Layout from "./Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
