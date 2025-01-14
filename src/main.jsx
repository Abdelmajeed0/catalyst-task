import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DataProvider from "./contexts/DataContext.jsx";
import AppartmentProvider from "./contexts/AppartmentContext.jsx";
import BookingProvider from "./contexts/BookignsContext.jsx";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookingProvider>
      <AppartmentProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AppartmentProvider>
    </BookingProvider>
  </StrictMode>
);
