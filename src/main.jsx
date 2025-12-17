import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router";
import AuthProvider from "./provider/AuthProvider.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
        <AuthProvider>
      <RouterProvider router={router} />
        </AuthProvider>
  // </StrictMode>
);
