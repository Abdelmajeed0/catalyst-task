import { Suspense, lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "./pages/RootLayout";
// import Home from "./pages/Home";
// import AdminPage from "./pages/AdminPage";
// import ErrorPage from "./pages/ErrorPage";
// import PropertyDetails from "./pages/PropertyDetails";

const RootLayout = lazy(() => import("./pages/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
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
        path: "/admin",
        element: <AdminPage />,
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
