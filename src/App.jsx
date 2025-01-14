import { Suspense, lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RootLayout = lazy(() => import("./pages/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
import Spinner from "./components/Spinner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/admin/:id",
        element: <AdminPage />,
      },
      {
        path: "/admin",
        element: <AdminLoginPage />,
      },
      {
        path: "/:id",
        element: <PropertyDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense
      fallback={<Spinner /> || <p className="text-center">Loading...</p>}
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
