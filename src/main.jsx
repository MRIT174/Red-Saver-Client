import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import AuthProvider from "./provider/AuthProvider";
import router from "./Routes/Router";
import "./index.css";

// React Query client
const queryClient = new QueryClient();

// Stripe publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </QueryClientProvider>
  </AuthProvider>
);
